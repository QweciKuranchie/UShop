import { memo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  currentProduct: Product;
  relatedProducts: Product[];
}

const RelatedProducts = memo(({ relatedProducts }: RelatedProductsProps) => {
  // If no related products found, return null
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="my-16 pt-12 border-t border-zinc-100">
      <div className="text-center mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-zinc-900 mb-2">
          You Might Also Like
        </h2>
        <p className="text-sm text-zinc-500">Similar products from the same category</p>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0">
        {relatedProducts.map((product: Product) => (
          <div key={product._id} className="w-[260px] sm:w-[280px] flex-shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-10">
        <Button
          variant="outline"
          className="border-ushop-purple text-ushop-purple hover:bg-ushop-purple hover:text-white rounded-xl font-semibold hoverEffect"
          nativeButton={false}
          render={<Link href="/product" />}
        >
          View More Products
        </Button>
      </div>
    </div>
  );
});

RelatedProducts.displayName = "RelatedProducts";

export default RelatedProducts;
