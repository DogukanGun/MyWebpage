"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import Hero from "./components/hero";
import About from "./components/about";
import Services from "./components/services";
import Work from "./components/work";
import Blog from "./components/blog";
import Contact from "./components/contact";




const Home = () => {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div>
        <Hero/>
        <About/>
        <Services/>
        <Work/>
        <Blog/>
        <Contact/>
      </div>
    </main >
  )
}


export default Home