const ProductList = () => {
  const products = [
    {
      image: "https://m.media-amazon.com/images/I/5136Y63Lq4L._SL500_.jpg",
      title: "Sunstar Fresh Melon Juice",
      unit: "1 Unit",
      rating: 4.5,
      price: 18.0,
      offer: 30,
    },
    {
      image:
        "https://www.jiomart.com/images/product/original/491551495/good-life-pure-crystal-sugar-m-5-kg-product-images-o491551495-p491551495-0-202205272019.jpg?im=Resize=(360,360)",
      title: "Sunstar Fresh Biscuits",
      unit: "1 Unit",
      rating: 4.5,
      price: 18.0,
      offer: 30,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV9POjXQFdVe7nGKvqf9UKL4WtEwVjlB-Kkg&s",
      title: "Fresh Cucumber",
      unit: "1 Unit",
      rating: 4.5,
      price: 18.0,
      offer: 0,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OSZNfpMOQvlK2WeZ_Xyb9L7r7NxGj-twNQ&s",
      title: "Fresh Milk",
      unit: "1 Unit",
      rating: 4.5,
      price: 18.0,
      offer: 0,
    },
  ];

  return (
    <div className="tab-content" id="nav-tabContent">
      <div
        className="tab-pane fade show active"
        id="nav-all"
        role="tabpanel"
        aria-labelledby="nav-all-tab"
      >
        <div className="product-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border-t dark:border-gray-800">
          {products.map((product, index) => (
            <div
              key={index}
              className="product-item relative border-r dark:border-gray-800 p-4"
            >
              {/* Wishlist Button */}
              <a
                href="#"
                className="btn-wishlist absolute top-3 right-3 m-3 text-red-500 text-3xl"
              >
                &#9829;
              </a>

              {/* Product Image */}
              <figure>
                <a href="index.html" title={product.title}>
                  <img
                    src={product.image}
                    className="w-full h-48 object-cover rounded-lg"
                    alt={product.title}
                  />
                </a>
              </figure>

              {/* Product Details */}
              <div className="mt-2">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  {product.offer > 0 && (
                    <span className="text-sm line-through text-gray-500">
                      ${product.price}
                    </span>
                  )}
                  <div className="flex items-center">
                    <span className="text-xl font-semibold text-gray-800">
                      $
                      {product.offer > 0
                        ? (
                            product.price -
                            (product.price * product.offer) / 100
                          ).toFixed(2)
                        : product.price}
                    </span>
                    <span className="text-sm ml-2 text-gray-500">
                      {product.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Specific - Quantity Control & Add to Cart Button */}
              <div className="flex items-center justify-between mt-3 space-x-2">
                {/* Quantity Input */}
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <input
                    type="number"
                    className="w-12 text-center py-2"
                    value="1"
                    min="1"
                    max="100"
                    onInput={(e) =>
                      (e.target.value = Math.max(1, e.target.value))
                    }
                  />
                </div>

                {/* Add to Cart Button */}
                <a
                  href="#"
                  className="nav-link bg-yellow-500 text-white py-2 px-4 rounded-full mt-2 flex items-center justify-center space-x-2"
                >
                  <span>Add to Cart</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
