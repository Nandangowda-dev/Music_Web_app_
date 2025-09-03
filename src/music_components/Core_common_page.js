// src/Core_common_page.jsx
import React, { useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  MotionConfig,
  m,
  useScroll,
  useTransform,
} from "framer-motion";

import Nav_bar from "./Nav_bar";
import ImageSlider from "./ImageSlider";
import FeaturedCourses from "./FeaturedCourses ";
import VideoGallery from "./VideoGallery";
import LoginRegisterModal from "./LoginRegisterModal";
import Banner from "./Banner";
import MusicCategories from "./MusicCategories";
import Footer from "./Footer";

const Section = ({ children, delay = 0, className = "" }) => (
  <m.section
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ type: "spring", stiffness: 120, damping: 18, delay }}
    className={`py-10 md:py-14 ${className}`}
  >
    {children}
  </m.section>
);

// ---------- Parallax wrapper for hero/slider
const ParallaxSection = ({ children, strength = 0.22, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-strength * 100}%`]);

  return (
    <section ref={ref} className={className}>
      <m.div style={{ y }}>{children}</m.div>
    </section>
  );
};

const FloatingNotes = () => {
  const notes = [
    { left: "6%", size: 18, duration: 18, delay: 0 },
    { left: "18%", size: 22, duration: 16, delay: 2 },
    { left: "32%", size: 16, duration: 20, delay: 1.5 },
    { left: "51%", size: 20, duration: 17, delay: 0.8 },
    { left: "72%", size: 24, duration: 19, delay: 1.2 },
    { left: "88%", size: 18, duration: 21, delay: 2.6 },
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
    >
      {notes.map((n, i) => (
        <m.div
          key={i}
          className="absolute bottom-[-48px] opacity-25 dark:opacity-20"
          style={{ left: n.left, fontSize: n.size }}
          animate={{ y: ["0%", "-120vh"], rotate: [0, 12, -8, 0] }}
          transition={{
            duration: n.duration,
            delay: n.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🎵
        </m.div>
      ))}
    </div>
  );
};

export default function Core_common_page() {
  const [modalOpen, setModalOpen] = useState(false);
  const pageRef = useRef(null);


  const { scrollYProgress } = useScroll({ target: pageRef });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <div
          ref={pageRef}
          className="relative overflow-x-clip bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
        >
          {/* Scroll progress bar */}
          <m.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-1 origin-left bg-indigo-600 dark:bg-indigo-400 z-[60]"
          />

          {/* Subtle animated background */}
          <FloatingNotes />

          {/* Nav (you can also animate it if you want) */}
          <Nav_bar />

          {/* Hero / Slider with parallax */}
          <ParallaxSection className="pt-2 md:pt-4">
            <ImageSlider />
          </ParallaxSection>

          {/* Featured Courses (stagger-like entrance) */}
          <Section className="container mx-auto px-4">
            <m.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: { opacity: 1 },
                show: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                },
              }}
            >
              {/* Wrap content to get child-level animation if you want */}
              <m.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <FeaturedCourses />
              </m.div>
            </m.div>
          </Section>

          {/* Video Gallery */}
          <Section className="container mx-auto px-4">
            <m.div variants={{}} initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <VideoGallery />
            </m.div>
          </Section>

          {/* Banner with slight slide-in */}
          <Section className="container mx-auto px-4" delay={0.05}>
            <m.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 140, damping: 16 }}>
              <Banner />
            </m.div>
          </Section>

          {/* Categories with a little depth */}
          <Section className="container mx-auto px-4">
            <m.div
              initial={{ opacity: 0, y: 26, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 130, damping: 18 }}
            >
              <MusicCategories />
            </m.div>
          </Section>

          {/* Footer (fade in) */}
          <Section className="pt-0">
            <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Footer />
            </m.div>
          </Section>

          {/* Modal (your component controls its own animation internally) */}
          <LoginRegisterModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            dark
          />
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}





// import React from 'react'
// import { useState } from 'react'
// import Nav_bar from './Nav_bar'
// import ImageSlider from './ImageSlider'
// import FeaturedCourses from './FeaturedCourses '
// import VideoGallery from './VideoGallery'
// import LoginRegisterModal from './LoginRegisterModal'
// import Banner from './Banner'
// import MusicCategories from './MusicCategories'
// import Footer from './Footer'
// const Core_common_page = () => {
//    const [modalOpen, setModalOpen] = useState(false);

//   const handleEnrollClick = () => {
//     setModalOpen(true);
//   };
//   return (
//     <div>
//         <Nav_bar/>
//         <ImageSlider/>
//         <FeaturedCourses/>
//         <VideoGallery/>
//          <LoginRegisterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} dark={true}/>
//           <Banner/>
//           <MusicCategories/>
//           <Footer/>
//     </div>
//   )
// }

// export default Core_common_page