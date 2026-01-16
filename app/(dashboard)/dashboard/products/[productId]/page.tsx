"use client";

import React, { useEffect, useState } from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetails from "@/components/product/ProductDetails";
import { supabase } from "@/lib/supabase";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import { Product } from "@/types";
import Loader from "@/components/others/Loader";

interface ProductDetailsPageProps {
  params: { productId: string };
}

const ProductDetailsPage = ({ params }: ProductDetailsPageProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.productId)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const transformedProduct = {
            ...data,
            images: data.images || [data.image],
            stockItems: data.stock || 0,
            color: data.colors || []
          };
          setProduct(transformedProduct);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.productId]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="py-2">
        <BreadcrumbComponent
          links={["/dashboard", "/products"]}
          pageText={product?.name || ''}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:gap-8">
        {/* Product Gallery */}
        <ProductGallery isInModal={false} images={product.images} />
        {/* product details */}
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
