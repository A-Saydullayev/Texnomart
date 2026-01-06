"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useLikeStore, toggleLike } from "@/store/like";
import { addToCart } from "@/store/cart";
import { Toaster, toast } from "react-hot-toast";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  images: string[];
  stock: number;
  brand: string;
};

async function fetchProduct(id: string): Promise<Product> {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
}

const EXCHANGE_RATE = 12700;

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const likeState = useLikeStore();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  const handleAddToCart = () => {
    if (!product) return;

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="py-32 text-center">Mahsulot topilmadi</div>;
  }

  const original = Math.round(product.price * EXCHANGE_RATE);
  const discount = Math.round(original * (product.discountPercentage / 100));
  const finalPrice = original - discount;
  const monthly = Math.round((finalPrice * 1.3) / 18);
  const isLiked = !!likeState.liked[product.id];

  return (
    <>
      <Toaster />

      <div className="max-w-7xl mx-auto px-4 py-6 mt-15">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_360px] gap-8">
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {product.images.slice(0, 4).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-16 h-16 border border-amber-300 rounded object-cover"
                />
              ))}
            </div>

            <div className="flex-1 rounded-lg bg-white p-4 relative">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-[420px] object-contain"
              />

              <button
                onClick={() => toggleLike(product.id)}
                className="absolute top-6 right-6 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all duration-200 z-10"
              >
                <svg
                  className={`w-6 h-6 transition-colors ${
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
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-semibold mb-3">{product.title}</h1>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <span>⭐ {product.rating}</span>
              <span>•</span>
              <span>{product.stock} dona mavjud</span>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Mahsulot haqida</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Brend: {product.brand}</li>
                <li>Kategoriya: {product.category}</li>
              </ul>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="border border-amber-300 rounded-xl p-5 h-fit sticky top-20 bg-white">
            <p className="text-3xl font-bold mb-2">
              {finalPrice.toLocaleString()} so'm
            </p>

            {product.discountPercentage > 0 && (
              <p className="text-sm text-gray-500 line-through mb-3">
                {original.toLocaleString()} so'm
              </p>
            )}

            <div className="bg-gray-100 rounded-lg p-3 text-sm mb-4">
              Muddatli to'lov:{" "}
              <span className="font-semibold">
                {monthly.toLocaleString()} so'm × 18 oy
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-lg mb-3 cursor-pointer transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Savatchaga
            </button>

            <button className="w-full border border-amber-300 py-3 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Birgina klik orqali xarid
            </button>

            <div className="text-xs text-gray-500 mt-4">
              Kafolat: 1 yil <br />
              Do'kondan olib ketish bepul
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
