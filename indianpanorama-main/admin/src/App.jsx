import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { RecentActivity } from './components/RecentActivity';
import { RecentGiftCards } from './components/RecentGiftCards';
import { QuickActions } from './components/QuickActions';
import { Users, CalendarDays, Gift, LifeBuoy, Download, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MenuManager } from './components/MenuManager';
import { BlogManager } from './components/BlogManager';
import { ReservationManager } from './components/ReservationManager';
import { EventManager } from './components/EventManager';
import { GroupBookingManager } from './components/GroupBookingManager';
import { GiftCardManager } from './components/GiftCardManager';
import { SupportManager } from './components/SupportManager';
import { SlugManager } from './components/SlugManager';

function DashboardHome() {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    chartData: [],
    topLocations: [],
    metrics: { pendingReservations: 0, giftCards: 0, supportRequests: 0 }
  });
  const [activities, setActivities] = useState([]);
  const [chartMode, setChartMode] = useState('daily');
  const [dateRange, setDateRange] = useState('30days');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const daysQuery = dateRange === '30days' ? 30 : 7;
        const [visitorRes, metricsRes, actRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/visitors/stats?days=${daysQuery}`, { headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } }),
          fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/metrics?days=${daysQuery}`, { headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } }),
          fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/activities?days=${daysQuery}`, { headers: { 'Authorization': 'Bearer ' + 'leela_admin_secret_123' } })
        ]);

        let visitorData = { totalVisitors: 0, chartData: [], topLocations: [] };
        if (visitorRes.ok) {
          const data = await visitorRes.json();
          if (data.chartData) visitorData.chartData = data.chartData;
          if (data.topLocations) visitorData.topLocations = data.topLocations;
          if (data.totalVisitors !== undefined) visitorData.totalVisitors = data.totalVisitors;
        }

        let metricsData = { pendingReservations: 0, giftCards: 0, supportRequests: 0 };
        if (metricsRes.ok) {
          const mData = await metricsRes.json();
          if (mData.pendingReservations) metricsData.pendingReservations = mData.pendingReservations;
          if (mData.giftCards) metricsData.giftCards = mData.giftCards;
          if (mData.supportRequests) metricsData.supportRequests = mData.supportRequests;
        }

        let finalActs = [];
        if (actRes.ok) {
          const rawAct = await actRes.json();
          if (rawAct && rawAct.length > 0) {
            finalActs = rawAct.slice(0, 5).map(a => ({
              title: a.action,
              subtitle: a.user || 'System',
              time: new Date(a.createdAt).toLocaleDateString()
            }));
          }
        }

        setActivities(finalActs);
        setStats({ ...visitorData, metrics: metricsData });
      } catch (err) {
        console.error("Dashboard mount error:", err);
      }
    };
    fetchDashboardData();
  }, [dateRange]); // Refetch/Regenerate when date range changes

  const handleDownloadReport = () => {
    const currentData = stats.chartData || [];
    const csvContent = "data:text/csv;charset=utf-8,Date,Visitors\n" + currentData.map(e => `${e._id},${e.count}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `traffic_report_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Helper components for the clean Adminex UI
  const StatCard = ({ title, value, icon: Icon, trend, bgColor, iconColor }) => (
    <div style={{ background: 'var(--color-bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: bgColor, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={24} />
        </div>
      </div>
      <div>
        <h4 style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem', fontWeight: 500, marginBottom: '8px' }}>{title}</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.5px' }}>{value}</span>
          {trend && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: trend > 0 ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)', color: trend > 0 ? '#2ecc71' : '#e74c3c' }}>
              {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {Math.abs(trend)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '32px', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', color: 'var(--color-text-primary)' }}>

      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.5px' }}>Dashboard</h1>
          <p style={{ margin: '8px 0 0 0', color: 'var(--color-text-secondary)' }}>Welcome back, here's what's happening today</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setDateRange(dateRange === '30days' ? '7days' : '30days')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text-primary)', fontWeight: 500, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <Calendar size={18} /> Last {dateRange === '30days' ? '30' : '7'} days
          </button>
          <button onClick={handleDownloadReport} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
            <Download size={18} /> Download Report
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        <StatCard title="Total Visitors" value={stats.totalVisitors.toLocaleString()} icon={Users} bgColor="rgba(236, 72, 153, 0.1)" iconColor="#ec4899" />
        <StatCard title="Reservations" value={stats.metrics.pendingReservations} icon={CalendarDays} bgColor="rgba(46, 204, 113, 0.1)" iconColor="#2ecc71" />
        <StatCard title="Gift Cards Issued" value={stats.metrics.giftCards} icon={Gift} bgColor="rgba(245, 158, 11, 0.1)" iconColor="#f59e0b" />
        <StatCard title="Support Tickets" value={stats.metrics.supportRequests} icon={LifeBuoy} bgColor="rgba(14, 165, 233, 0.1)" iconColor="#0ea5e9" />
      </div>

      {/* Middle Row: Main Chart & Top Locations */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

        {/* Main Graph (Adminex "Revenue Overview" clone) */}
        <div style={{ background: 'var(--color-bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Traffic Overview</h3>
              <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Daily visitor statistics (Last 30 Days)</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span onClick={() => setChartMode('daily')} style={{ padding: '6px 16px', background: chartMode === 'daily' ? '#3b82f6' : 'transparent', color: chartMode === 'daily' ? 'white' : 'var(--color-text-secondary)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>Daily</span>
              <span onClick={() => setChartMode('weekly')} style={{ padding: '6px 16px', background: chartMode === 'weekly' ? '#3b82f6' : 'transparent', color: chartMode === 'weekly' ? 'white' : 'var(--color-text-secondary)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', borderRadius: '20px', transition: 'all 0.2s' }}>Weekly</span>
            </div>
          </div>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side List (Adminex "Top Products" clone -> "Top Locations") */}
        <div style={{ background: 'var(--color-bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Top Visitor Locations</h3>
            <a href="#" style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>View All</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
            {stats.topLocations.map((loc, idx) => {
              // Calculate percentage relative to max for progress bar
              const max = Math.max(...stats.topLocations.map(l => l.count), 1);
              const percent = Math.round((loc.count / max) * 100);
              return (
                <div key={loc._id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 500 }}>
                    <span>{loc._id}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{loc.count.toLocaleString()} visits</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ flex: 1, height: '6px', background: 'var(--color-bg-body)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${percent}%`, height: '100%', background: '#3b82f6', borderRadius: '3px' }}></div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', width: '30px', textAlign: 'right' }}>{percent}%</span>
                  </div>
                </div>
              );
            })}
            {stats.topLocations.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '40px' }}>No location data yet</div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ background: 'var(--color-bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Recent System Activity</h3>
            <a href="#" style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>View All</a>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activities.length > 0 ? activities.map((act, i) => (
              <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: i !== activities.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-bg-body)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-accent)' }}>
                    <ArrowUpRight size={18} />
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>{act.title}</h5>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{act.subtitle}</p>
                  </div>
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{act.time}</span>
              </li>
            )) : (
              <li style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '20px 0' }}>No recent activity found.</li>
            )}
          </ul>
        </div>

        <div style={{ background: 'var(--color-bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px' }}>System Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '16px', background: 'rgba(46, 204, 113, 0.05)', border: '1px solid rgba(46, 204, 113, 0.2)', borderRadius: '8px' }}>
              <h4 style={{ margin: 0, color: '#2ecc71', fontSize: '1rem', marginBottom: '4px' }}>All Systems Operational</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Frontend and Backend APIs are running smoothly.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function AdminLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="scrollable-content">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/menu" element={<MenuManager />} />
            <Route path="/blogs" element={<BlogManager />} />
            <Route path="/reservations" element={<ReservationManager />} />
            <Route path="/events" element={<EventManager />} />
            <Route path="/group-bookings" element={<GroupBookingManager />} />
            <Route path="/gift-cards" element={<GiftCardManager />} />
            <Route path="/support" element={<SupportManager />} />
            <Route path="/slugs" element={<SlugManager />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isAuth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
