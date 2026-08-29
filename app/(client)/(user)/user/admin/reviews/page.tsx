import AdminReviews from "@/components/admin/AdminReviews";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review Moderation | UShop Admin",
  description: "Review and moderate customer product ratings and reviews.",
};

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <AdminReviews />
    </div>
  );
}
