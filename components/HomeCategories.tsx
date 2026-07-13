import React from 'react'
import { Title } from './ui/text'
import { Category } from '@/sanity.types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'

const HomeCategories = ({categories}:{categories:Category[]}) => {
  return (
    <div className='bg-white border border-ushop-pink/20 my-10 md:my-20 p-5 lg:p-7 rounded-md'>
        <Title className='border-b pb-3'>Popular Categories</Title>
        <div className='flex flex-wrap gap-5 mt-5 grid grid-cols-1 md:grid-cols-2 lg
        lg:grid-cols-3'>
            {categories.map((category) => (
                <div key={category._id} className='group bg-ushop_light_bg p-5 flex items-center gap-3'>
                    {category.image && (
                      <div className='overflow-hidden border
                      border-ushop_orange/30 hover:border-ushop_orange 
                      hoverEffect w-20 h-20 p-1'>
                        <Link href={`/category/${category?.slug?.current}`}>
                        <Image
                        src={urlFor(category.image).url()}
                        alt={category.title || "Category Image"}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover group-hover:scale-110 hoverEffect"
                        /></Link>
                      </div>
                    )}
                    <div className='flex-1 space-y-1'>
                      <h3 className='font-semibold text-left text-base'>
                        {category?.title}
                        </h3>
                      <p className='text-sm text-left'>
                      <span className='font-bold text-ushop-purple-dark'>{`(${category?.productCount})`}</span>{" "}items Available
                      </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default HomeCategories