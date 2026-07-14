import React from 'react'
import { Title } from './ui/text'
import Link from 'next/link'
import { getAllBrands } from '@/sanity/Queries'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
const ShopByBrand = async() => {

  const brands = await getAllBrands();

  return (
    <div className="mb-10 lg:pb-20 bg-ushop_light_bg p-5 lg:p-7 rounded-md">
        <div className='flex items-center justify-between mb-10 gap-5'>
            <Title className='text-2xl'>Shop By Brands</Title>
            <Link
                href={"/shop"}
                className='text-sm tracking-wide font-semibold hover:text-ushop-pink hoverEffect'
            >
            View All
            </Link>
        </div>
        <div className='grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2 lg:gap-4'>
            {brands?.map((brand) => (
                <Link
                    href={`/brands/${brand?.slug?.current}`}
                    key={brand?._id}
                    className='bg-white rounded-md hover:shadow-sm border border-ushop_light_border p-2 flex flex-col items-center justify-center group hoverEffect'
                >
                    {brand?.logo && 
                    <Image 
                    src={urlFor(brand?.logo).url()} 
                    width={250}
                    height={250}
                    alt="brandImage"
                    className='object-contain h-full group-hover:scale-110 hoverEffect'
                    />}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default ShopByBrand 