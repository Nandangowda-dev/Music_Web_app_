// src/music_components/VideoGallery.jsx
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const videos = [
  {
    title: "Hindustani Vocal Tutorial",
    category: "Vocal",
    duration: "5:30",
    thumbnail: "https://images.unsplash.com/photo-1612039557000-dc0a7bdf2c35?q=80&w=600",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Carnatic Vocal Lesson",
    category: "Vocal",
    duration: "7:20",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600",
    url: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    title: "Playback Singing Sample",
    category: "Singing",
    duration: "6:10",
    thumbnail: "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=600",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Instrumental Guitar Tutorial",
    category: "Instrument",
    duration: "4:50",
    thumbnail: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=600",
    url: "https://www.w3schools.com/html/movie.mp4",
  },
];

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        🎬 Music Video Clips
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition-all cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{video.category}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-3xl w-full p-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {selectedVideo.title}
            </h3>
            <video
              src={selectedVideo.url}
              controls
              autoPlay
              className="w-full h-64 md:h-96 rounded-lg mb-4"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;
