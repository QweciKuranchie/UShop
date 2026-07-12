import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types';
import { Heart } from 'lucide-react';
import React from 'react'

const AddToWishlistBtn = ({
  product,
  className,
}:{
  product: Product;
  className?: string
}) => {
  return <div className={cn('absolute top-2 right-2 z-10', className)}>
    <button className='p-2.5 rounded-full bg-white/50 hover:bg-ushop-pink hover:text-white hoverEffect'>
      <Heart size={15}/>
    </button>
  </div>
}

export default AddToWishlistBtn