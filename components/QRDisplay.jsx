import React, { useState } from 'react';
import QRCode from "react-qr-code";
import { Copy, Check, Share2, Info } from 'lucide-react';

const QRDisplay = ({ gift, onDone }) => {
    const [copied, setCopied] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
    const [isExpired, setIsExpired] = useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const expiry = new Date(gift.expiryDate);
            const diff = expiry - now;

            if (diff <= 0) {
                setIsExpired(true);
                setTimeLeft('Expired');
                clearInterval(interval);
            } else {
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                const hours = Math.floor(diff / (1000 * 60 * 60));

                if (hours > 0) {
                    setTimeLeft(`${hours}h ${minutes}m`);
                } else {
                    setTimeLeft(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [gift.expiryDate]);

    const handleCopy = () => {
        navigator.clipboard.writeText(gift.uniqueCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'G-Card Gift',
                    text: `You've received a gift of ₹${gift.amount}! Use code ${gift.uniqueCode} to redeem it on G-Card.`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share failed', err);
            }
        }
    };

    return (
        <div className="p-8 flex flex-col min-h-full">
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase mb-4">
                    <Check className="w-3 h-3" />
                    <span>Gift Created Successfully</span>
                </div>
                <h2 className="text-2xl font-bold text-blue-900">Your Gift is Ready</h2>
                <p className="text-slate-500 text-sm mt-1">Share this code or QR with the recipient</p>
            </div>

            <div className="flex-1 flex flex-col items-center">
                <div className="mb-6 flex flex-col items-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Expires In</p>
                    <div className={`text-2xl font-mono font-black ${isExpired ? 'text-red-500' : 'text-blue-900'}`}>
                        {timeLeft}
                    </div>
                </div>

                <div className="p-8 bg-white border border-blue-50 rounded-3xl shadow-sm mb-8 relative">
                    <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center overflow-hidden relative">
                        <div className={isExpired ? 'blur-md opacity-20 transition-all duration-500' : ''}>
                            <QRCode
                                value={gift.uniqueCode}
                                size={160}
                                fgColor="#1e3a8a" // Blue-900
                                bgColor="#ffffff"
                            />
                        </div>
                        {isExpired && (
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-sm border border-red-100 uppercase tracking-wider transform -rotate-12 shadow-sm">
                                    Expired
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full space-y-4 max-w-md mx-auto">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center block">Unique Gift Code</label>
                        <div className="relative">
                            <input
                                readOnly
                                value={gift.uniqueCode}
                                className="w-full p-4 bg-slate-50 border border-blue-50 rounded-xl text-center text-xl font-mono tracking-widest text-blue-900 font-bold outline-none"
                            />
                            <button
                                onClick={handleCopy}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-blue-100/50 rounded-lg transition-colors"
                            >
                                {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-400" />}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={handleShare}
                            className="flex items-center justify-center gap-2 py-4 border-2 border-blue-50 text-blue-900 font-bold rounded-xl hover:bg-blue-50/30 transition-all"
                        >
                            <Share2 className="w-5 h-5" />
                            <span>Share</span>
                        </button>
                        <button
                            onClick={onDone}
                            className="flex items-center justify-center gap-2 py-4 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all"
                        >
                            <span>Back to Dashboard</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-10 p-4 bg-slate-50 rounded-2xl flex gap-3">
                <Info className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="text-[11px] text-slate-500 leading-relaxed">
                    The recipient can redeem this gift by scanning the QR or entering the code on their G-Card app. This code expires on <strong>{new Date(gift.expiryDate).toLocaleDateString()}</strong>.
                </div>
            </div>
        </div>
    );
};

export default QRDisplay;
