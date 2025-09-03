import React, { useState, useEffect } from "react";

const banners = [
  {
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1920&q=80", // guitar
    title: "Music is the universal language",
    description: "Let melodies speak when words fail.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1920&q=80", // microphone
    title: "Where words leave off, music begins",
    description: "Sing your heart out, inspire the world.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=1920&q=80", // piano
    title: "Life is like a piano",
    description: "What you get out of it depends on how you play it.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80", // concert
    title: "Feel the rhythm of life",
    description: "Every beat brings us closer together.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&q=80", // headphones
    title: "Lose yourself in the music",
    description: "A good song can change your whole mood.",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] mt-6 overflow-hidden rounded-2xl shadow-xl">
      {/* Image */}
      <img
        src={banners[currentIndex].image}
        alt={banners[currentIndex].title}
        className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-lg md:text-2xl font-bold text-white drop-shadow-lg">
          {banners[currentIndex].title}
        </h1>
        <p className="mt-2 text-white/90 text-sm md:text-base max-w-xl">
          {banners[currentIndex].description}
        </p>
        <button className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
          Explore Courses
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
              idx === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
