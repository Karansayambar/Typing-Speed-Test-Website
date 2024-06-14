import React from 'react'
import Footer from "../components/Footer";
import TypingBox from "../components/TypingBox";
import Header from "../components/Header";

export const HomePage = () => {
  return (
    <div className="canvas">
        <Header />
        <TypingBox />
        <Footer />
      </div>
  )
}
