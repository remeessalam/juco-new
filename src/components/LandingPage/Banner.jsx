import React, { useEffect, useState } from "react";
import vid from "../../assets/vids/banner.mp4";
import ReactPlayer from "react-player";
import robot from "../../assets/ai-robot.png";
import gsap from "gsap";
import bannerThumb from "../../assets/vids/banner-thumb.webp";
import { Link } from "react-scroll";
import { Link as ScrollLink } from "react-scroll";

const Banner = ({ page }) => {
  const isWebDevelopment = Boolean(page === "web-development");
  const [isVideoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    tl.to("#robot", {
      translateY: -80,
      duration: 2,
      ease: "power1.inOut",
    });

    // Add hover event listeners to pause and resume animation
    const robotElement = document.getElementById("robot");

    const handleMouseEnter = () => {
      tl.pause(); // Pause animation on hover
    };

    const handleMouseLeave = () => {
      tl.resume(); // Resume animation when hover ends
    };

    robotElement.addEventListener("mouseenter", handleMouseEnter);
    robotElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tl.kill(); // Clean up animation
      robotElement.removeEventListener("mouseenter", handleMouseEnter);
      robotElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  return (
    <div id="banner" className="h-screen banner relative">
      {!isVideoLoaded && (
        <img
          src={bannerThumb}
          alt=""
          loading="lazy"
          width="800"
          height="800"
          className="w-full h-full object-cover"
        />
      )}
      <ReactPlayer
        url={vid}
        playing
        loop
        muted
        width="100%"
        height="100%"
        playsinline
        onReady={() => setVideoLoaded(true)}
        pip={false}
        playbackRate={0.4}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload noplaybackrate",
              disablePictureInPicture: true,
              playsinline: true,
            },
          },
        }}
        controls={false}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      <div className="w-full absolute left-0 top-0 h-full">
        <div className="wrapper h-full grid md:grid-cols-[55%_auto] items-center md:gap-10">
          <div className="flex w-full flex-col items-start justify-center relative z-10">
            <h1 data-aos="fade-right" className="heading-1 text-white">
              Custom App, Web & Software Solutions for Every Industry
            </h1>
            <p data-aos="fade-right" className="description text-white mt-2">
              From mobile apps to AI-powered platforms — we build secure,
              scalable solutions for healthcare, retail, real estate, logistics,
              and more. Talk to our experts and get tailor-made digital products
              built to perform.
            </p>
            <ScrollLink
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              offset={-90}
              className="primary-btn mt-4"
            >
              Contact Us
            </ScrollLink>
          </div>

          <div data-aos="fade-left" className="md:flex hidden justify-center">
            <Link to="contact" id="robot" className="cursor-pointer">
              <img
                src={robot}
                className="w-[15rem] object-contain relative z-0"
                alt="robot"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
