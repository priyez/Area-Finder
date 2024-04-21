import Link from "next/link";
import ImageFallback from "@/helpers/ImageFallback";
import { useState } from "react";
import { usePathname } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";

export const Logo = () => {
  const loading = useAuthentication();
  const router = usePathname();

  // Function to determine the link based on authentication status
  const getLink = () => {
    if (loading) {
      return null; // Return null if authentication state is still being checked
    }
    // If authenticated, return the link to the review page, else return the link to the login page
    return router === "/review" ? "/" : "/review";
  };

  // Get the link value
  const link = getLink();

  // Render the logo component with the appropriate link
  return link ? (
    <Link href={link} className="order-0">
      <ImageFallback src="/images/Logo.svg" className="mt-4" width={120} height={85} alt="profilepic" />
    </Link>
  ) : null;
};
