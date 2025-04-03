import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { getUserData } from '../appRoutes';

interface User {
    user: string;
    email: string;
    role: string
    [key: string]: any;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    fetchUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(getUserData, {}, { withCredentials: true });
            setUser(response.data);
            console.log('User data fetched:', response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('user');
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
