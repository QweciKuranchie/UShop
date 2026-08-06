import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center gap-4 text-white">
      <div className="w-8 h-8 border-4 border-ushop-pink border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-purple-200">Completing secure login...</p>
      <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/" signInForceRedirectUrl="/" />
    </div>
  );
}
