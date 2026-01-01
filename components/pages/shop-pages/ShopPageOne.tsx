import FilterProducts from "@/components/products/FilterProducts";
import ShopPageContainer from "@/components/products/ShopPageContainer";
import React, { Suspense } from "react";
import Loader from "@/components/others/Loader";

interface ShopPageOneProps {
  searchParams: {
    page: string;
    category: string;
    brand: string;
    search: string;
    min: string;
    max: string;
    color: string;
  };
}

const ShopPageOne = ({ searchParams }: ShopPageOneProps) => {
  return (
    <div className="w-full bg-gray-50 dark:bg-slate-950 min-h-screen">
      <div className="mx-auto max-w-7xl px-2 md:px-8 py-8">
        <div className="flex gap-6 items-start">
          <div className="hidden xl:block w-72 flex-shrink-0 sticky top-24">
            <Suspense fallback={<Loader />}>
              <FilterProducts />
            </Suspense>
          </div>
          <div className="flex-1 min-w-0">
            <ShopPageContainer gridColumn={3} searchParams={searchParams} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPageOne;
