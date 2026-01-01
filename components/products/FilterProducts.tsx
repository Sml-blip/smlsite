"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { colors } from "@/data/products/productColor";
import { productsData } from "@/data/products/productsData";
import { Product } from "@/types";

const FilterProducts = () => {
  // State variables for filters
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(5000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Access search params
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get filter values from search params on initial render
  const initialPrice = searchParams.get("max") || "5000";
  const initialCategory = searchParams.get("category");
  const initialColor = searchParams.get("color");
  const initialBrand = searchParams.get("brand");

  // Dynamically extract unique categories and brands from productsData
  const { uniqueCategories, uniqueBrands } = useMemo(() => {
    const categoriesSet = new Set<string>();
    const brandsSet = new Set<string>();

    productsData.forEach((product: Product) => {
      if (product.category) categoriesSet.add(product.category);
      if (product.brand) brandsSet.add(product.brand);
    });

    return {
      uniqueCategories: Array.from(categoriesSet),
      uniqueBrands: Array.from(brandsSet),
    };
  }, []);

  // Update state with initial values
  useEffect(() => {
    setMaxValue(Number(initialPrice));
    setSelectedCategory(initialCategory as string);
    setSelectedColor(initialColor as string);
    setSelectedBrand(initialBrand as string);
  }, [initialPrice, initialCategory, initialColor, initialBrand]);

  // Selection handler functions with search param updates
  const handleCategorySelection = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === selectedCategory) {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", category);
    }
    setSelectedCategory(category);
    // When filtering by category, reset page to 1
    newSearchParams.set("page", "1");
    router.push(`${pathname}?${newSearchParams}`);
  };

  // Update min price and max price with correct values
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Number(event.target.value);
    setMinValue(newMinValue);
    setMinAndMaxPrice(newMinValue, maxValue);
  };

  // Update max price with correct value
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Number(event.target.value);
    setMaxValue(newMaxValue);
    setMinAndMaxPrice(minValue, newMaxValue);
  };

  // Update search params with correct price range
  const setMinAndMaxPrice = (minPrice: number, maxPrice: number) => {
    const min = Math.min(minPrice, maxPrice);
    const max = Math.max(minPrice, maxPrice);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("min", `${min}`);
    newSearchParams.set("max", `${max}`);
    newSearchParams.set("page", "1");
    router.push(`${pathname}?${newSearchParams}`);
  };

  const handleColorSelection = (color: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (color === selectedColor) {
      newSearchParams.delete("color");
    } else {
      newSearchParams.set("color", color.split("-")[0]);
    }
    setSelectedColor(color);
    newSearchParams.set("page", "1");
    router.push(`${pathname}?${newSearchParams}`);
  };

  const handleBrandSelection = (brand: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (brand === selectedBrand) {
      newSearchParams.delete("brand");
    } else {
      newSearchParams.set("brand", brand);
    }
    setSelectedBrand(brand);
    newSearchParams.set("page", "1");
    router.push(`${pathname}?${newSearchParams}`);
  };

  const clearFilter = () => {
    router.push(`${pathname}?page=1`);
  };

  return (
    <aside className="w-72 p-2 space-y-4 ">
      <h2 className="text-xl font-bold capitalize my-2">Filtrer les produits</h2>
      <Separator />
      {/* filter by price */}
      <div>
        <h3 className="text-lg font-medium my-2">Par Prix</h3>
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="min">Min (TND) :</Label>
            <Input
              id="min"
              placeholder="10 TND"
              value={minValue}
              min={2}
              type="number"
              onChange={handleMinPriceChange}
            />
          </div>
          <div>
            <Label htmlFor="max">Max (TND) :</Label>
            <Input
              id="max"
              placeholder="2000 TND"
              min={2}
              value={maxValue}
              type="number"
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-center flex-wrap">
          <Input
            onChange={handleMaxPriceChange}
            type="range"
            min={5}
            max={5000}
            value={maxValue}
          />
          <p className="text-center text-green-500 text-2xl">{maxValue} TND</p>
        </div>
      </div>

      {/* filter by category */}
      <div>
        <h3 className="text-lg font-medium my-2">Par Catégories</h3>
        <div className="flex items-center justify-start gap-2 flex-wrap">
          {uniqueCategories.map((category) => (
            <p
              onClick={() => handleCategorySelection(category)}
              className={cn(
                "px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer",
                category === selectedCategory &&
                "bg-primary text-black"
              )}
              key={category}
            >
              {category}
            </p>
          ))}
        </div>
      </div>

      {/* filter by Brand name */}
      <div>
        <h3 className="text-lg font-medium my-2">Par Marques</h3>
        <div className="flex items-center justify-start gap-2 flex-wrap">
          {uniqueBrands.map((brand) => (
            <p
              onClick={() => handleBrandSelection(brand)}
              className={cn(
                "px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer",
                selectedBrand === brand && "bg-primary text-black"
              )}
              key={brand}
            >
              {brand}
            </p>
          ))}
        </div>
      </div>
      <div>
        <Button onClick={clearFilter} variant={"outline"} className="w-full">
          Effacer le filtre
        </Button>
      </div>
    </aside>
  );
};

export default FilterProducts;
