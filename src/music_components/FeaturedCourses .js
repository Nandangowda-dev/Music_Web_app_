
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const courses = [
  {
    title: "Hindustani Vocal",
    category: "Vocal",
    image:
      "https://images.pexels.com/photos/1649691/pexels-photo-1649691.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Learn the basics of Hindustani classical music with expert guidance.",
  },
  {
    title: "Carnatic Vocal",
    category: "Vocal",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600",
    description: "Master Carnatic ragas and talas step by step.",
  },
  {
    title: "Playback Series",
    category: "Singing",
    image:
      "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=600",
    description: "Learn playback singing techniques used in the film industry.",
  },
  {
    title: "Music for Children",
    category: "Kids",
    image:
      "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=600",
    description: "Fun introduction to music for kids with games and activities.",
  },
  {
    title: "Instrumental",
    category: "Instrument",
    image:
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=600",
    description: "Learn instruments like guitar, piano, and drums.",
  },
];

const FeaturedCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("userToken"); 

  const handleEnroll = () => {
    if (isLoggedIn) {
      navigate("/payment", { state: { course: selectedCourse } });
    } else {
      navigate("/register");
    }
  };

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        🎵 Featured Courses
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={15}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {courses.map((course, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all w-60 mx-auto">
              <img
                src={course.image}
                alt={course.title}
                loading="lazy"
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {course.category}
                </p>
                <button
  onClick={() => {
    if (isLoggedIn) {
      // ✅ pass course data to payment page
      navigate("/payment", { state: { course } });
    } else {
      setSelectedCourse(course); // show modal if not logged in
    }
  }}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
  Enroll Now
</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    
      {!isLoggedIn && selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {selectedCourse.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {selectedCourse.description}
            </p>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition mb-2"
              onClick={handleEnroll}
            >
              Proceed to Register
            </button>
            <button
              onClick={() => setSelectedCourse(null)}
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

export default FeaturedCourses;
