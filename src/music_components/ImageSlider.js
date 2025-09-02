import React, { useState, useEffect, useRef } from "react";

export default function ImageSlider({
  slides = [
    { url: "https://picsum.photos/id/1015/1920/600", alt: "Nature 1" },
    { url: "https://picsum.photos/id/1016/1920/600", alt: "Nature 2" },
    { url: "https://picsum.photos/id/1018/1920/600", alt: "Nature 3" },
    { url: "https://picsum.photos/id/1020/1920/600", alt: "Nature 4" },
  ],
  autoPlay = true,
  interval = 4000,
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto Play
  useEffect(() => {
    if (autoPlay && !paused) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [current, autoPlay, paused, interval]);

  // Swipe Handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-full h-[40vh] md:h-[70vh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.url}
            alt={slide.alt}
            className="w-full h-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 -translate-y-1/2 bg-black/40 dark:bg-white/30 text-white dark:text-black p-3 rounded-full hover:scale-110 transition"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 -translate-y-1/2 bg-black/40 dark:bg-white/30 text-white dark:text-black p-3 rounded-full hover:scale-110 transition"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index
                ? "bg-white dark:bg-black scale-110"
                : "bg-gray-400 dark:bg-gray-600"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
