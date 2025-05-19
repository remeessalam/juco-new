import React, { lazy, memo } from "react";
import Header from "../../components/LandingPage/Header";
import {
  appDevelopmentServices,
  webDevelopmentServices,
} from "../../constants";
import Footer from "../../components/LandingPage/Footer";
import CallToAction from "../../components/CallToAction";
import Form from "../../components/Form";
import webImg from "../../assets/landingpage-services-imgs/web-development.webp";
import appImg from "../../assets/landingpage-services-imgs/app-development.webp";
import OurServices from "../OurServices";
import aboutImg from "../../assets/aboutus-1.webp";
import Faq from "../../components/Faq";
import WhyChooseUs from "../../components/WhyChooseUs";

const GetInTouch = lazy(() => import("../../components/GetInTouch"));
const Testimonials = lazy(() => import("../../components/Testimonials"));
const HomePageServicesList = lazy(() =>
  import("../../components/HomePageServicesList")
);
const TrustWorthySection = lazy(() =>
  import("../../components/TrustWorthySection")
);
const IndustriesWeServe = lazy(() =>
  import("../../components/IndustriesWeServe")
);
const BrandLogos = lazy(() => import("../../components/BrandLogos"));
const Portfolio = lazy(() => import("../../components/Portfolio"));
const Banner = lazy(() => import("../../components/LandingPage/Banner"));

const LandingPage = () => {
  // const isWebDevelopment = Boolean(page === "web-development");
  // const servicesList = isWebDevelopment
  //   ? webDevelopmentServices
  //   : appDevelopmentServices;
  return (
    <>
      <Header />
      <Banner />
      <div className="bg-primary/5 py-[5rem] mb-[3rem]">
        <div className="wrapper">
          <div className="grid md:grid-cols-2 items-center gap-5">
            <div className="aspect-video relative h-full w-full rounded-xl overflow-hidden">
              <img src={webImg} className="w-full h-full object-cover" alt="" />
              <div className="absolute left-0 top-0 w-full p-3 h-full flex items-center justify-center bg-black/60">
                <div className="text-white space-y-3 text-center">
                  <p className="font-sans text-2xl sm:text-4xl font-bold">
                    Book Your Free Consultation
                  </p>
                  <p className="description sm:!text-lg !text-sm">
                    JUOC Solutions LLP is an AI company based in Bengaluru. We
                    help organizations kickstart their AI journey. If you’re
                    seeking a solution for your organization to enhance customer
                    support, boost employee productivity, and make the most of
                    your organization’s data, look no further.
                  </p>
                </div>
              </div>
            </div>
            <Form />
          </div>
        </div>
      </div>
      {/* <GetInTouch /> */}
      <section id="about-us" className="relative py-[3rem]">
        <div className="blurred-red-circle h-[25rem] w-[25rem] top-[-10rem] left-[-10rem] -z-10"></div>
        <div className="wrapper">
          <h1
            data-aos="fade-down"
            className="heading text-center mb-5 md:mb-10"
          >
            About Us
          </h1>
          <div className="grid md:grid-cols-2 gap-5 md:gap-10">
            <p data-aos="fade-right" className="description">
              At JUOC Solutions LLP, we're at the forefront of digital
              transformation, specializing in Blockchain, AI, Cloud, and
              Automation solutions. Based in Bengaluru, India's tech hub, our
              team of visionary engineers and developers creates intelligent
              systems that redefine business capabilities.
              <br /> <br /> We bridge the gap between emerging technologies and
              practical business applications, delivering solutions that are not
              just innovative but deliver measurable ROI. From decentralized
              systems to cognitive automation, we help enterprises future-proof
              their operations and unlock new growth opportunities in an
              increasingly digital world.
            </p>
            <img
              data-aos="fade-left"
              loading="lazy"
              src={aboutImg}
              alt="about"
              className="max-h-[25rem] w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
      <TrustWorthySection />
      <section
        id="services"
        className="w-screen py-[3rem] min-h-[70vh] flex justify-center relative"
      >
        <div className="blue-bg-shape -z-10 left-[-5%] rotate-45 -translate-y-1/2"></div>
        <div className="blue-bg-shape -z-10 right-[-5%] rotate-45 top-1/2 -translate-y-1/2"></div>
        <div className="wrapper flex flex-col items-center gap-5 z-10">
          <h1
            data-aos="fade-up"
            className="heading text-center max-w-6xl whitespace-pre-line capitalize"
          >
            Transformative Technology Solutions for the Digital Age
          </h1>
          <p data-aos="fade-up" className="text-center max-w-6xl description">
            We architect intelligent systems that go beyond functionality - from
            Blockchain networks to AI-powered automation, delivering measurable
            business impact and future-ready solutions.
          </p>
          <HomePageServicesList />
        </div>
      </section>
      {/* <HomePageServicesList /> */}
      <IndustriesWeServe />
      <CallToAction />
      <Portfolio />
      <WhyChooseUs />
      <Testimonials />
      <BrandLogos />
      <Faq />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default memo(LandingPage);
