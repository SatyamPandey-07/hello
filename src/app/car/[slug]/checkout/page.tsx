"use client";

import { use, useState, useRef } from "react";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CreditCard, Lock, CheckCircle2, Download, User, MapPin, Phone, Loader2 } from "lucide-react";
import { carModels } from "@/data/carModels";

type Step = "details" | "payment" | "success";

function generateReceiptHTML(car: typeof carModels[0], formData: { name: string; address: string; phone: string }) {
    const orderNum = `POR-${Date.now().toString(36).toUpperCase()}`;
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const tax = car.priceNum * 0.08;
    const total = car.priceNum + tax;

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Porsche Receipt - ${orderNum}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', -apple-system, sans-serif; background: #fff; color: #111; padding: 60px; max-width: 800px; margin: 0 auto; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #111; padding-bottom: 30px; margin-bottom: 40px; }
  .logo { font-size: 28px; font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase; }
  .receipt-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #888; margin-bottom: 4px; }
  .order-num { font-size: 16px; font-weight: 600; }
  .date { font-size: 13px; color: #666; margin-top: 2px; }
  .section { margin-bottom: 35px; }
  .section-title { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #888; margin-bottom: 12px; font-weight: 500; }
  .customer-info { font-size: 14px; line-height: 1.8; }
  .car-section { background: #f8f8f8; border-radius: 12px; padding: 30px; margin-bottom: 35px; }
  .car-name { font-size: 24px; font-weight: 300; letter-spacing: 0.1em; margin-bottom: 4px; }
  .car-tagline { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #888; margin-bottom: 16px; }
  .specs { display: flex; gap: 30px; }
  .spec { font-size: 13px; color: #555; }
  .spec span { font-weight: 600; color: #111; }
  .line-items { border-top: 1px solid #e5e5e5; }
  .line-item { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; }
  .line-item.total { border-top: 2px solid #111; border-bottom: none; font-weight: 600; font-size: 18px; padding-top: 18px; }
  .footer { margin-top: 60px; text-align: center; font-size: 11px; color: #aaa; letter-spacing: 0.15em; }
  .footer p { margin-bottom: 4px; }
  .stamp { display: inline-block; border: 3px solid #22c55e; color: #22c55e; padding: 8px 24px; font-size: 14px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; transform: rotate(-5deg); margin-top: 30px; border-radius: 4px; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">Porsche</div>
      <div style="font-size:12px;color:#888;margin-top:4px;">Purchase Confirmation</div>
    </div>
    <div style="text-align:right;">
      <div class="receipt-label">Order Number</div>
      <div class="order-num">${orderNum}</div>
      <div class="date">${date}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Customer Details</div>
    <div class="customer-info">
      <strong>${formData.name}</strong><br>
      ${formData.address}<br>
      ${formData.phone}
    </div>
  </div>

  <div class="car-section">
    <div class="car-tagline">${car.tagline}</div>
    <div class="car-name">${car.name}</div>
    <div class="specs">
      <div class="spec"><span>${car.specs.power}</span> Power</div>
      <div class="spec"><span>${car.specs.speed}</span> Top Speed</div>
      <div class="spec"><span>${car.specs.acceleration}</span> 0-60 mph</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Order Summary</div>
    <div class="line-items">
      <div class="line-item"><span>${car.name} — Base Price</span><span>$${car.priceNum.toLocaleString()}</span></div>
      <div class="line-item"><span>Destination Charge</span><span>$1,450</span></div>
      <div class="line-item"><span>Tax (8%)</span><span>$${tax.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></div>
      <div class="line-item total"><span>Total</span><span>$${(total + 1450).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></div>
    </div>
  </div>

  <div style="text-align:center;margin-top:40px;">
    <div class="stamp">✓ Paid</div>
  </div>

  <div class="footer">
    <p>PORSCHE EXPERIENCE · STUTTGART, GERMANY</p>
    <p>This is a simulated purchase receipt for demonstration purposes only.</p>
  </div>
</body>
</html>`;
}

export default function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const car = carModels.find(c => c.slug === slug);

    const [step, setStep] = useState<Step>("details");
    const [formData, setFormData] = useState({ name: "", address: "", phone: "" });
    const [cardData, setCardData] = useState({ number: "", expiry: "", cvv: "", holder: "" });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!car) return notFound();

    const validateDetails = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePayment = () => {
        const newErrors: Record<string, string> = {};
        if (cardData.number.replace(/\s/g, "").length < 16) newErrors.number = "Enter a valid card number";
        if (!cardData.expiry.trim()) newErrors.expiry = "Expiry required";
        if (cardData.cvv.length < 3) newErrors.cvv = "Enter CVV";
        if (!cardData.holder.trim()) newErrors.holder = "Cardholder name required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleDetailsSubmit = () => {
        if (validateDetails()) {
            setStep("payment");
            setErrors({});
        }
    };

    const handlePayment = () => {
        if (validatePayment()) {
            setProcessing(true);
            setTimeout(() => {
                setProcessing(false);
                setStep("success");
            }, 3000);
        }
    };

    const handleDownloadReceipt = () => {
        const html = generateReceiptHTML(car, formData);
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Porsche_${car.name.replace(/\s/g, "_")}_Receipt.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const formatCardNumber = (val: string) => {
        const cleaned = val.replace(/\D/g, "").slice(0, 16);
        return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    };

    const formatExpiry = (val: string) => {
        const cleaned = val.replace(/\D/g, "").slice(0, 4);
        if (cleaned.length > 2) return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
        return cleaned;
    };

    const tax = car.priceNum * 0.08;
    const total = car.priceNum + tax + 1450;

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href={`/car/${car.slug}`} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm tracking-wider uppercase">Back to {car.name}</span>
                    </Link>
                    <div className="flex items-center gap-2 text-white/40">
                        <Lock className="w-3 h-3" />
                        <span className="text-xs tracking-wider uppercase">Secure Checkout</span>
                    </div>
                </div>
            </nav>

            <div className="pt-24 pb-16 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-4 mb-16">
                        {[
                            { key: "details", label: "Your Details", num: 1 },
                            { key: "payment", label: "Payment", num: 2 },
                            { key: "success", label: "Confirmation", num: 3 },
                        ].map((s, i) => {
                            const isActive = s.key === step;
                            const isDone = (step === "payment" && s.key === "details") || step === "success";
                            return (
                                <div key={s.key} className="flex items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ${
                                            isDone ? 'bg-emerald-500 text-white' :
                                            isActive ? 'bg-white text-black' :
                                            'bg-white/5 text-white/30 border border-white/10'
                                        }`}>
                                            {isDone ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                                        </div>
                                        <span className={`text-sm tracking-wider transition-colors hidden sm:block ${
                                            isActive ? 'text-white' : isDone ? 'text-emerald-400' : 'text-white/30'
                                        }`}>{s.label}</span>
                                    </div>
                                    {i < 2 && <div className={`w-16 h-[1px] transition-colors ${isDone ? 'bg-emerald-500' : 'bg-white/10'}`} />}
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Main Form Area */}
                        <div className="lg:col-span-3">
                            <AnimatePresence mode="wait">
                                {/* Step 1: Details */}
                                {step === "details" && (
                                    <motion.div
                                        key="details"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h2 className="text-3xl font-light tracking-wider mb-2">Your Details</h2>
                                            <p className="text-white/50">Please enter your information to proceed.</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="flex items-center gap-2 text-sm text-white/60 mb-2">
                                                    <User className="w-4 h-4" /> Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="John Doe"
                                                    className={`w-full px-5 py-4 bg-white/[0.03] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors ${errors.name ? 'border-red-500/50' : 'border-white/10'}`}
                                                />
                                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="flex items-center gap-2 text-sm text-white/60 mb-2">
                                                    <MapPin className="w-4 h-4" /> Address
                                                </label>
                                                <textarea
                                                    value={formData.address}
                                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                                    placeholder="123 Main Street, City, State, ZIP"
                                                    rows={3}
                                                    className={`w-full px-5 py-4 bg-white/[0.03] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none ${errors.address ? 'border-red-500/50' : 'border-white/10'}`}
                                                />
                                                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                                            </div>
                                            <div>
                                                <label className="flex items-center gap-2 text-sm text-white/60 mb-2">
                                                    <Phone className="w-4 h-4" /> Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="+1 (234) 567-8900"
                                                    className={`w-full px-5 py-4 bg-white/[0.03] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors ${errors.phone ? 'border-red-500/50' : 'border-white/10'}`}
                                                />
                                                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleDetailsSubmit}
                                            className="group w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium tracking-wider uppercase hover:bg-white/90 transition-all rounded-xl"
                                        >
                                            Continue to Payment
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                )}

                                {/* Step 2: Payment */}
                                {step === "payment" && (
                                    <motion.div
                                        key="payment"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h2 className="text-3xl font-light tracking-wider mb-2">Payment</h2>
                                            <p className="text-white/50">Enter your card details to complete the purchase.</p>
                                        </div>

                                        {/* Card Preview */}
                                        <div className="relative h-52 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900 p-6 flex flex-col justify-between overflow-hidden border border-white/10">
                                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                                            <div className="flex justify-between items-start relative z-10">
                                                <div className="w-12 h-9 bg-amber-400/80 rounded-md" />
                                                <CreditCard className="w-8 h-8 text-white/30" />
                                            </div>
                                            <div className="relative z-10">
                                                <p className="text-xl tracking-[0.3em] font-light mb-3">
                                                    {cardData.number || "•••• •••• •••• ••••"}
                                                </p>
                                                <div className="flex justify-between">
                                                    <p className="text-xs text-white/50 uppercase tracking-wider">{cardData.holder || "Your Name"}</p>
                                                    <p className="text-xs text-white/50">{cardData.expiry || "MM/YY"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="text-sm text-white/60 mb-2 block">Card Number</label>
                                                <input
                                                    type="text"
                                                    value={cardData.number}
                                                    onChange={e => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength={19}
                                                    className={`w-full px-5 py-4 bg-white/[0.03] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors font-mono tracking-wider ${errors.number ? 'border-red-500/50' : 'border-white/10'}`}
                                                />
                                                {errors.number && <p className="text-red-400 text-xs mt-1">{errors.number}</p>}
                                            </div>
                                            <div>
                                                <label className="text-sm text-white/60 mb-2 block">Cardholder Name</label>
                                                <input
                                                    type="text"
                                                    value={cardData.holder}
                                                    onChange={e => setCardData({ ...cardData, holder: e.target.value.toUpperCase() })}
                                                    placeholder="JOHN DOE"
                                                    className={`w-full px-5 py-4 bg-white/[0.03] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors uppercase tracking-wider ${errors.holder ? 'border-red-500/50' : 'border-white/10'}`}
                                                />
                                                {errors.holder && <p className="text-red-400 text-xs mt-1">{errors.holder}</p>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm text-white/60 mb-2 block">Expiry</label>
                                                    <input
                                                        type="text"
                                                        value={cardData.expiry}
                                                        onChange={e => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                                                        placeholder="MM/YY"
                                                        maxLength={5}
                                                        className={`w-full px-5 py-4 bg-white/[0.03] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors font-mono ${errors.expiry ? 'border-red-500/50' : 'border-white/10'}`}
                                                    />
                                                    {errors.expiry && <p className="text-red-400 text-xs mt-1">{errors.expiry}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-sm text-white/60 mb-2 block">CVV</label>
                                                    <input
                                                        type="text"
                                                        value={cardData.cvv}
                                                        onChange={e => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                                                        placeholder="123"
                                                        maxLength={4}
                                                        className={`w-full px-5 py-4 bg-white/[0.03] border rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors font-mono ${errors.cvv ? 'border-red-500/50' : 'border-white/10'}`}
                                                    />
                                                    {errors.cvv && <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => { setStep("details"); setErrors({}); }}
                                                className="px-6 py-4 bg-white/5 text-white/60 text-sm tracking-wider uppercase hover:bg-white/10 transition-all rounded-xl border border-white/10"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handlePayment}
                                                disabled={processing}
                                                className="group flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium tracking-wider uppercase hover:bg-white/90 transition-all rounded-xl disabled:opacity-50"
                                            >
                                                {processing ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Lock className="w-4 h-4" />
                                                        Pay ${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        <p className="text-center text-white/20 text-xs">
                                            This is a simulated payment for demonstration only. No real charges will be made.
                                        </p>
                                    </motion.div>
                                )}

                                {/* Step 3: Success */}
                                {step === "success" && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12 space-y-8"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                                            className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500"
                                        >
                                            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                                        </motion.div>

                                        <div>
                                            <h2 className="text-4xl font-light tracking-wider mb-3">Congratulations!</h2>
                                            <p className="text-white/50 text-lg">
                                                Your {car.name} has been reserved successfully.
                                            </p>
                                        </div>

                                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 max-w-sm mx-auto text-left space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-white/50 text-sm">Customer</span>
                                                <span className="text-sm">{formData.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-white/50 text-sm">Vehicle</span>
                                                <span className="text-sm">{car.name}</span>
                                            </div>
                                            <div className="flex justify-between border-t border-white/10 pt-3 mt-3">
                                                <span className="text-white/50 text-sm font-medium">Total Paid</span>
                                                <span className="text-sm font-medium text-emerald-400">${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <button
                                                onClick={handleDownloadReceipt}
                                                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium tracking-wider uppercase hover:bg-white/90 transition-all rounded-xl"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download Receipt
                                            </button>
                                            <Link href="/">
                                                <button className="w-full px-8 py-4 bg-white/5 text-white text-sm tracking-wider uppercase hover:bg-white/10 transition-all rounded-xl border border-white/10">
                                                    Back to Home
                                                </button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-2">
                            <div className="sticky top-24 bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-6">
                                <h3 className="text-lg tracking-wider font-light">Order Summary</h3>

                                <div className="relative h-40 rounded-xl overflow-hidden">
                                    <Image
                                        src={car.image}
                                        alt={car.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-3 left-3">
                                        <p className="text-xs text-white/60 uppercase tracking-wider">{car.tagline}</p>
                                        <p className="text-lg font-light">{car.name}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-white/60">
                                        <span>Base Price</span>
                                        <span className="text-white">${car.priceNum.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-white/60">
                                        <span>Destination Charge</span>
                                        <span className="text-white">$1,450</span>
                                    </div>
                                    <div className="flex justify-between text-white/60">
                                        <span>Tax (8%)</span>
                                        <span className="text-white">${tax.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-3 flex justify-between text-base font-medium">
                                        <span>Total</span>
                                        <span>${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-white/30 text-xs">
                                    <Lock className="w-3 h-3" />
                                    <span>256-bit SSL Encrypted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
