"use client";

import { Product } from '../sanity.types';
import { cn } from '../lib/utils';
import { Button } from '@base-ui/react';
import { ShoppingCart } from 'lucide-react';

interface Props {
  product: Product;
  className?: string;
}

const AddToCartBtn = ({product, className}: Props) => {
  const isOutofStock = product?.stock === 0;
  return (
    <Button 
    disabled={isOutofStock}
    className={cn(
      "w-full bg-ushop-purple-dark/90 text-ushop_light_bg shadow-none border border-ushop-purple-dark/80 font-semibold tracking-wide hover:text-white hover:bg-ushop-purple-dark hover:border-ushop-purple-dark hoverEffect flex items-center justify-center gap-2 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:border-zinc-200 disabled:cursor-not-allowed", 
      className
    )}>
      {!isOutofStock && <ShoppingCart className='text-white' size={18}/>}
      {isOutofStock ? "Out of Stock" : "Add to Cart"}
    </Button>
  )
}

export default AddToCartBtn