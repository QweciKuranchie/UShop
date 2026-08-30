/**
 * Centralized Contact Configuration
 * Reads from environment variables with sensible defaults for U-Shop Ghana.
 */

export const contactConfig = {
  company: {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME || "UShop",
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "support@ushopgh.com",
    phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+233 50 956 5794",
    phoneClean: (process.env.NEXT_PUBLIC_COMPANY_PHONE || "+233 50 956 5794").replace(/\s+/g, ""),
    address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "Akweteyman, Commerce District",
    city: process.env.NEXT_PUBLIC_COMPANY_CITY || "Accra, Ghana",
    description:
      process.env.NEXT_PUBLIC_COMPANY_DESCRIPTION ||
      "Ghana's trusted tech marketplace. Buy and sell phones, laptops, and gadgets with campus hubs.",
  },
  businessHours: {
    weekday:
      process.env.NEXT_PUBLIC_COMPANY_BUSINESS_HOURS_WEEKDAY ||
      "Monday - Saturday: 8:00 AM - 7:00 PM GMT",
    weekend:
      process.env.NEXT_PUBLIC_COMPANY_BUSINESS_HOURS_WEEKEND ||
      "Sunday: 10:00 AM - 4:00 PM GMT",
  },
  emails: {
    support: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@ushopgh.com",
    sales: process.env.NEXT_PUBLIC_SALES_EMAIL || "sales@ushopgh.com",
  },
  responseTimes: {
    general:
      process.env.NEXT_PUBLIC_CONTACT_RESPONSE_TIME || "We reply within 24 hours",
    quick:
      process.env.NEXT_PUBLIC_QUICK_RESPONSE_TIME ||
      "2-4 hours during business hours",
  },
  socials: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/ushopgh",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/ushopgh",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/ushopgh",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/ushopgh",
  },
  legal: {
    copyrightText:
      process.env.NEXT_PUBLIC_COPYRIGHT_TEXT ||
      `© ${new Date().getFullYear()} UShop Ghana. All rights reserved.`,
    privacyUrl: process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || "/privacy",
    termsUrl: process.env.NEXT_PUBLIC_TERMS_URL || "/terms",
  },
};

export default contactConfig;
