import React from 'react'
import { useState } from 'react'
import Nav_bar from './Nav_bar'
import ImageSlider from './ImageSlider'
import FeaturedCourses from './FeaturedCourses '
import VideoGallery from './VideoGallery'
import LoginRegisterModal from './LoginRegisterModal'
const Core_common_page = () => {
   const [modalOpen, setModalOpen] = useState(false);

  const handleEnrollClick = () => {
    setModalOpen(true);
  };
  return (
    <div>
        <Nav_bar/>
        <ImageSlider/>
        <FeaturedCourses/>
        <VideoGallery/>
         <LoginRegisterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} dark={true}/>
    </div>
  )
}

export default Core_common_page