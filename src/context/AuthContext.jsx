
import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/supabase/auth.service';

export const AuthContext = createContext({
    user: null,
    session: null,
    loading: true,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function getSession() {
            setLoading(true);
            const { data, error } = await authService.getCurrentSession();
            if (mounted) {
                if (error) {
                    console.error("Error getting session:", error);
                } else if (data?.session) {
                    setSession(data.session);
                    setUser(data.session.user);
                }
                setLoading(false);
            }
        }

        getSession();

        const { data: { subscription } } = authService.onAuthStateChange((_event, session) => {
            if (mounted) {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
            subscription?.unsubscribe();
        };
    }, []);

    const value = {
        user,
        session,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
