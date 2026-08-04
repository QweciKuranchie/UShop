import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2a0645] via-[#520f85] to-[#151515] p-4">
        {children}
      </div>
    </ClerkProvider>
  );
}
