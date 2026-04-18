'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
    const pathname = usePathname();
    const tracked = useRef(false);

    useEffect(() => {
        // Guard against React StrictMode double-firing in dev.
        if (tracked.current) return;
        tracked.current = true;

        // Skip analytics entirely when browsing from localhost / a private IP —
        // these visits are developer traffic and should never enter the stats.
        if (typeof window !== 'undefined') {
            const host = window.location.hostname;
            const isLocal =
                host === 'localhost' ||
                host === '127.0.0.1' ||
                host === '::1' ||
                host.endsWith('.local') ||
                /^10\./.test(host) ||
                /^192\.168\./.test(host) ||
                /^172\.(1[6-9]|2\d|3[01])\./.test(host);

            if (isLocal) return;
        }

        const recordVisit = async () => {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visitors`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: pathname || '/' }),
                });
            } catch {
                // Silent — analytics must never impact the user experience.
            }
        };

        recordVisit();
    }, [pathname]);

    return null;
}
