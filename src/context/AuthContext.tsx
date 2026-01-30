import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, signOut as authSignOut } from '@/services/auth.service';
import { getAdminProfile, AdminProfile } from '@/services/firestore.service';

interface AuthContextType {
    user: User | null;
    adminProfile: AdminProfile | null;
    isAdmin: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (user) => {
            setUser(user);

            if (user) {
                try {
                    const profile = await getAdminProfile(user.uid);
                    setAdminProfile(profile);
                    setIsAdmin(!!profile);
                } catch (error) {
                    console.error('Error fetching admin profile:', error);
                    setAdminProfile(null);
                    setIsAdmin(false);
                }
            } else {
                setAdminProfile(null);
                setIsAdmin(false);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        try {
            await authSignOut();
            setUser(null);
            setAdminProfile(null);
            setIsAdmin(false);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    const value = {
        user,
        adminProfile,
        isAdmin,
        loading,
        signOut
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
