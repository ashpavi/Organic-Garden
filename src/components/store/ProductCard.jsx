import { Link } from "react-router-dom";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const productId = product?.id ?? 1;
  const productPath = `/products/${productId}`;

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price:
        product.isOnSale && product.discountPrice
          ? product.discountPrice
          : product.price,
      images: product.images,
      stock: product.stock,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="
        bg-white rounded-2xl border border-green-100
        hover:shadow-md hover:-translate-y-1
        transition-all duration-300
        overflow-hidden flex flex-col
      "
    >
      {/* IMAGE */}
      <Link
        to={productPath}
        className="block bg-green-50 aspect-[4/5] overflow-hidden"
      >
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>

      {/* CONTENT */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">

        {/* CATEGORY / BRAND */}
        {product.brand && (
          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1 truncate">
            {product.brand}
          </p>
        )}

        {/* NAME */}
        <Link
          to={productPath}
          className="
            text-xs sm:text-sm font-semibold text-gray-800
            hover:text-green-700 transition
            line-clamp-2 leading-tight min-h-[32px]
          "
        >
          {product.name}
        </Link>

        {/* PRICE */}
        <div className="mt-1.5">
          {product.isOnSale && product.discountPrice ? (
            <div className="flex flex-col">
              <span className="text-gray-400 line-through text-xs">
                {formatPrice(product.price)}
              </span>
              <span className="text-green-700 font-semibold text-sm sm:text-base">
                {formatPrice(product.discountPrice)}
              </span>
            </div>
          ) : (
            <p className="text-green-700 font-semibold text-sm sm:text-base">
              {formatPrice(product.price)}
            </p>
          )}
        </div>

        

        {/* BUTTON */}
        <div className="mt-auto pt-2">
          <button
            onClick={handleAdd}
            className={`
              w-full flex items-center justify-center gap-1.5
              py-2 rounded-lg text-xs sm:text-sm font-medium
              transition-all duration-200
              ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-green-700 text-white hover:bg-green-800"
              }
            `}
          >
            {added ? (
              <>
                <FaCheck size={10} />
                Added
              </>
            ) : (
              <>
                <FaShoppingCart size={10} />
                Add
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}