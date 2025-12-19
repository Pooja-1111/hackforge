import React, { useState } from 'react';
import { Lock, User as UserIcon } from 'lucide-react';

const AuthPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onLogin(username);
        }
    };

    return (
        <div className="p-8 h-full flex flex-col justify-center items-center">
            <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center mb-8">
                <span className="text-white text-3xl font-bold">G</span>
            </div>

            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Welcome Back</h2>
                <p className="text-slate-500 text-sm">Access your secure gifting dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-4">
                <div className="relative">
                    <label className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1 block">Username</label>
                    <div className="flex items-center border border-blue-100 rounded-lg bg-white px-3 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                        <UserIcon className="w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            className="w-full py-3 px-3 outline-none text-slate-800 placeholder-slate-300"
                            placeholder="e.g. james_fin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="relative">
                    <label className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1 block">Password</label>
                    <div className="flex items-center border border-blue-100 rounded-lg bg-white px-3 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                        <Lock className="w-5 h-5 text-slate-400" />
                        <input
                            type="password"
                            className="w-full py-3 px-3 outline-none text-slate-800 placeholder-slate-300"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-blue-900 text-white font-bold rounded-lg shadow-sm hover:bg-blue-800 active:scale-[0.98] transition-all mt-6"
                >
                    Sign In Securely
                </button>

                <p className="text-center text-xs text-slate-400 mt-8">
                    By continuing, you agree to G-Card's <span className="underline decoration-slate-300">Terms of Service</span> and <span className="underline decoration-slate-300">Privacy Policy</span>.
                </p>
            </form>
        </div>
    );
};

export default AuthPage;
