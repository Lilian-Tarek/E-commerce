import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";

const Landing = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-start gap-10 justify-center items-center  lg:justify-between py-10 ">
      {/* Section 1: Text & Button */}
      <div className="w-full lg:w-1/3 pt-5 md:pt-10 z-10 lg:text-start text-center">
        <h2 className="text-5xl font-black leading-tight mb-2 tracking-tighter text-primary">
          NEW <br className="hidden lg:block" /> COLLECTION
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-10 md:mb-20">
          Summer <br /> 2024
        </p>

        <div className="flex flex-col sm:flex-row md:items-center gap-4 lg:justify-start justify-center">
          <button className="flex items-center justify-between gap-6 md:gap-10 px-6 py-3 bg-secondary hover:bg-gray-300 transition w-full sm:w-auto">
            <span className=" text-lg text-primary font-bold">Go To Shop</span>
            <FiArrowRight size={24} />
          </button>

          <div className="flex gap-2 justify-center md:justify-start">
            <button className="prev-btn border border-secondary p-3 hover:bg-white transition">
              <FiChevronLeft size={20} className="text-primary font-bold text-2xl"/>
            </button>
            <button className="next-btn border border-secondary p-3 hover:bg-white transition">
              <FiChevronRight size={20} className="text-primary font-bold text-2xl"/>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/3 mt-10 md:mt-0">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn"
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30
            }
          }}
          className="mySwiper"
        >
          {[12, 13, 12, 13].map((num, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white">
                <img
                  src={`/images/Rectangle ${num}.png`}
                  alt="collection"
                  className="w-full h-[300px] md:h-[450px] object-cover border-1 border-secondary rounded"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Landing;
