import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Card } from '@/components/ui/Card';
import { User, Mail, ShieldCheck } from 'lucide-react';

const ProfilePage = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("ProfilePage must be within an AuthProvider");

    const { user, isSubscribed } = authContext;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div className="text-center p-10 text-soft-white">Loading Profile...</div>;
    }

    if (!user) {
        return <div className="text-center p-10 text-solar-orange">Could not load user profile.</div>;
    }

    return (
        <div className="min-h-screen bg-quantum-black text-soft-white p-8">
            <h1 className="text-4xl font-bold mb-8 animate-fade-in">My Profile</h1>
            <Card className="max-w-2xl mx-auto p-8 animate-slide-in-right">
                <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-ion-blue rounded-full flex items-center justify-center mb-4">
                            <User size={48} className="text-quantum-black" />
                        </div>
                        <h2 className="text-2xl font-bold">{user.username || 'User'}</h2>
                    </div>
                    <div className="flex-grow space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail size={20} className="text-ion-blue" />
                            <span className="text-gray-300">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={20} className="text-ion-blue" />
                            <span className="font-semibold">
                                Subscription Status:
                                <span className={isSubscribed ? "text-green-400 ml-2" : "text-solar-orange ml-2"}>
                                    {isSubscribed ? 'Active Premium' : 'Standard'}
                                </span>
                            </span>
                        </div>
                        {/* Add more profile fields here in the future */}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProfilePage;