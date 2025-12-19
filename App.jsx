import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import SendGift from './components/SendGift';
import ReceiveGift from './components/ReceiveGift';
import QRDisplay from './components/QRDisplay';
import { ChevronLeft } from 'lucide-react';

// Mock initial data
const MOCK_USER = {
    id: 'user-1',
    username: 'AlexFinance',
    walletBalance: 2500.00
};

const MOCK_GIFTS = [
    {
        id: 'g-1',
        senderId: 'user-2',
        recipientId: 'user-1',
        amount: 50.00,
        message: 'Happy Birthday Alex!',
        uniqueCode: 'GC-X892-Z',
        status: 'pending',
        createdAt: '2024-05-15T10:30:00Z',
        expiryDate: '2024-06-15T10:30:00Z'
    },
    {
        id: 'g-2',
        senderId: 'user-1',
        recipientId: 'user-3',
        amount: 100.00,
        message: 'Thanks for the dinner!',
        uniqueCode: 'GC-K411-Q',
        status: 'redeemed',
        createdAt: '2024-05-10T14:20:00Z',
        redeemedAt: '2024-05-11T09:15:00Z',
        expiryDate: '2024-06-10T14:20:00Z'
    }
];

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [view, setView] = useState('login');
    const [gifts, setGifts] = useState(MOCK_GIFTS);
    const [activeGift, setActiveGift] = useState(null);

    const handleLogin = (username) => {
        setCurrentUser({ ...MOCK_USER, username });
        setView('dashboard');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setView('login');
    };

    const addGift = (gift) => {
        setGifts([gift, ...gifts]);
        setActiveGift(gift);
        setView('qr-display');
    };

    const redeemGift = (code) => {
        const updatedGifts = gifts.map(g => {
            if (g.uniqueCode === code && g.status === 'pending') {
                return { ...g, status: 'redeemed', redeemedAt: new Date().toISOString() };
            }
            return g;
        });
        setGifts(updatedGifts);
        setView('dashboard');
    };

    const cancelGift = (id) => {
        setGifts(gifts.map(g => g.id === id ? { ...g, status: 'cancelled' } : g));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 md:bg-slate-100 text-slate-900 transition-colors duration-500">
            {/* Responsive App Shell: full width on mobile, max-width on larger devices */}
            <div className="w-full sm:max-w-md md:max-w-2xl lg:max-w-none bg-white min-h-screen sm:min-h-[850px] sm:h-[90vh] lg:h-screen flex flex-col sm:shadow-2xl sm:rounded-3xl lg:rounded-none lg:shadow-none overflow-hidden relative">

                {/* Persistent Header - Responsive padding */}
                {view !== 'login' && (
                    <header className="px-4 py-4 md:px-6 md:py-5 border-b border-blue-50 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
                        <div className="flex items-center gap-2">
                            {view !== 'dashboard' && (
                                <button
                                    onClick={() => setView('dashboard')}
                                    className="p-1.5 hover:bg-slate-50 rounded-full transition-colors active:scale-95"
                                    aria-label="Back"
                                >
                                    <ChevronLeft className="w-6 h-6 text-blue-900" />
                                </button>
                            )}
                            <h1 className="text-xl md:text-2xl font-bold text-blue-900 tracking-tight">G-Card</h1>
                        </div>
                        {currentUser && (
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] md:text-xs font-bold text-blue-900/40 uppercase tracking-widest">Logged in as</span>
                                <span className="text-sm font-semibold text-slate-600">@{currentUser.username}</span>
                            </div>
                        )}
                    </header>
                )}

                {/* Dynamic View Container */}
                <main className="flex-1 overflow-y-auto scroll-smooth">
                    <div className="h-full flex flex-col">
                        {view === 'login' && <AuthPage onLogin={handleLogin} />}

                        {view === 'dashboard' && currentUser && (
                            <Dashboard
                                user={currentUser}
                                gifts={gifts}
                                onSend={() => setView('send')}
                                onReceive={() => setView('receive')}
                                onLogout={handleLogout}
                                onCancel={cancelGift}
                            />
                        )}

                        {view === 'send' && currentUser && (
                            <SendGift
                                sender={currentUser}
                                onComplete={addGift}
                                onBack={() => setView('dashboard')}
                            />
                        )}

                        {view === 'receive' && (
                            <ReceiveGift
                                onRedeem={redeemGift}
                                onBack={() => setView('dashboard')}
                            />
                        )}

                        {view === 'qr-display' && activeGift && (
                            <QRDisplay
                                gift={activeGift}
                                onDone={() => setView('dashboard')}
                            />
                        )}
                    </div>
                </main>
            </div>

            {/* Desktop Helper Text */}
            <div className="hidden md:block mt-6 text-slate-400 text-xs font-medium">
                Press <kbd className="bg-white px-1.5 py-0.5 rounded shadow-sm border border-slate-200">Esc</kbd> to return to dashboard
            </div>
        </div>
    );
};

export default App;
