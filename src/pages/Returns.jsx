import React from 'react';
import { HelpCircle, Truck, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';

const Returns = () => {
    return (
        <div className="container mx-auto px-4 md:px-6 py-20">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Return & Refund Policy</h1>
                    <p className="text-secondary-500 font-medium">Last Updated: February 2026</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-primary-50 p-8 rounded-3xl border border-primary-100 flex items-start gap-4">
                        <RefreshCw className="text-primary-500 mt-1 shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-lg mb-2 text-primary-900">30-Day Returns</h3>
                            <p className="text-sm text-primary-800/80 leading-relaxed">We accept returns within 30 days of purchase for any unworn, unwashed items with original tags attached.</p>
                        </div>
                    </div>
                    <div className="bg-secondary-50 p-8 rounded-3xl border border-secondary-100 flex items-start gap-4">
                        <Truck className="text-secondary-900 mt-1 shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-lg mb-2 text-secondary-900">Exchange Policy</h3>
                            <p className="text-sm text-secondary-500 leading-relaxed">Need a different size? We offer free exchanges on all domestic orders within 15 days of delivery.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-12 bg-white p-8 md:p-12 rounded-3xl border border-secondary-100 shadow-sm">
                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                            <ShieldCheck className="text-primary-500" size={20} /> General Return Process
                        </h2>
                        <div className="space-y-4 text-secondary-600 leading-relaxed">
                            <p>1. <strong>Initiate:</strong> Log in to your account and go to "Order History" to start a return or email support@7fitz.com.</p>
                            <p>2. <strong>Prepare:</strong> Pack the items securely in the original packaging if possible.</p>
                            <p>3. <strong>Ship:</strong> Use our prepaid digital label or drop it off at any authorized courier center.</p>
                            <p>4. <strong>Refund:</strong> Once we receive and inspect your items, your refund will be processed to the original payment method within 5-7 business days.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                            <AlertCircle className="text-primary-500" size={20} /> Non-Returnable Items
                        </h2>
                        <ul className="list-disc pl-5 space-y-3 text-secondary-600">
                            <li>Intimate apparel (lingerie, swimwear) for hygiene reasons.</li>
                            <li>Items marked as "Final Sale" or "Clearance".</li>
                            <li>Gift cards or products purchased with gift credit.</li>
                            <li>Any item that shows visible signs of wear or damage.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                            <HelpCircle className="text-primary-500" size={20} /> Damaged or Wrong Items
                        </h2>
                        <p className="text-secondary-600 leading-relaxed">
                            If you receive a damaged or incorrect item, please contact us immediately at support@7fitz.com with photos of the product. we will prioritize these cases and issue an immediate replacement or full refund including shipping costs.
                        </p>
                    </section>
                </div>

                <div className="text-center p-10 bg-secondary-900 text-white rounded-3xl">
                    <h3 className="text-2xl font-serif font-bold mb-4">Still have questions?</h3>
                    <p className="text-secondary-400 mb-8">Our customer support team is available 24/7 to assist you.</p>
                    <a href="/contact" className="btn-primary">Contact Support</a>
                </div>
            </div>
        </div>
    );
};

export default Returns;
