import React from "react";
import Container from "@/components/Container";
import Link from "next/link";
import { contactConfig } from "@/config/contact";
import {
  Lock,
  Eye,
  Database,
  UserCheck,
  Bell,
  Mail,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | U-Shop Ghana",
  description:
    "Learn how U-Shop protects and handles your personal information, student credentials, and transaction data.",
};

const PrivacyPage = () => {
  return (
    <div className="bg-[#fbfbfd] min-h-screen py-12 sm:py-16 md:py-20">
      <Container className="max-w-4xl px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection & Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed">
            Effective Date: August 2026 • Your privacy and student data security are our top priorities.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 md:p-12 shadow-sm space-y-8 text-sm sm:text-base text-gray-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-ushop-pink" />
              <span>1. Information We Collect</span>
            </h2>
            <p>
              When you use <strong>U-Shop</strong>, we collect information necessary to process orders, authenticate campus student verification, and enhance your user experience:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Personal Identification:</strong> Name, email address, phone number, and delivery address.</li>
              <li><strong>Student Verification Data:</strong> University institution name and student ID information for campus perks.</li>
              <li><strong>Transaction Data:</strong> Order history, payment confirmation references (we never store raw MoMo PINs or credit card CVVs).</li>
              <li><strong>Technical Data:</strong> IP address, device type, browser settings, and cookie identifiers for session management.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-ushop-purple" />
              <span>2. How We Use Your Information</span>
            </h2>
            <p>
              We process your data for the following specific purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Fulfilling orders, campus delivery, and providing order notifications via SMS/email.</li>
              <li>Validating seller legitimacy and granting student merchant badges.</li>
              <li>Preventing fraudulent orders and maintaining platform integrity.</li>
              <li>Improving marketplace performance, search filters, and speed.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              <span>3. Data Security & Payment Encryption</span>
            </h2>
            <p>
              All traffic between your browser and U-Shop is encrypted using industry-standard SSL/TLS protocols. Payment processing for Mobile Money and Card transactions is handled through PCI-DSS compliant payment gateways with bank-grade encryption.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-teal-600" />
              <span>4. Your Privacy Rights & Data Control</span>
            </h2>
            <p>
              You have the right to access, update, or request deletion of your account and personal information at any time through your <Link href="/user/profile" className="text-ushop-pink font-semibold hover:underline">Profile Settings</Link> or by contacting our support team.
            </p>
          </section>

          <section className="space-y-3 border-t border-gray-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-ushop-purple" />
              <span>5. Contact Privacy Officer</span>
            </h2>
            <p>
              For any questions regarding this Privacy Policy or your data protection rights, please email us at <a href={`mailto:${contactConfig.emails.support}`} className="text-ushop-purple font-bold hover:underline">{contactConfig.emails.support}</a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPage;
