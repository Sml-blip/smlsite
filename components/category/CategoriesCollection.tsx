"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Product } from "@/types";
import { getCategories } from "@/lib/products";

const CategoriesCollection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<[string, Product[]][]>([]);

  useEffect(() => {
    getCategories().then((categoriesMap) => {
      setCategories(Array.from(categoriesMap.entries()).slice(0, 3));
    });
  }, []);

  const handleCollectionClick = (collectionName: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", collectionName);
    router.push(`shop?${params.toString()}`);
  };

  if (categories.length === 0) return null;

  return (
    <section className="py-16 bg-slate-200 dark:bg-slate-800 ">
      <div className="max-w-screen-xl px-4 md:px-8  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap">
        {categories.map(([categoryName, products]) => (
          <div
            key={categoryName}
            onClick={() => handleCollectionClick(categoryName)}
            className="flex flex-col gap-4 items-start justify-between p-4 md:p-8 rounded-xl bg-white dark:bg-slate-900 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl md:text-2xl text-center font-semibold my-4 w-full">
              Meilleures offres sur <span className="text-2xl font-bold block md:inline">{categoryName}</span>
            </h2>
            <div className="grid grid-cols-2 gap-4 place-content-center w-full">
              {products.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center justify-center text-center gap-2"
                >
                  <div className="relative w-[100px] h-[100px]">
                    <Image
                      src={product.images[0] || "/placeholder.png"}
                      alt={product.name}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                  <div className="flex items-center flex-col w-full">
                    {product.discount > 0 && (
                      <p className="bg-rose-600 p-1 text-sm text-white whitespace-nowrap w-fit rounded-sm">
                        {product.discount}% de réduction
                      </p>
                    )}
                    <Link
                      href={`/shop/${product.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-semibold hover:text-green-500 text-sm line-clamp-2 mt-1"
                    >
                      {product.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="mt-auto flex items-center gap-4 text-lg font-semibold w-full"
              variant={"outline"}
              size={"lg"}
            >
              <ArrowRight /> Voir la collection
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesCollection;
