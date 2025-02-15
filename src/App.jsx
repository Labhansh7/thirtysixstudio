import Canvas from "./Canvas";
import "./index.css";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circ, Expo } from "gsap/all";

export default function App() {
  const [showcanvas, setshowcanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setshowcanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing block rounded-full fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative  min-h-screen  font-Helvetica_Now_Display">
        {showcanvas &&
          data[0].map((canvasdets, Index) => <Canvas details={canvasdets} />)}

        <div className="w-full h-screen relative z-[1]  ">
          <nav className=" top-0 left-0 w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-reglar">thirtysixstudios</div>
            <div className="links flex gap-10">
              {["Home", "About", "Projects", "Contact"].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontaier px-[20%] w-full">
            <div className="text w-[50%] ">
              <h3 className="text-4xl leading-[1.4]">
                At Thirtysixstudio, we build immersive digital experience for
                brands with a purpose.
              </h3>
              <p className="text-md w-[80%] mt-10 font-normal">
                We’re a boutique production studio focused on design, motion,
                and creative technology, constantly reimagining what digital
                craft can do for present-time ads and campaigns
              </p>
              <p className="text-md mt-10">Scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0 pl-5">
            <h1
              ref={headingref}
              className="text-[17rem] font-normal tracking-tight leading-none"
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full relative h-screen  mt-32 px-10">
        {showcanvas &&
          data[1].map((canvasdets, Index) => <Canvas details={canvasdets} />)}
        <div className="relative z-[1]">
          <h1 className="text-8xl">About the brand</h1>
          <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            quibusdam odio laudantium ipsum facilis numquam alias, vero magnam
            ad expedita. Iusto eos omnis fuga, officia est reiciendis voluptas?
            Similique, nemo.
          </p>
          <img
            className="w-[80%] mt-10"
            src="https://static.wixstatic.com/media/721c0e_15d43832d5214012acbe7ab4c565a883~mv2.webp/v1/fill/w_420,h_456,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Supernova%20Space%20Photography.webp"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
