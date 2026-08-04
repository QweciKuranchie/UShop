import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {children}
      </div>
    </ClerkProvider>
  );
}
