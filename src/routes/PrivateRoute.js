'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const PrivateRoute = ({ children = [] }) => {
    const { isAuthenticated, isLoadingAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoadingAuth && !isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, isLoadingAuth, router]);

    if (isLoadingAuth || !isAuthenticated) {
        return null;
    }

    return children;
};

export default PrivateRoute;
