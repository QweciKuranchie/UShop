import React from "react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Custom inline SVG icons because brand logos are not available in the installed version of lucide-react
const Facebook = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const XLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: "facebook",
    href: "#",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: "instagram",
    href: "#",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    title: "X",
    href: "#",
    icon: <XLogo className="w-5 h-5" />,
  },
  {
    title: "linkedin",
    href: "#",
    icon: <Linkedin className="w-5 h-5" />,
  },
];

const SocialMediaIcons = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5 justify-start", className)}>
        {socialLink.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger
  render={
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={item.href}
      className={cn("p-2 border rounded-full hover:text-white hover:bg-ushop-pink hoverEffect", iconClassName)}
    />
  }
>
  {item.icon}
</TooltipTrigger>

            <TooltipContent className={tooltipClassName}>
              <p className="capitalize text-xs">{item.title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMediaIcons;
