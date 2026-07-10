"use client";

import React, { useState } from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMediaIcons from "./SocialMediaIcons";
import { SubTitle, SubText } from "./ui/text";
import Link from "next/link";
import Image from "next/image";
import { quickLinksData, categoriesData, customerCareData } from "@/Constants/data";
import { Mail, CheckCircle } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      // Simulate API call for newsletter subscription
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="bg-[#0f172a] text-gray-300 border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText>
              Ghana&apos;s leading tech marketplace.<br />Affordable prices and trusted sellers
            </SubText>
            <SocialMediaIcons />
          </div>
          <div>
            <SubTitle>Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {
                quickLinksData.links.map((link) => (
                   <li key={link.title}>
                    <Link
                    href={link.href}
                    className="hover:text-ushop-pink hoverEffect"
                  >
                    {link.title}
                  </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div>
            <SubTitle>{categoriesData.title}</SubTitle>
            <ul className="space-y-3 mt-4">
              {
                categoriesData.links.map((link) => (
                   <li key={link.title}>
                    <Link
                    href={link.href}
                    className="hover:text-ushop-pink hoverEffect"
                  >
                    {link.title}
                  </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div>
            <SubTitle>{customerCareData.title}</SubTitle>
            <ul className="space-y-3 mt-4">
              {
                customerCareData.links.map((link) => (
                   <li key={link.title}>
                    <Link
                    href={link.href}
                    className="hover:text-ushop-pink hoverEffect"
                  >
                    {link.title}
                  </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ushop-purple/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#D4009B]" />
                </div>
                <div>
                  <SubTitle>
                    Join the Newsletter
                  </SubTitle>
                  <SubText>Subscribe to our newsletter to receive updates and exclusive deals</SubText>
                </div>
              </div>
              <div className="flex w-full md:w-auto">
                {status === "success" ? (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-6 py-2.5 rounded-xl text-emerald-400 w-full md:w-[350px]">
                     <CheckCircle className="w-5 h-5" />
                     <span className="text-sm font-medium">{message}</span>
                  </div>
                ) : (
                  <form
                    className="flex flex-col sm:flex-row w-full md:w-[350px] gap-2 sm:gap-0"
                    onSubmit={handleSubscribe}
                  >
                    <div className="flex w-full">
                      <input
                        id="newsletter-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        disabled={status === "loading"}
                        className="px-4 py-2.5 bg-gray-800 border border-gray-700 text-white text-sm rounded-l-xl
                          placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-ushop-purple
                          w-full disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={status === "loading" || !email}
                        className="px-6 py-2.5 bg-[#D4009B] border border-transparent text-white text-sm font-bold rounded-r-xl
                          hover:bg-[#b50f7e] transition-colors whitespace-nowrap disabled:opacity-50 flex items-center justify-center min-w-[110px] h-full"
                      >
                        {status === "loading" ? (
                           <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : "Subscribe"}
                      </button>
                    </div>
                    {status === "error" && (
                      <p className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{message}</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar — legal + payment logos */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
              <p>© 2026 U-Shop. All rights reserved.</p>

              <div className="flex items-center gap-4">
                <Link
                  href="/privacy"
                  className="hover:text-ushop-pink transition-colors hoverEffect"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-ushop-pink transition-colors hoverEffect"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="hover:text-ushop-pink transition-colors hoverEffect"
                >
                  Cookie Policy
                </Link>
              </div>

              {/* Payment logos from /assets/icons/footer/ */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 mr-1">Accepted payments:</span>
                <Image
                  src="/assets/icons/footer/Momo.png"
                  alt="Mobile Money"
                  width={32}
                  height={24}
                  className="h-6 w-auto"
                />
                <Image
                  src="/assets/icons/footer/TCash.png"
                  alt="Telecel Cash"
                  width={32}
                  height={24}
                  className="h-6 w-auto"
                />
                <Image
                  src="/assets/icons/footer/AT money.png"
                  alt="AT Money"
                  width={32}
                  height={24}
                  className="h-6 w-auto"
                />
                <Image
                  src="/assets/icons/footer/visa.png"
                  alt="Visa"
                  width={32}
                  height={24}
                  className="h-6 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
