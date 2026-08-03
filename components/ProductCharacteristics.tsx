import { Product } from "@/sanity.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface ProductCharacteristicsProps {
  product: Product;
  brand: { brandName?: string }[] | null;
}

const ProductCharacteristics = ({
  product,
  brand,
}: ProductCharacteristicsProps) => {
  const brandName =
    (product as any)?.brand?.name ||
    (product as any)?.brand?.title ||
    brand?.[0]?.brandName ||
    "Generic";

  const categoryName =
    (product as any)?.category?.title ||
    (product as any)?.productClassification?.title ||
    "General";

  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold">
          {product?.name}: Overview & Characteristics
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 pt-2">
          <p className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Brand:</span>
            <span className="font-semibold text-zinc-900 tracking-wide">
              {brandName}
            </span>
          </p>
          <p className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Category:</span>
            <span className="font-semibold text-zinc-900 tracking-wide">
              {categoryName}
            </span>
          </p>
          {product?.variant && (
            <p className="flex items-center justify-between text-sm">
              <span className="text-zinc-600">Condition / Type:</span>
              <span className="font-semibold text-zinc-900 tracking-wide capitalize">
                {product.variant}
              </span>
            </p>
          )}
          <p className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Availability:</span>
            <span
              className={`font-semibold tracking-wide ${
                product?.stock ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {product?.stock ? `${product.stock} Available` : "Out of Stock"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
