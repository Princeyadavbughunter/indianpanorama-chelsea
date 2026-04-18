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


  // Restaurant stat card — muted gradient tile with accent color bar
  const StatCard = ({ title, value, icon: Icon, accent, tint }) => (
    <div
      className="card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '22px 24px',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        width: '4px',
        background: accent,
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: 0,
            color: 'var(--color-text-muted)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>{title}</p>
          <p className="font-serif-display" style={{
            margin: '8px 0 0',
            fontSize: '2.1rem',
            color: 'var(--brand-green-deep)',
            lineHeight: 1,
          }}>{value}</p>
        </div>
        <div style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: tint,
          color: accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={22} strokeWidth={1.9} />
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px', color: 'var(--color-text-primary)' }}>

      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ width: 28, height: 1, background: 'var(--brand-gold)' }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--brand-gold-deep)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Today’s Overview</span>
          </div>
          <h1 className="font-serif-display" style={{ margin: 0, fontSize: '2.1rem', color: 'var(--brand-green-deep)', letterSpacing: '-0.01em' }}>
            Welcome back, Chef
          </h1>
          <p style={{ margin: '6px 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
            Here’s what’s cooking at Indian Panorama today.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setDateRange(dateRange === '30days' ? '7days' : '30days')} className="btn btn-secondary">
            <Calendar size={16} /> Last {dateRange === '30days' ? '30' : '7'} days
          </button>
          <button onClick={handleDownloadReport} className="btn btn-primary">
            <Download size={16} /> Download Report
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '18px' }}>
        <StatCard title="Total Visitors" value={stats.totalVisitors.toLocaleString()} icon={Users} accent="#CBAC70" tint="var(--brand-gold-soft)" />
        <StatCard title="Reservations" value={stats.metrics.pendingReservations} icon={CalendarDays} accent="#6e8b6a" tint="var(--brand-sage-soft)" />
        <StatCard title="Gift Cards Issued" value={stats.metrics.giftCards} icon={Gift} accent="#b9663b" tint="var(--brand-rust-soft)" />
        <StatCard title="Support Tickets" value={stats.metrics.supportRequests} icon={LifeBuoy} accent="#2c3e33" tint="var(--brand-green-soft)" />
      </div>

      {/* Middle Row: Chart & Locations */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '18px' }}>

        {/* Traffic Chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 className="font-serif-display" style={{ margin: 0, fontSize: '1.25rem', color: 'var(--brand-green-deep)' }}>Traffic Overview</h3>
              <p style={{ margin: '3px 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.82rem' }}>Daily visitor statistics ({dateRange === '30days' ? 'last 30 days' : 'last 7 days'})</p>
            </div>
            <div style={{ display: 'flex', gap: '4px', background: 'var(--brand-cream)', padding: '4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }}>
              <span onClick={() => setChartMode('daily')} style={{
                padding: '5px 16px',
                background: chartMode === 'daily' ? 'var(--brand-gold)' : 'transparent',
                color: chartMode === 'daily' ? 'var(--brand-green-deep)' : 'var(--color-text-secondary)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}>Daily</span>
              <span onClick={() => setChartMode('weekly')} style={{
                padding: '5px 16px',
                background: chartMode === 'weekly' ? 'var(--brand-gold)' : 'transparent',
                color: chartMode === 'weekly' ? 'var(--brand-green-deep)' : 'var(--color-text-secondary)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}>Weekly</span>
            </div>
          </div>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CBAC70" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#CBAC70" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid var(--color-border-strong)',
                    borderRadius: '10px',
                    boxShadow: 'var(--shadow-md)',
                    fontSize: '0.82rem',
                  }}
                  itemStyle={{ color: 'var(--brand-gold-deep)', fontWeight: 600 }}
                  labelStyle={{ color: 'var(--brand-green-deep)', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="count" stroke="#CBAC70" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Locations */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
            <h3 className="font-serif-display" style={{ margin: 0, fontSize: '1.25rem', color: 'var(--brand-green-deep)' }}>Top Locations</h3>
            <a href="#" style={{ color: 'var(--brand-gold-deep)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>View All →</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
            {stats.topLocations.map((loc) => {
              const max = Math.max(...stats.topLocations.map(l => l.count), 1);
              const percent = Math.round((loc.count / max) * 100);
              return (
                <div key={loc._id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 500 }}>
                    <span style={{ color: 'var(--brand-green-deep)' }}>{loc._id}</span>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>{loc.count.toLocaleString()} visits</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flex: 1, height: '6px', background: 'var(--brand-cream-2)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${percent}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--brand-gold-deep), var(--brand-gold))',
                        borderRadius: '3px',
                      }}></div>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', width: '32px', textAlign: 'right', fontWeight: 600 }}>{percent}%</span>
                  </div>
                </div>
              );
            })}
            {stats.topLocations.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '40px', fontSize: '0.88rem' }}>No location data yet</div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '18px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 className="font-serif-display" style={{ margin: 0, fontSize: '1.25rem', color: 'var(--brand-green-deep)' }}>Recent Activity</h3>
            <a href="#" style={{ color: 'var(--brand-gold-deep)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>View All →</a>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activities.length > 0 ? activities.map((act, i) => (
              <li key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '14px',
                borderBottom: i !== activities.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'var(--brand-gold-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-gold-deep)',
                  }}>
                    <ArrowUpRight size={16} />
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: 'var(--brand-green-deep)' }}>{act.title}</h5>
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{act.subtitle}</p>
                  </div>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{act.time}</span>
              </li>
            )) : (
              <li style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '20px 0', fontSize: '0.88rem' }}>No recent activity found.</li>
            )}
          </ul>
        </div>

        <div className="card">
          <h3 className="font-serif-display" style={{ margin: 0, fontSize: '1.25rem', color: 'var(--brand-green-deep)', marginBottom: '18px' }}>Kitchen Status</h3>
          <div style={{
            padding: '16px 18px',
            background: 'var(--brand-sage-soft)',
            border: '1px solid rgba(110, 139, 106, 0.25)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--color-success)',
              marginTop: 6,
              boxShadow: '0 0 0 4px rgba(94, 143, 82, 0.15)',
            }} />
            <div>
              <h4 style={{ margin: 0, color: 'var(--color-success)', fontSize: '0.92rem', fontWeight: 600 }}>All Systems Operational</h4>
              <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                Frontend, backend, reservations and WhatsApp integration are all running smoothly.
              </p>
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
