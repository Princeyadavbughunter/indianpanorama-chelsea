"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { COUNTRY_CODES, DEFAULT_COUNTRY, keyFor } from "./countryCodes";

interface ReservationFormProps {
    onClose?: () => void;
}

const ReservationForm = ({ onClose }: ReservationFormProps) => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', date: '', time: '', guests: 1, specialRequests: ''
    });
    const [countryKey, setCountryKey] = useState<string>(keyFor(DEFAULT_COUNTRY));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (onClose) {
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = "unset";
            };
        }
    }, [onClose]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const country = COUNTRY_CODES.find(c => keyFor(c) === countryKey) ?? DEFAULT_COUNTRY;
            const localDigits = formData.phone.replace(/\D/g, '').replace(/^0+/, '');
            const fullPhone = `+${country.code}${localDigits}`;
            const payload = {
                ...formData,
                phone: fullPhone,
                guests: Number(formData.guests),
            };
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setSuccessMessage("Reservation requested successfully! We will contact you soon.");
                if (onClose) {
                    setTimeout(() => {
                        onClose();
                    }, 2000);
                }
            } else {
                alert("Failed to confirm reservation.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={onClose ? "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4" : "w-full py-20 flex items-center justify-center p-4"}>
            <div className={`relative w-full max-w-[750px] bg-[#161d18] border border-[#CBAC70]/30 p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl my-auto`}>

                {/* Close/Cancel Button */}
                {onClose ? (
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-[#e2d6c1] hover:text-[#CBAC70] transition-colors rounded-full hover:bg-white/5"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                ) : (
                    <Link
                        href="/"
                        className="absolute top-6 right-6 p-2 text-[#e2d6c1] hover:text-[#CBAC70] transition-colors rounded-full hover:bg-white/5"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </Link>
                )}

                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-[#CBAC70] tracking-[4px] text-xs font-semibold uppercase mb-3">
                        Reserve your Table
                    </p>
                    <h2 className="text-[36px] md:text-[44px] leading-tight text-[#e2d6c1] font-serif font-light">
                        Reservations
                    </h2>
                    <div className="w-16 h-[1px] bg-[#CBAC70] mx-auto mt-6 opacity-30"></div>
                </div>

                {/* Form */}
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="block text-[#e2d6c1] text-[13px] tracking-wider uppercase font-semibold">
                                Your Name <span className="text-[#CBAC70]">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full h-[48px] px-4 bg-[#1d2620] border border-[#CBAC70]/20 text-[#e2d6c1] rounded-md focus:outline-none focus:border-[#CBAC70] focus:ring-1 focus:ring-[#CBAC70] transition-colors placeholder-[#e2d6c1]/30"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block text-[#e2d6c1] text-[13px] tracking-wider uppercase font-semibold">
                                Email Address <span className="text-[#CBAC70]">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full h-[48px] px-4 bg-[#1d2620] border border-[#CBAC70]/20 text-[#e2d6c1] rounded-md focus:outline-none focus:border-[#CBAC70] focus:ring-1 focus:ring-[#CBAC70] transition-colors placeholder-[#e2d6c1]/30"
                                placeholder="john@example.com"
                            />
                        </div>

                        {/* Mobile with country code */}
                        <div className="space-y-2">
                            <label className="block text-[#e2d6c1] text-[13px] tracking-wider uppercase font-semibold">
                                Mobile No. <span className="text-[#CBAC70]">*</span>
                            </label>
                            <div className="flex gap-2">
                                <select
                                    value={countryKey}
                                    onChange={(e) => setCountryKey(e.target.value)}
                                    aria-label="Country dial code"
                                    className="h-[48px] w-[110px] shrink-0 px-2 bg-[#1d2620] border border-[#CBAC70]/20 text-[#e2d6c1] rounded-md focus:outline-none focus:border-[#CBAC70] focus:ring-1 focus:ring-[#CBAC70] transition-colors text-[14px] [color-scheme:dark] cursor-pointer"
                                >
                                    {COUNTRY_CODES.map((c) => (
                                        <option key={keyFor(c)} value={keyFor(c)} className="bg-[#1d2620] text-[#e2d6c1]">
                                            {c.flag} +{c.code} {c.iso}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    inputMode="numeric"
                                    pattern="[0-9\s]{6,15}"
                                    className="flex-1 min-w-0 h-[48px] px-4 bg-[#1d2620] border border-[#CBAC70]/20 text-[#e2d6c1] rounded-md focus:outline-none focus:border-[#CBAC70] focus:ring-1 focus:ring-[#CBAC70] transition-colors placeholder-[#e2d6c1]/30"
                                    placeholder="7911 123456"
                                />
                            </div>
                        </div>

                        {/* No of Guests */}
                        <div className="space-y-2">
                            <label className="block text-[#e2d6c1] text-[13px] tracking-wider uppercase font-semibold">
                                No. of Guests <span className="text-[#CBAC70]">*</span>
                            </label>
                            <input
                                type="number"
                                name="guests"
                                value={formData.guests}
                                onChange={handleChange}
                                min="1"
                                required
                                className="w-full h-[48px] px-4 bg-[#1d2620] border border-[#CBAC70]/20 text-[#e2d6c1] rounded-md focus:outline-none focus:border-[#CBAC70] focus:ring-1 focus:ring-[#CBAC70] transition-colors placeholder-[#e2d6c1]/30"
                            />
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="block text-[#e2d6c1] text-[13px] tracking-wider uppercase font-semibold">
                                Date <span className="text-[#CBAC70]">*</span>
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full h-[48px] px-4 bg-[#1d2620] border border-[#CBAC70]/20 text-[#e2d6c1] rounded-md focus:outline-none focus:border-[#CBAC70] focus:ring-1 focus:ring-[#CBAC70] transition-colors placeholder-[#e2d6c1]/30 [color-scheme:dark]"
                            />
                        </div>

                        {/* Time */}
                        <div className="space-y-2">
                            <label className="block text-[#e2d6c1] text-[13px] tracking-wider uppercase font-semibold">
                                Time <span className="text-[#CBAC70]">*</span>
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full h-[48px] px-4 bg-[#1d2620] border border-[#CBAC70]/20 text-[#e2d6c1] rounded-md focus:outline-none focus:border-[#CBAC70] focus:ring-1 focus:ring-[#CBAC70] transition-colors placeholder-[#e2d6c1]/30 [color-scheme:dark]"
                            />
                        </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2 pt-2">
                        <label className="block text-[#e2d6c1] text-[13px] tracking-wider uppercase font-semibold">
                            Special Requests (Optional)
                        </label>
                        <textarea
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-[#1d2620] border border-[#CBAC70]/20 text-[#e2d6c1] rounded-md focus:outline-none focus:border-[#CBAC70] focus:ring-1 focus:ring-[#CBAC70] transition-colors placeholder-[#e2d6c1]/30 resize-none"
                            placeholder="Anniversary, dietary restrictions, etc."
                        />
                    </div>

                    {successMessage && <div className="text-center text-[#2ecc71] mt-4 font-medium">{successMessage}</div>}

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-[280px] h-[54px] bg-[#CBAC70] text-[#161d18] font-bold text-[14px] tracking-[2px] uppercase hover:bg-[#e2d6c1] disabled:opacity-50 transition-all duration-300 rounded-md shadow-[0_4px_14px_rgba(203,172,112,0.3)]"
                        >
                            {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ReservationForm;
