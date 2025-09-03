import React from "react";
import { motion } from "framer-motion";

const MusicCategories = () => {
  const categories = [
    {
      title: "Hindustani Vocal",
      subtitle: "Explore the beauty of Hindustani classical music",
      color: "#2563EB",
      cards: [
        { label: "Beginner Course", link: "#", icon: "https://img.icons8.com/color/96/microphone.png" },
        { label: "Intermediate", link: "#", icon: "https://img.icons8.com/color/96/music.png" },
        { label: "Advanced", link: "#", icon: "https://img.icons8.com/color/96/concert.png" },
      ],
    },
    {
      title: "Carnatic Vocal",
      subtitle: "Learn Carnatic classical step by step",
      color: "#059669",
      cards: [
        { label: "Varnams", link: "#", icon: "https://img.icons8.com/color/96/sitar.png" },
        { label: "Krithis", link: "#", icon: "https://img.icons8.com/color/96/tabla.png" },
        { label: "Concert Prep", link: "#", icon: "https://img.icons8.com/color/96/conductor.png" },
      ],
    },
    {
      title: "Playback Singing",
      subtitle: "Bollywood & regional playback singing training",
      color: "#D97706",
      cards: [
        { label: "Voice Culture", link: "#", icon: "https://img.icons8.com/color/96/microphone-2.png" },
        { label: "Recording Skills", link: "#", icon: "https://img.icons8.com/color/96/audio-wave.png" },
        { label: "Stage Performance", link: "#", icon: "https://img.icons8.com/color/96/stage.png" },
      ],
    },
    {
      title: "Instrumental",
      subtitle: "Learn to play instruments with professional guidance",
      color: "#DC2626",
      cards: [
        { label: "Guitar", link: "#", icon: "https://img.icons8.com/color/96/guitar.png" },
        { label: "Keyboard", link: "#", icon: "https://img.icons8.com/color/96/piano.png" },
        { label: "Flute", link: "#", icon: "https://img.icons8.com/color/96/flute.png" },
      ],
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900">
      {categories.map((cat, idx) => (
        <motion.section
          key={idx}
          className="bg-gray-100 dark:bg-gray-900 py-12 border-b-2 border-dashed border-gray-300 dark:border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-10 gap-8 relative px-6">
            {/* Left Side */}
            <motion.div
              className="md:col-span-3 relative"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-bold text-3xl text-gray-800 dark:text-white">{cat.title}</h2>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 italic">
                “{cat.subtitle}”
              </p>
            </motion.div>

            {/* Right Side: Cards */}
            <motion.div
              className="md:col-span-7 overflow-x-auto flex gap-6 pb-4 no-scrollbar"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {cat.cards?.length > 0 ? (
                cat.cards.map((card, i) => (
                  <motion.a
                    key={i}
                    href={card.link}
                    className="flex-shrink-0 w-48 h-40 bg-gradient-to-br from-yellow-400 to-white dark:from-yellow-600 dark:to-gray-800 rounded-xl shadow-lg flex items-center justify-center relative"
                    whileHover={{ scale: 1.08, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <p
                      className="font-extrabold text-center px-2 text-xl"
                      style={{ color: cat.color }}
                    >
                      {card.label}
                    </p>
                    {card.icon && (
                      <motion.img
                        src={card.icon}
                        alt={card.label}
                        className="absolute -top-6 -right-6 w-20"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      />
                    )}
                  </motion.a>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Coming soon...</p>
              )}
            </motion.div>
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default MusicCategories;
