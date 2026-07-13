import  React from 'react'
import PriceFormatter from './PriceFormatter';

interface Props {
  price: number | undefined;
  discount?: number | undefined;
  className?: string;
}

const PriceView = ({ price, discount, className }: Props) => {
  return (
    <div className='flex flex-col sm:flex-row sm:items-center gap-1'>
      <PriceFormatter amount={price} className='text-ushop-purple'/>
      {price && discount && <PriceFormatter amount={price + (discount * price)/100} className='text-ushop-light-text font-normal line-through'/>}
    </div>
  )
}
 
export default PriceView