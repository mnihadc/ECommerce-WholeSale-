import { useState, useEffect } from "react";

const Banner = () => {
  const images = [
    "https://ninjacart.com/wp-content/uploads/2024/08/Banner-1.jpeg",
    "https://thumbs.dreamstime.com/b/basket-groceries-store-shelves-products-customers-background-high-quality-photo-338517403.jpg",
    "https://media.istockphoto.com/id/999084240/photo/businessman-checking-inventory-in-a-digital-tablet-at-a-supermarket.jpg?s=612x612&w=0&k=20&c=E9Xk97v2U7y17kYZHTtbrw74kQLTwdeogSHerLguDKA=",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-switch the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <section
      className="relative bg-cover bg-no-repeat bg-center py-32 lg:py-40 xl:py-48 transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 text-center text-white px-4 sm:px-8 md:px-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Welcome to Our Store!
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl font-medium">
          Enjoy shopping with the best offers.
        </p>
        <button className="mt-8 px-6 py-3 border-2 border-white bg-transparent text-white font-semibold text-lg rounded-lg shadow-md hover:bg-white hover:text-black hover:border-transparent transition-all duration-300">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Banner;
