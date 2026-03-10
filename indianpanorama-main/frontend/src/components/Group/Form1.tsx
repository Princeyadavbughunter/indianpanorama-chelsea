"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const Form1 = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', phone: '', email: '', eventDescription: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group-bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setMessage('Your group booking inquiry has been submitted successfully!');
                setFormData({ firstName: '', lastName: '', phone: '', email: '', eventDescription: '' });
            } else {
                setMessage('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Failed to submit form. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="w-full flex flex-col md:flex-row bg-[#f4f1ea] min-h-[90vh]">
                {/* Left Side - Image */}
                <div className="w-full md:w-1/2 relative min-h-[500px] md:min-h-auto">
                    <Image
                        src="/Group/1.jpeg"
                        alt="Group Dining"
                        fill
                        className="object-cover object-center"
                    />
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-32 flex flex-col justify-center">
                    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-1/2">
                                <label className="block text-[#4a4a4a] font-[family-name:var(--font-roboto-serif)] font-medium mb-3 text-[24px] leading-[28.8px] tracking-[0] align-middle">
                                    First Name<span className="text-[#c5a666]">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-white p-4 outline-none focus:ring-1 focus:ring-[#c5a666] transition-all border border-transparent focus:border-[#c5a666]"
                                    required
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <label className="block text-[#4a4a4a] font-[family-name:var(--font-roboto-serif)] font-medium mb-3 text-[24px] leading-[28.8px] tracking-[0] align-middle">
                                    Last Name<span className="text-[#c5a666]">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-white p-4 outline-none focus:ring-1 focus:ring-[#c5a666] transition-all border border-transparent focus:border-[#c5a666]"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#4a4a4a] font-[family-name:var(--font-roboto-serif)] font-medium mb-3 text-[24px] leading-[28.8px] tracking-[0] align-middle">
                                Mobile No.<span className="text-[#c5a666]">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-white p-4 outline-none focus:ring-1 focus:ring-[#c5a666] transition-all border border-transparent focus:border-[#c5a666]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[#4a4a4a] font-[family-name:var(--font-roboto-serif)] font-medium mb-3 text-[24px] leading-[28.8px] tracking-[0] align-middle">
                                Email<span className="text-[#c5a666]">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white p-4 outline-none focus:ring-1 focus:ring-[#c5a666] transition-all border border-transparent focus:border-[#c5a666]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[#4a4a4a] font-[family-name:var(--font-roboto-serif)] font-medium mb-3 text-[24px] leading-[28.8px] tracking-[0] align-middle">
                                Event Descriptions<span className="text-[#c5a666]">*</span>
                            </label>
                            <textarea
                                name="eventDescription"
                                value={formData.eventDescription}
                                onChange={handleChange}
                                rows={5}
                                className="w-full bg-white p-4 outline-none focus:ring-1 focus:ring-[#c5a666] transition-all border border-transparent focus:border-[#c5a666]"
                                required
                            ></textarea>
                        </div>

                        {message && (
                            <div className={`mt-4 text-center ${message.includes('error') || message.includes('Failed') ? 'text-red-500' : 'text-green-600'}`}>
                                {message}
                            </div>
                        )}

                        <div className="flex justify-center mt-10">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#bba061] text-white px-10 py-4 text-sm tracking-widest hover:bg-[#a68d52] disabled:opacity-50 transition-colors duration-300 rounded-sm font-[family-name:var(--font-jost)] font-medium capitalize"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <div className="w-full h-20 bg-white"></div>
        </>
    );
};

export default Form1;
