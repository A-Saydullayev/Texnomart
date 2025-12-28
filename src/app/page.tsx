"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

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
  const response = await axios.get("https://dummyjson.com/products?limit=30");
  return response.data.products;
}

const EXCHANGE_RATE = 12700;
const Home = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <p className="text-center py-32 text-3xl font-medium text-gray-600 animate-pulse">
        Yuklanmoqda...
      </p>
    );

  if (isError)
    return (
      <p className="text-center py-32 text-3xl font-medium text-red-600">
        Xato: {(error as Error)?.message || "Ma'lumotlarni yuklashda xatolik"}
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.map((prod) => {
            const originalPriceUZS = Math.round(prod.price * EXCHANGE_RATE);
            const discountAmount = Math.round(
              originalPriceUZS * (prod.discountPercentage / 100)
            );
            const finalPriceUZS = originalPriceUZS - discountAmount;

            const totalInstallment = Math.round(finalPriceUZS * 1.3);
            const monthlyPayment = Math.round(totalInstallment / 18);

            return (
              <Link
                href={`/detail/${prod.id}`}
                key={prod.id}
                className="block group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                  <div className="relative aspect-square bg-gray-50">
                    <img
                      src={prod.images[0] || "/placeholder.jpg"}
                      alt={prod.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      50-0-2
                    </div>

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
                        <span>Sharh yo'q</span>
                      </div>

                      <p className="text-xs text-gray-500 mb-3">
                        {monthlyPayment.toLocaleString()} so'mdan / 18 oy
                      </p>
                    </div>

                    <div className="flex items-end justify-between mt-auto">
                      <div>
                        <p className="text-xl font-bold text-gray-900">
                          {finalPriceUZS.toLocaleString()} so'm
                        </p>
                        {prod.discountPercentage > 0 && (
                          <p className="text-xs text-gray-500 line-through">
                            {originalPriceUZS.toLocaleString()} so'm
                          </p>
                        )}
                      </div>

                      <button className="bg-yellow-400 hover:bg-yellow-500 group-hover:bg-yellow-500 transition-colors rounded-full p-3 shadow-md">
                        <svg
                          className="w-6 h-6 text-gray-800"
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
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
