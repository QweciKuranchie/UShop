"use client"
import { useEffect, useState } from "react"
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/Constants/data";
import { client } from "@/sanity/lib/client";
import {motion} from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductsAvailable from "./NoProductsAvailable";

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = `*[_type == "product" && variant == $variant] | order(name desc){
    ...,"categories":categories[]->title}`;
                const params = {variant: selectedTab.toLowerCase()};
                const response = await client.fetch(query, params);
                setProducts(response);
            } catch (error) {
                console.error("Product fetching Error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedTab]);
  return (
    <div className=''>
        <HomeTabBar selectedTab= {selectedTab} onTabSelect={setSelectedTab} />
        {loading ? <div className="flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10">
            <div className="space-x-2 flex items-center text-blue-600">
                <Loader2  className="w-5 h-6 animate-spin"/>
                <span>Product is loading...</span>
            </div>
        </div> : products?.length?(
            <>Product</>
        ) : (
            <NoProductsAvailable />
        )
        }
    </div>
  )
}

export default ProductGrid