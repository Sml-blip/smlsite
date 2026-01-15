"use client";

import ProductGallery from "@/components/product/ProductGallery";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import RelatedProducts from "@/components/products/RelatedProducts";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import ProductDetails from "@/components/product/ProductDetails";
import { Product } from "@/types";
import Loader from "@/components/others/Loader";

// Define the props interface for the component
interface ProductIdPageProps {
  params: { productId: string };
}

// Define the main component
const ProductIdPage = ({ params }: ProductIdPageProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);

        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.productId)
          .maybeSingle();

        if (productError) throw productError;
        setProduct(productData);

        if (productData) {
          const { data: related, error: relatedError } = await supabase
            .from('products')
            .select('*')
            .eq('category', productData.category)
            .neq('id', params.productId)
            .limit(4);

          if (relatedError) throw relatedError;
          setRelatedProducts(related || []);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [params.productId]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="max-w-screen-xl mx-auto p-4 md:p-8 min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  // Return the JSX structure of the component
  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex flex-col items-start gap-2 min-h-screen">
      {/* Breadcrumb Component */}
      <div className="my-2">
        <BreadcrumbComponent links={["/shop"]} pageText={product?.name!} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Product Gallery */}
        <ProductGallery isInModal={false} images={product?.images!} />
        {/* product details */}
        <ProductDetails product={product!}/>
      </div>
      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

// Export the component as default
export default ProductIdPage;
