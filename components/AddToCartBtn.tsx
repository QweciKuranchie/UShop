import React from 'react'
import { Product } from '@/sanity.types';
import { cn } from '@/lib/utils';
import { Button } from '@base-ui/react';
import { ShoppingCart } from 'lucide-react';

interface Props {
  product: Product;
  className?: string;
}

const AddToCartBtn = ({product, className}: Props) => {
  return (
    <Button className={cn('bg-ushop-purple hoverEffect', className)}>
      <ShoppingCart  className='text-white' size={18}/>
      <span className='text-white'>Add to Cart</span>
    </Button>
  )
}

export default AddToCartBtn