"use client";

import Link from "next/link";
import {
  useCartStore,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/cart";

const Som = 12700;

export default function CartPage() {
  const cartState = useCartStore();
  const items = cartState.items;

  const subtotal = items.reduce((total, item) => {
    const originalPrice = item.price * Som;
    const discount = originalPrice * (item.discountPercentage / 100);
    const finalPrice = originalPrice - discount;
    return total + finalPrice * item.quantity;
  }, 0);

  const delivery = items.length > 0 ? 0 : 0;
  const total = subtotal + delivery;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20 sm:py-32">
            <svg
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-gray-300 mb-6"
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
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6">
              Savat bo'sh
            </h2>

            <Link
              href="/"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-4 rounded-lg text-lg transition shadow-md"
            >
              Xarid qilishni boshlash
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Savat</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Buyurtma haqida</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Mahsulotlar ({totalQuantity}):</span>
                  <span className="font-medium">
                    {subtotal.toLocaleString()} so'm
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Yetkazib berish:</span>
                  <span className="font-medium text-green-600">Bepul</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Jami:</span>
                    <span>{total.toLocaleString()} so'm</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-4 rounded-lg mb-4 transition text-lg shadow-md">
                Rasmiylashtirish
              </button>

              <div className="text-sm text-gray-500 space-y-1 text-center">
                <p>✓ Bepul yetkazib berish</p>
                <p>✓ Kafolat: 1 yil</p>
                <p>✓ To'lovni qabul qilishda amalga oshirish</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <div className="flex justify-end mb-4">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Hammasini o'chirish
              </button>
            </div>

            {items.map((item) => {
              const originalPrice = Math.round(item.price * Som);
              const discount = Math.round(
                originalPrice * (item.discountPercentage / 100)
              );
              const finalPrice = originalPrice - discount;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                >
                  <div className="p-4 flex flex-col sm:flex-row gap-4">
                    <Link href={`/detail/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full sm:w-28 sm:h-28 object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-grow">
                      <Link href={`/detail/${item.id}`}>
                        <h3 className="font-medium text-gray-800 mb-3 hover:text-blue-600 transition line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>

                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <p className="text-xl font-bold text-gray-900">
                          {finalPrice.toLocaleString()} so'm
                        </p>
                        {item.discountPercentage > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            {originalPrice.toLocaleString()} so'm
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-4 py-2 hover:bg-gray-100 transition text-lg"
                          >
                            −
                          </button>
                          <span className="px-6 py-2 border-x border-gray-300 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-4 py-2 hover:bg-gray-100 transition text-lg"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          O'chirish
                        </button>
                      </div>
                    </div>

                    <div className="sm:hidden border-t border-gray-200 pt-4 mt-4">
                      <p className="text-right text-lg font-bold text-gray-900">
                        {(finalPrice * item.quantity).toLocaleString()} so'm
                      </p>
                    </div>

                    <div className="hidden sm:block text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {(finalPrice * item.quantity).toLocaleString()} so'm
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
