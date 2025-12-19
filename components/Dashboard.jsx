import React, { useState } from 'react';
import { Send, Download, ArrowUpRight, ArrowDownLeft, XCircle, LogOut, MessageSquare, ChevronRight } from 'lucide-react';

const Dashboard = ({ user, gifts, onSend, onReceive, onLogout, onCancel }) => {
    const [filter, setFilter] = useState('all');
    const [viewedGift, setViewedGift] = useState(null);

    const filteredGifts = gifts.filter(g => {
        if (filter === 'sent') return g.senderId === user.id;
        if (filter === 'received') return g.recipientId === user.id;
        return true;
    });

    return (
        <div className="p-4 md:p-8 lg:p-10 space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto w-full">
            <section className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-tight">Hello, {user.username}</h2>
                <p className="text-slate-500 text-sm md:text-base">Would you like to send a gift to someone today?</p>
            </section>

            <section className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                <button
                    onClick={onSend}
                    className="flex flex-col items-center justify-center p-5 md:p-8 bg-blue-900 text-white rounded-2xl md:rounded-3xl shadow-lg shadow-blue-900/10 hover:bg-blue-800 active:scale-95 transition-all"
                >
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mb-3">
                        <Send className="w-5 h-5 md:w-7 md:h-7" />
                    </div>
                    <span className="font-bold text-sm md:text-lg">Send</span>
                </button>
                <button
                    onClick={onReceive}
                    className="flex flex-col items-center justify-center p-5 md:p-8 border-2 border-blue-50 bg-white text-blue-900 rounded-2xl md:rounded-3xl shadow-sm hover:bg-blue-50/50 active:scale-95 transition-all"
                >
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                        <Download className="w-5 h-5 md:w-7 md:h-7" />
                    </div>
                    <span className="font-bold text-sm md:text-lg">Receive</span>
                </button>
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-lg font-bold text-blue-900">Recent Activity</h3>
                    <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                        {['all', 'sent', 'received'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg capitalize transition-all ${filter === f ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-400'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                    {filteredGifts.length > 0 ? (
                        filteredGifts.map((gift) => {
                            const isSent = gift.senderId === user.id;
                            return (
                                <div
                                    key={gift.id}
                                    className="flex items-center justify-between p-4 bg-white border border-blue-50 rounded-xl md:rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group h-full"
                                    onClick={() => setViewedGift(gift)}
                                >
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl flex items-center justify-center ${isSent ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                                            }`}>
                                            {isSent ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm md:text-base text-slate-800">
                                                {isSent ? `Sent to @${gift.recipientId}` : `Received from @${gift.senderId}`}
                                            </p>
                                            <p className="text-[10px] md:text-xs text-slate-400 font-medium">
                                                {new Date(gift.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} • {gift.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-right mr-1">
                                            <p className={`font-bold text-sm md:text-lg ${isSent ? 'text-slate-800' : 'text-blue-900'}`}>
                                                {isSent ? '-' : '+'}₹{gift.amount.toFixed(2)}
                                            </p>
                                            {gift.status === 'pending' && isSent && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onCancel(gift.id); }}
                                                    className="text-[10px] text-red-500 font-bold hover:underline"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-colors" />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="py-16 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                            <p className="text-slate-400 text-sm font-medium">No transactions found.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="pt-4 border-t border-slate-50">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 p-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all text-sm font-bold"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out of G-Card</span>
                </button>
            </section>

            {/* Gift Detail Modal - Responsive sizing */}
            {viewedGift && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" onClick={() => setViewedGift(null)}>
                    <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm p-8 shadow-2xl space-y-6 animate-in slide-in-from-bottom duration-300" onClick={e => e.stopPropagation()}>
                        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-2 sm:hidden" />

                        <div className="text-center space-y-2">
                            <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">Transaction Summary</h4>
                            <p className="text-5xl font-black text-blue-900 tracking-tighter">₹{viewedGift.amount.toFixed(2)}</p>
                            <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${viewedGift.status === 'redeemed' ? 'bg-green-100 text-green-700' :
                                viewedGift.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                    viewedGift.status === 'expired' ? 'bg-slate-200 text-slate-600 line-through decoration-2' :
                                        'bg-blue-100 text-blue-700'
                                }`}>
                                {viewedGift.status}
                            </div>
                        </div>

                        <div className="space-y-4 py-6 border-y border-slate-50">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-medium">Recipient</span>
                                <span className="font-bold text-slate-800">@{viewedGift.recipientId}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-medium">Reference Code</span>
                                <code className="bg-slate-100 px-3 py-1 rounded-lg font-mono text-xs font-bold text-blue-900">{viewedGift.uniqueCode}</code>
                            </div>
                            {viewedGift.message && (
                                <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-50 relative mt-4">
                                    <MessageSquare className="w-5 h-5 text-blue-100 absolute -top-2 -right-2" />
                                    <p className="text-sm text-slate-600 italic leading-relaxed font-medium">"{viewedGift.message}"</p>
                                </div>
                            )}

                            {viewedGift.replyMessage && (
                                <div className="bg-indigo-50/40 p-5 rounded-2xl border border-indigo-50 relative mt-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Reply from @{viewedGift.recipientId}</p>
                                    </div>
                                    <p className="text-sm text-slate-600 italic leading-relaxed font-medium">"{viewedGift.replyMessage}"</p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            {(viewedGift.status === 'expired' || viewedGift.status === 'cancelled') && (
                                <button
                                    onClick={() => {
                                        setViewedGift(null);
                                        onSend(); // Navigate to send flow
                                    }}
                                    className="w-full py-4 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 active:scale-95 transition-all shadow-xl shadow-blue-900/10 uppercase tracking-widest text-xs"
                                >
                                    Resend Gift
                                </button>
                            )}

                            {viewedGift.status === 'pending' && viewedGift.senderId === user.id && (
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to cancel this gift? The amount will be refunded to your wallet.')) {
                                            onCancel(viewedGift.id);
                                            setViewedGift(null);
                                        }
                                    }}
                                    className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 active:scale-95 transition-all shadow-sm border border-red-100 uppercase tracking-widest text-xs"
                                >
                                    Cancel Gift & Refund
                                </button>
                            )}

                            <button
                                onClick={() => setViewedGift(null)}
                                className="w-full py-4 bg-slate-100 text-slate-800 font-bold rounded-2xl hover:bg-slate-200 active:scale-95 transition-all shadow-sm"
                            >
                                Back to Activity
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
