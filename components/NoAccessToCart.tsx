"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Logo from "./common/Logo";

const NoAccessToCart = ({ details }: { details?: string }) => {
  const { openAuthModal } = useAuthModal();

  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center font-medium">
            {details
              ? details
              : " Log in to view your cart items and checkout. Don't miss out on your favorite products!"}
          </p>
          <Button
            onClick={() => openAuthModal("sign-in")}
            className="w-full font-semibold cursor-pointer"
            size="lg"
          >
            Sign in
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Don&rsquo;t have an account?
          </div>
          <Button
            onClick={() => openAuthModal("sign-up")}
            variant="outline"
            className="w-full cursor-pointer"
            size="lg"
          >
            Create an account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccessToCart;
