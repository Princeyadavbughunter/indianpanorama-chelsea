'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
    const pathname = usePathname();
    const tracked = useRef(false);

    useEffect(() => {
        // Only track once per page load to prevent React StrictMode double-firing
        if (tracked.current) return;

        const recordVisit = async () => {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visitors`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ path: pathname || '/' }),
                });
            } catch (error) {
                // Silently fail if tracking server is unreachable to not impact user experience
                console.error('Analytics ping failed');
            }
        };

        recordVisit();
        tracked.current = true;
    }, [pathname]);

    return null; // Invisible component
}
