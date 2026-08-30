import React from "react";
import Container from "@/components/Container";
import Link from "next/link";
import { contactConfig } from "@/config/contact";
import {
  FileText,
  ShieldCheck,
  Scale,
  Users,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | U-Shop Ghana",
  description:
    "Terms and conditions for buying, selling, and using the U-Shop tech e-commerce platform.",
};

const TermsPage = () => {
  return (
    <div className="bg-[#fbfbfd] min-h-screen py-12 sm:py-16 md:py-20">
      <Container className="max-w-4xl px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ushop-purple/10 text-ushop-purple text-xs font-bold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal & Policies</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Terms & Conditions
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed">
            Last Updated: August 2026 • Please read these terms carefully before using U-Shop.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 md:p-12 shadow-sm space-y-8 text-sm sm:text-base text-gray-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-ushop-pink" />
              <span>1. Introduction & Acceptance of Terms</span>
            </h2>
            <p>
              Welcome to <strong>U-Shop Ghana</strong> (&quot;U-Shop&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing, browsing, or using our website ({contactConfig.company.name}), mobile web app, or services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-ushop-purple" />
              <span>2. User Accounts & Student Verification</span>
            </h2>
            <p>
              To access certain features such as order tracking, seller dashboards, or student deals, you may be required to register an account. You agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials.
            </p>
            <p>
              Student accounts and campus discounts require valid tertiary institution email addresses or student ID verification. U-Shop reserves the right to suspend accounts found using fraudulent verification credentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>3. Product Listings, Pricing & Authenticity</span>
            </h2>
            <p>
              All merchant and student store listings must represent genuine products with accurate grading (New, Refurbished, Like New, Excellent, Good). Misleading descriptions, counterfeit electronics, or price gouging will result in immediate store termination.
            </p>
            <p>
              Prices are displayed in Ghana Cedis (GHS) and include applicable taxes unless specified otherwise. We reserve the right to correct pricing errors before order fulfillment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-600" />
              <span>4. Orders, Payments & Delivery</span>
            </h2>
            <p>
              We support mobile money (MTN MoMo, Telecel Cash, AT Money) and debit cards. Full order confirmation occurs upon successful payment gateway authorization.
            </p>
            <p>
              Delivery timeframes within Accra and Kumasi typically range from 24 to 48 hours. Orders to other regions are dispatched via certified parcel services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <span>5. Returns, Refunds & Warranty Claims</span>
            </h2>
            <p>
              Buyers are entitled to request a return or replacement within 7 calendar days of receipt if the delivered tech equipment is demonstrably defective or materially inconsistent with the seller&apos;s product description. For full instructions, please consult our <Link href="/faqs" className="text-ushop-pink font-semibold hover:underline">FAQs</Link> and <Link href="/help" className="text-ushop-pink font-semibold hover:underline">Help Center</Link>.
            </p>
          </section>

          <section className="space-y-3 border-t border-gray-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              6. Contact Information
            </h2>
            <p>
              If you have any questions regarding these Terms & Conditions, please contact us at <a href={`mailto:${contactConfig.emails.support}`} className="text-ushop-purple font-bold hover:underline">{contactConfig.emails.support}</a> or call <a href={`tel:${contactConfig.company.phoneClean}`} className="text-ushop-purple font-bold hover:underline">{contactConfig.company.phone}</a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default TermsPage;
