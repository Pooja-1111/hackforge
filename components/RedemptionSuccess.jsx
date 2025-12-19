import React, { useState } from 'react';
import { CheckCircle, Heart, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

const RedemptionSuccess = ({ gift, onReply, onDone }) => {
    const [reply, setReply] = useState('');

    // Trigger confetti on mount
    React.useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#1e3a8a', '#60a5fa', '#fbbf24']
        });
    }, []);

    return (
        <div className="p-8 h-full flex flex-col items-center justify-center max-w-lg mx-auto animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-3xl font-black text-blue-900 mb-2 tracking-tight">Woohoo!</h2>
            <p className="text-slate-500 font-medium mb-8">You've received a gift!</p>

            <div className="w-full bg-white border border-blue-50 rounded-3xl p-8 shadow-xl shadow-blue-900/5 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900" />
                <div className="text-center space-y-4">
                    <div>
                        <p className="text-xs uppercase font-bold text-slate-400 tracking-widest">Amount Added</p>
                        <p className="text-5xl font-black text-blue-900 tracking-tighter mt-1">₹{gift.amount.toFixed(2)}</p>
                    </div>

                    <div className="pt-6 border-t border-slate-50">
                        <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full text-xs font-bold text-blue-900 mb-3">
                            From @{gift.senderId}
                        </div>
                        {gift.message && (
                            <p className="text-slate-600 italic font-medium leading-relaxed">"{gift.message}"</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Say thanks..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-blue-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100/50 bg-white transition-all font-medium"
                    />
                    <Heart className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 w-5 h-5 fill-red-400" />
                    {reply && (
                        <button
                            onClick={() => onReply(reply)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-all"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <button
                    onClick={onDone}
                    className="w-full py-4 text-slate-400 hover:text-blue-900 font-bold transition-colors text-sm"
                >
                    Skip & Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default RedemptionSuccess;
