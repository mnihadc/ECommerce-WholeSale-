import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const CategorySection = () => {
  const categories = [
    {
      image:
        "https://media.istockphoto.com/id/529664572/photo/fruit-background.jpg?s=612x612&w=0&k=20&c=K7V0rVCGj8tvluXDqxJgu0AdMKF8axP0A15P-8Ksh3I=",
      title: "Fruits & Veges",
    },
    {
      image:
        "https://thumbs.dreamstime.com/b/poznan-poland-apr-bottles-global-soft-drink-brands-including-products-coca-cola-company-pepsico-bottles-global-soft-114614636.jpg",
      title: "Beverages",
    },
    {
      image:
        "https://t4.ftcdn.net/jpg/03/43/40/51/360_F_343405176_WdQVipBD67m7hkzkcIFVexWz9Vj3Nhqk.jpg",
      title: "Meat Products",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/doha-qatar-may-20-2020potato-260nw-1853833957.jpg",
      title: "Chips",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ovkCH6HKmu15PB6fRcHO6dceK2krsMvoHw&s",
      title: "Rice",
    },
    {
      image:
        "https://t3.ftcdn.net/jpg/03/97/54/30/360_F_397543036_SHAnQaGVD1Z47RkZOIOYYl9qz1azBZLU.jpg",
      title: "Cooler Items",
    },
    {
      image:
        "https://media.istockphoto.com/id/529664572/photo/fruit-background.jpg?s=612x612&w=0&k=20&c=K7V0rVCGj8tvluXDqxJgu0AdMKF8axP0A15P-8Ksh3I=",
      title: "Fruits & Veges",
    },
    {
      image:
        "https://thumbs.dreamstime.com/b/poznan-poland-apr-bottles-global-soft-drink-brands-including-products-coca-cola-company-pepsico-bottles-global-soft-114614636.jpg",
      title: "Beverages",
    },
    {
      image:
        "https://t4.ftcdn.net/jpg/03/43/40/51/360_F_343405176_WdQVipBD67m7hkzkcIFVexWz9Vj3Nhqk.jpg",
      title: "Meat Products",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/doha-qatar-may-20-2020potato-260nw-1853833957.jpg",
      title: "Chips",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ovkCH6HKmu15PB6fRcHO6dceK2krsMvoHw&s",
      title: "Rice",
    },
    {
      image:
        "https://t3.ftcdn.net/jpg/03/97/54/30/360_F_397543036_SHAnQaGVD1Z47RkZOIOYYl9qz1azBZLU.jpg",
      title: "Cooler Items",
    },
    {
      image:
        "https://media.istockphoto.com/id/529664572/photo/fruit-background.jpg?s=612x612&w=0&k=20&c=K7V0rVCGj8tvluXDqxJgu0AdMKF8axP0A15P-8Ksh3I=",
      title: "Fruits & Veges",
    },
    {
      image:
        "https://thumbs.dreamstime.com/b/poznan-poland-apr-bottles-global-soft-drink-brands-including-products-coca-cola-company-pepsico-bottles-global-soft-114614636.jpg",
      title: "Beverages",
    },
    {
      image:
        "https://t4.ftcdn.net/jpg/03/43/40/51/360_F_343405176_WdQVipBD67m7hkzkcIFVexWz9Vj3Nhqk.jpg",
      title: "Meat Products",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/doha-qatar-may-20-2020potato-260nw-1853833957.jpg",
      title: "Chips",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ovkCH6HKmu15PB6fRcHO6dceK2krsMvoHw&s",
      title: "Rice",
    },
    {
      image:
        "https://t3.ftcdn.net/jpg/03/97/54/30/360_F_397543036_SHAnQaGVD1Z47RkZOIOYYl9qz1azBZLU.jpg",
      title: "Cooler Items",
    },
  ];

  return (
    <section className="py-5 overflow-hidden bg-gray-100 relative">
      <div className="container mx-auto relative">
        {/* Section Heading */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-gray-800">Category</h2>
        </div>

        {/* Swiper Container */}
        <div className="relative">
          {/* Left Button */}
          {/* Left Button */}
          <button className="swiper-button-prev absolute top-1/2 left-0 md:-left-6 transform -translate-y-1/2 z-10 p-3 bg-transparent text-gray-900 border border-gray-400 rounded-full shadow-lg hover:bg-yellow-600 hover:text-white transition-all">
            ❮
          </button>

          {/* Right Button */}
          <button className="swiper-button-next absolute top-1/2 right-0 md:-right-6 transform -translate-y-1/2 z-10 p-3 bg-transparent text-gray-900 border border-gray-400 rounded-full shadow-lg hover:bg-yellow-600 hover:text-white transition-all">
            ❯
          </button>

          <Swiper
            spaceBetween={10}
            loop={true}
            autoplay={{ delay: 1000, disableOnInteraction: false }} // Auto-rotate every second
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation, Autoplay]} // Include Autoplay module
            breakpoints={{
              320: { slidesPerView: 3, spaceBetween: 1 },
              480: { slidesPerView: 4, spaceBetween: 2 },
              768: { slidesPerView: 5, spaceBetween: 2 },
              1024: { slidesPerView: 7, spaceBetween: 4 },
              1280: { slidesPerView: 8, spaceBetween: 4 },
            }}
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index} className="text-center">
                <a
                  href="category.html"
                  className="nav-link block transform transition-transform hover:scale-105"
                >
                  <img
                    src={category.image}
                    className="rounded-lg w-20 h-20 md:w-28 md:h-28 mx-auto object-cover shadow-lg transition-shadow hover:shadow-2xl"
                    alt={category.title}
                  />
                  <h4 className="text-sm md:text-base mt-2 font-normal text-gray-700">
                    {category.title}
                  </h4>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
