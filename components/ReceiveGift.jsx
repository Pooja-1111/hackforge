import React, { useState } from 'react';
import { QrCode, Keyboard, ArrowRight, ShieldCheck, Camera } from 'lucide-react';

const ReceiveGift = ({ onRedeem, onBack }) => {
    const [method, setMethod] = useState(null);
    const [code, setCode] = useState('');
    const [isRedeeming, setIsRedeeming] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code.trim()) {
            setIsRedeeming(true);
            setTimeout(() => {
                onRedeem(code.trim());
            }, 1500);
        }
    };

    if (!method) {
        return (
            <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8">
                    <ShieldCheck className="w-10 h-10 text-blue-900" />
                </div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Claim Your Gift</h2>
                <p className="text-slate-500 mb-10 max-w-[240px] mx-auto">
                    Scan a QR code or enter the unique identifier to redeem your money.
                </p>

                <div className="w-full space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 max-w-2xl mx-auto">
                    <button
                        onClick={() => setMethod('scan')}
                        className="w-full flex items-center gap-4 p-5 bg-blue-900 text-white rounded-2xl shadow-md hover:bg-blue-800 transition-all group"
                    >
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                            <QrCode className="w-6 h-6" />
                        </div>
                        <div className="text-left flex-1">
                            <p className="font-bold">Scan QR Code</p>
                            <p className="text-xs text-blue-200">Use your device camera</p>
                        </div>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => setMethod('code')}
                        className="w-full flex items-center gap-4 p-5 border-2 border-blue-50 bg-white text-blue-900 rounded-2xl hover:bg-blue-50/30 transition-all group"
                    >
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Keyboard className="w-6 h-6" />
                        </div>
                        <div className="text-left flex-1">
                            <p className="font-bold">Enter Unique Code</p>
                            <p className="text-xs text-slate-400">Type manually from message</p>
                        </div>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-blue-200" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 h-full">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setMethod(null)} className="text-slate-400 hover:text-blue-900">
                    <Keyboard className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-blue-900">
                    {method === 'scan' ? 'Scan to Redeem' : 'Enter Claim Code'}
                </h2>
            </div>

            {method === 'scan' ? (
                <div className="space-y-8 flex flex-col items-center">
                    <div className="w-full aspect-square bg-slate-900 rounded-3xl relative overflow-hidden flex items-center justify-center group">
                        <Camera className="w-12 h-12 text-white/20" />
                        {/* Simulated scan overlay */}
                        <div className="absolute inset-8 border-2 border-blue-400/50 rounded-2xl">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.8)]" />
                        </div>
                        <p className="absolute bottom-8 text-white/60 text-xs font-medium">Position the QR code within the frame</p>
                    </div>

                    <p className="text-sm text-center text-slate-500">
                        Scanning for a valid G-Card redemption code...
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto w-full">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-blue-900 uppercase">Code Identifier</label>
                        <input
                            type="text"
                            placeholder="e.g. GC-X892-Z"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            className="w-full p-4 border-2 border-blue-50 rounded-xl text-center text-xl font-mono tracking-widest outline-none focus:border-blue-200 transition-colors"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isRedeeming}
                        className="w-full py-4 bg-blue-900 text-white font-bold rounded-xl shadow-md hover:bg-blue-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                        {isRedeeming ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Verifying...</span>
                            </>
                        ) : (
                            <span>Redeem Money</span>
                        )}
                    </button>

                    <div className="p-4 bg-blue-50/50 rounded-xl text-center">
                        <p className="text-xs text-slate-500">Only the intended recipient's wallet can receive this credit. Verification is automatic.</p>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ReceiveGift;
