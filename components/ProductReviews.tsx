"use client";

import React, { useState } from "react";
import { StarIcon, ThumbsUp, MessageSquare, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  _id: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  isVerifiedPurchase: boolean;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      _id: "1",
      rating: 5,
      title: "Absolutely fantastic!",
      content: "Exceeded my expectations in every way. The quality is top-notch, delivery was prompt, and it fits the description perfectly.",
      helpful: 8,
      isVerifiedPurchase: true,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      user: { firstName: "Kofi", lastName: "Mensah" },
    },
    {
      _id: "2",
      rating: 4,
      title: "Great quality, highly recommended",
      content: "Very satisfied with this purchase. It performs really well. Minor issue with packaging but the product itself is flawless.",
      helpful: 3,
      isVerifiedPurchase: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      user: { firstName: "Ama", lastName: "Osei" },
    },
  ]);

  const [helpfulRatings, setHelpfulRatings] = useState<Record<string, number>>({});
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newName, setNewName] = useState("");

  const handleMarkHelpful = (reviewId: string) => {
    if (helpfulRatings[reviewId]) return;
    setHelpfulRatings((prev) => ({ ...prev, [reviewId]: 1 }));
    setReviews((prev) =>
      prev.map((r) => (r._id === reviewId ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent || !newName) return;

    const names = newName.split(" ");
    const firstName = names[0] || "Anonymous";
    const lastName = names.slice(1).join(" ") || "";

    const newReview: Review = {
      _id: Date.now().toString(),
      rating: newRating,
      title: newTitle,
      content: newContent,
      helpful: 0,
      isVerifiedPurchase: false,
      createdAt: new Date().toISOString(),
      user: { firstName, lastName },
    };

    setReviews((prev) => [newReview, ...prev]);
    setShowForm(false);
    setNewTitle("");
    setNewContent("");
    setNewName("");
  };

  return (
    <div className="space-y-8 mt-12 pt-12 border-t border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
            Customer Reviews
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Read what our customers are saying about {productName}
          </p>
        </div>

        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-ushop-pink hover:bg-ushop-pink/90 text-white font-semibold rounded-xl hoverEffect self-start"
          >
            Write a Review
          </Button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-50/50 border border-zinc-100 rounded-2xl p-6 space-y-4 max-w-xl"
        >
          <h3 className="font-bold text-zinc-800 text-lg">Write your review</h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500">Rating</label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className="focus:outline-hidden hoverEffect"
                >
                  <StarIcon
                    size={20}
                    className={
                      star <= newRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500">Your Name</label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full text-sm border border-zinc-200 focus:border-ushop-pink focus:ring-1 focus:ring-ushop-pink rounded-xl px-3 py-2 outline-hidden bg-white hoverEffect"
              placeholder="e.g. Kofi Mensah"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500">Review Title</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full text-sm border border-zinc-200 focus:border-ushop-pink focus:ring-1 focus:ring-ushop-pink rounded-xl px-3 py-2 outline-hidden bg-white hoverEffect"
              placeholder="e.g. Excellent purchase"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500">Review Content</label>
            <textarea
              required
              rows={4}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full text-sm border border-zinc-200 focus:border-ushop-pink focus:ring-1 focus:ring-ushop-pink rounded-xl px-3 py-2 outline-hidden bg-white hoverEffect resize-y"
              placeholder="What did you like or dislike?"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="bg-ushop-purple text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-ushop-purple/90 hoverEffect"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-zinc-600 text-sm font-semibold px-4 py-2 border border-zinc-200 rounded-xl hover:bg-zinc-50 hoverEffect"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Review List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-10 bg-zinc-50/50 rounded-2xl border border-zinc-100/50">
            <MessageSquare className="mx-auto text-zinc-400 mb-3" size={32} />
            <h3 className="font-semibold text-zinc-800">No reviews yet</h3>
            <p className="text-sm text-zinc-500 mt-1">
              Be the first to review this product!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-zinc-100 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-ushop-purple/10 hoverEffect"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ushop-purple/10 to-ushop-pink/10 flex items-center justify-center font-bold text-ushop-purple">
                    {review.user.firstName[0]}
                    {review.user.lastName[0] || ""}
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-800 text-sm">
                      {review.user.firstName} {review.user.lastName}
                    </h4>
                    <p className="text-[10px] text-zinc-400">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      size={14}
                      className={
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-200"
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-zinc-800 text-sm">{review.title}</h5>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {review.content}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 mt-5 pt-4 border-t border-zinc-50">
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                  {review.isVerifiedPurchase && (
                    <>
                      <ShieldAlert size={14} className="fill-emerald-50 text-emerald-600" />
                      <span>Verified Purchase</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => handleMarkHelpful(review._id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-full border transition-all duration-300 ${
                    helpfulRatings[review._id]
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600 cursor-default"
                      : "bg-white border-zinc-200 hover:border-ushop-pink hover:text-ushop-pink text-zinc-600 hoverEffect"
                  }`}
                >
                  <ThumbsUp size={12} />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
