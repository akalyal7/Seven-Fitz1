import React from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-secondary-50 py-12 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 md:p-12"
      >
        {/* Title */}
        <h1 className="text-4xl font-serif font-bold mb-4 text-secondary-900">
          Terms & Conditions
        </h1>

        <p className="text-sm text-secondary-500 mb-8">
          Last Updated: March 10, 2026
        </p>

        <p className="text-secondary-600 mb-6">
          Welcome to <span className="font-semibold">7-FITZ</span>. These Terms
          and Conditions outline the rules and regulations for the use of our
          website and services. By accessing this website, we assume you accept
          these terms and conditions.
        </p>

        {/* Section */}
        <div className="space-y-8 text-secondary-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              1. Introduction
            </h2>
            <p>
              This website is operated by <strong>7-FITZ</strong>, an online
              store specializing in women's clothing and fashion products. By
              visiting our site and purchasing something from us, you agree to
              be bound by these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              2. Eligibility
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Be at least 18 years old, or</li>
              <li>Have permission from a parent or guardian.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              3. Products & Services
            </h2>
            <p>
              We sell women's fashion products including dresses, tops, ethnic
              wear, and accessories. All product descriptions, prices, and
              availability are subject to change at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              4. Pricing & Payments
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>All prices listed are in Indian Rupees (INR).</li>
              <li>Payments accepted via debit card, credit card, UPI, and net banking.</li>
              <li>Orders may be cancelled if pricing errors or suspected fraud occur.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              5. Orders & Confirmation
            </h2>
            <p>
              After placing an order, you will receive confirmation via email
              or SMS. We reserve the right to refuse or cancel orders at our
              discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              6. Shipping & Delivery
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Orders are processed within 1–3 business days.</li>
              <li>Delivery times depend on location.</li>
              <li>Shipping delays may occur due to courier issues.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              7. Returns & Refunds
            </h2>
            <p>Returns may be requested within 7 days if:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The product is damaged</li>
              <li>The wrong item was delivered</li>
              <li>The product is unused and in original condition</li>
            </ul>
            <p className="mt-2">
              Refunds will be processed once the returned product is received
              and inspected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              8. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Do not use the website for illegal activities</li>
              <li>Do not attempt to hack or misuse the website</li>
              <li>Provide accurate information during checkout</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              9. Intellectual Property
            </h2>
            <p>
              All website content including images, logos, product designs,
              and text belong to <strong>7-FITZ</strong> and may not be used
              without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              10. Limitation of Liability
            </h2>
            <p>
              We are not responsible for any direct or indirect damages arising
              from the use of our website or products.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              11. Privacy
            </h2>
            <p>
              Your personal information is handled according to our Privacy
              Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              12. Changes to Terms
            </h2>
            <p>
              We may update these Terms & Conditions at any time. Updates will
              be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              13. Contact Information
            </h2>
            <p>Email: support@7fitz.com</p>
            <p>Phone: +91-XXXXXXXXXX</p>
            <p>Address: Your Business Address</p>
          </section>

        </div>
      </motion.div>
    </div>
  );
};

export default TermsAndConditions;