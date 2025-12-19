import React, { useState, useEffect } from 'react';
import { Search, CreditCard, CheckCircle, Sparkles, Wand2, X } from 'lucide-react';
import { getMessageSuggestions } from '../services/geminiService';

const SendGift = ({ sender, onComplete, onBack }) => {
    const [step, setStep] = useState(1);
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [tone, setTone] = useState('Friendly');
    const [context, setContext] = useState('');
    const [validity, setValidity] = useState(60); // Default 60 minutes
    const [isSearching, setIsSearching] = useState(false);
    const [isValidRecipient, setIsValidRecipient] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    // Search logic
    useEffect(() => {
        if (recipient.length > 2) {
            setIsSearching(true);
            const timer = setTimeout(() => {
                setIsSearching(false);
                setIsValidRecipient(true); // Simulated: all users found
            }, 800);
            return () => clearTimeout(timer);
        } else {
            setIsValidRecipient(false);
        }
    }, [recipient]);

    const handlePayment = () => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: Number(amount) * 100,
            currency: "INR",
            name: "G-Card Gift",
            description: `Gift for @${recipient}`,
            image: "https://cdn-icons-png.flaticon.com/512/4213/4213958.png", // Generic gift icon
            handler: function (response) {
                // alert(response.razorpay_payment_id);
                setPaymentDone(true);
                setTimeout(() => {
                    setStep(2);
                }, 1200);
            },
            prefill: {
                name: sender.username,
                email: "test@example.com",
                contact: "9999999999"
            },
            notes: {
                address: "G-Card Corporate Office"
            },
            theme: {
                color: "#1e3a8a" // Blue-900
            }
        };

        if (!window.Razorpay) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.description);
        });
        rzp1.open();
    };

    const handleGenerateMessages = async () => {
        if (!amount || !recipient) return;
        setIsGenerating(true);
        const msgs = await getMessageSuggestions(Number(amount), recipient, tone, context);
        setSuggestions(msgs);
        setIsGenerating(false);
    };

    const handleFinalize = () => {
        const newGift = {
            id: Math.random().toString(36).substr(2, 9),
            senderId: sender.username,
            recipientId: recipient,
            amount: Number(amount),
            message: message,
            uniqueCode: `GC-${Math.random().toString(36).toUpperCase().substr(2, 6)}`,
            status: 'pending',
            createdAt: new Date().toISOString(),
            expiryDate: new Date(Date.now() + validity * 60 * 1000).toISOString()
        };
        onComplete(newGift);
    };

    return (
        <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto max-w-3xl mx-auto w-full">
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-tight">Send a Gift</h2>
                <div className="flex gap-1.5 mt-4">
                    <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-900' : 'bg-slate-100'}`} />
                    <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-900' : 'bg-slate-100'}`} />
                </div>
            </div>

            <div className="flex-1 space-y-8">
                {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Recipient</label>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-900 transition-colors w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 border border-blue-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100/50 bg-white transition-all text-sm font-semibold"
                                />
                                {recipient && (
                                    <button
                                        onClick={() => setRecipient('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                                {isSearching && (
                                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                                        <div className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}
                            </div>
                            {isValidRecipient && (
                                <p className="text-[11px] text-green-600 font-bold px-2 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    Verified: @{recipient}
                                </p>
                            )}
                        </div>

                        <div className={`space-y-3 transition-all duration-300 ${!isValidRecipient ? 'opacity-30 pointer-events-none' : ''}`}>
                            <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Gift Amount</label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-2xl text-slate-300">₹</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full pl-11 pr-4 py-5 text-3xl font-black text-blue-900 bg-slate-50 border border-blue-50 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-100/50 transition-all placeholder:text-slate-200"
                                />
                            </div>
                        </div>

                        <div className={`space-y-3 transition-all duration-300 ${!amount || !isValidRecipient ? 'opacity-30 pointer-events-none' : ''}`}>
                            <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Validity Period</label>
                            <div className="flex gap-2">
                                {[
                                    { label: '15 Mins', value: 15 },
                                    { label: '1 Hour', value: 60 },
                                    { label: '24 Hours', value: 1440 },
                                    { label: '7 Days', value: 10080 }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setValidity(opt.value)}
                                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border ${validity === opt.value
                                                ? 'bg-blue-900 text-white border-blue-900 shadow-md'
                                                : 'bg-white text-slate-500 border-blue-50 hover:border-blue-200'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={`space-y-4 transition-all duration-300 ${!amount || !isValidRecipient ? 'opacity-30 pointer-events-none' : ''}`}>
                            <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Quick Payment</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    onClick={handlePayment}
                                    className="flex items-center gap-4 p-5 border border-blue-50 bg-white rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 active:scale-95 transition-all shadow-sm group"
                                >
                                    <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                                        <CreditCard className="w-5 h-5 text-blue-900" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-slate-800">Saved UPI</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Pay instantly</p>
                                    </div>
                                </button>
                                <button
                                    onClick={handlePayment}
                                    className="flex items-center gap-4 p-5 border border-blue-50 bg-white rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 active:scale-95 transition-all shadow-sm group"
                                >
                                    <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                                        <div className="w-5 h-5 border-2 border-blue-900 rounded-md flex items-center justify-center">
                                            <div className="w-2 h-2 bg-blue-900 rounded-sm" />
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-slate-800">Scan UPI QR</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Use external scanner</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {paymentDone && (
                            <div className="flex items-center justify-center gap-2 p-4 bg-green-50 text-green-700 rounded-2xl animate-in zoom-in duration-300">
                                <CheckCircle className="w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-wider">Payment Verified</span>
                            </div>
                        )}
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Add a Message</label>
                            </div>

                            <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-blue-50/50">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tone</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Friendly', 'Funny', 'Heartfelt', 'Witty', 'Professional'].map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setTone(t)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${tone === t ? 'bg-blue-900 text-white shadow-sm' : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300'}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Occasion (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Birthday, Pizza night, Sorry I'm late..."
                                        value={context}
                                        onChange={(e) => setContext(e.target.value)}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-slate-300"
                                    />
                                </div>

                                <button
                                    onClick={handleGenerateMessages}
                                    disabled={isGenerating}
                                    className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-3 bg-blue-100 text-blue-900 rounded-xl hover:bg-blue-200 disabled:opacity-50 active:scale-95 transition-all"
                                >
                                    {isGenerating ? (
                                        <div className="w-3 h-3 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Wand2 className="w-4 h-4" />
                                    )}
                                    <span className="text-xs font-black uppercase">Generate {tone} Suggestions</span>
                                </button>
                            </div>

                            <textarea
                                rows={4}
                                placeholder="Or write your own..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-5 border border-blue-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100/50 bg-white transition-all resize-none text-sm font-medium leading-relaxed"
                            />
                        </div>

                        {suggestions.length > 0 && (
                            <div className="space-y-3 animate-in fade-in zoom-in-95 duration-500">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Suggested for you</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestions.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setMessage(s)}
                                            className="px-4 py-2.5 bg-white border border-blue-50 rounded-xl text-xs font-bold text-slate-600 hover:border-blue-200 hover:text-blue-900 active:scale-95 transition-all shadow-sm"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pt-6">
                            <div className="p-6 bg-blue-900 rounded-3xl shadow-xl shadow-blue-900/10 space-y-4">
                                <div className="flex justify-between items-center text-white/60 text-[10px] font-black uppercase tracking-widest px-1">
                                    <span>Gift Summary</span>
                                    <span>Recipient: @{recipient}</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-white/40 text-xl font-black">₹</span>
                                    <span className="text-white text-5xl font-black tracking-tighter">{Number(amount).toFixed(2)}</span>
                                </div>
                                <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Valid for 30 days after generation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 md:mt-10 pb-4">
                {step === 2 && (
                    <button
                        onClick={handleFinalize}
                        className="w-full py-5 bg-blue-900 text-white font-black rounded-2xl shadow-xl shadow-blue-900/10 hover:bg-blue-800 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                    >
                        <span>Finalize & Get QR</span>
                        <Sparkles className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SendGift;
