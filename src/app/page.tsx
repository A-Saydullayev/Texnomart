"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { useLikeStore, toggleLike } from "@/store/like";
import { addToCart } from "@/store/cart";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  images: string[];
  stock?: number;
};

async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get("https://dummyjson.com/products?limit=194");
  return response.data.products;
}

const Som = 12700;

const handleAddToCart = (
  product: Pick<
    Product,
    "id" | "title" | "price" | "images" | "discountPercentage"
  >
) => {
  addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.images[0],
    discountPercentage: product.discountPercentage,
  });

  toast.success(
    `${product.title.substring(0, 30)}${
      product.title.length > 30 ? "..." : ""
    } Savatga qoshildi`,
    {
      duration: 3000,
      position: "top-right",
      style: {
        background: "linear-gradient(90deg, #10b981, #059669)",
        color: "white",
        fontWeight: "600",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
        backdropFilter: "blur(10px)",
      },
    }
  );
};

const Home = () => {
  const likeState = useLikeStore();

  const {
    data = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <p className="text-center py-32 text-3xl font-medium text-red-600">
        Error: {(error as Error)?.message || "Texnik xato"}
      </p>
    );

  return (
    <>
      <Toaster />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
        {isFetching && (
          <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            Yangilanmoqda...
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.map((prod) => {
              const originalPriceUZS = Math.round(prod.price * Som);
              const discountAmount = Math.round(
                originalPriceUZS * (prod.discountPercentage / 100)
              );
              const finalPriceUZS = originalPriceUZS - discountAmount;

              const totalInstallment = Math.round(finalPriceUZS * 1.3);
              const monthlyPayment = Math.round(totalInstallment / 18);

              const isLiked = !!likeState.liked[prod.id];

              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100"
                >
                  <div className="relative aspect-square bg-gray-50">
                    <Link href={`/detail/${prod.id}`} className="block group">
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <button
                      onClick={() => toggleLike(prod.id)}
                      className="absolute top-2 left-2 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md transition-all duration-200 z-10"
                    >
                      <svg
                        className={`w-5 h-5 transition-colors ${
                          isLiked
                            ? "fill-red-500 text-red-500"
                            : "fill-none text-gray-600"
                        }`}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>

                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      Xit savdo
                    </div>

                    {prod.discountPercentage > 0 && (
                      <div className="absolute bottom-2 right-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        -{Math.round(prod.discountPercentage)}%
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition">
                        {prod.title}
                      </h3>

                      <div className="flex items-center gap-1 text-gray-600 text-xs mb-2">
                        <span className="text-yellow-500">⭐</span>
                        <span>{prod.rating}</span>
                      </div>

                      <p className="text-xs text-gray-500 mb-3">
                        {monthlyPayment.toLocaleString()} somdan / 18 oy
                      </p>
                    </div>

                    <div className="flex items-end justify-between mt-auto">
                      <div>
                        <p className="text-xl font-bold text-gray-900">
                          {finalPriceUZS.toLocaleString()} som
                        </p>
                        {prod.discountPercentage > 0 && (
                          <p className="text-xs text-gray-500 line-through">
                            {originalPriceUZS.toLocaleString()} som
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(prod)}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 cursor-pointer group"
                      >
                        <svg
                          className="w-6 h-6 text-gray-800 group-hover:text-gray-900 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
