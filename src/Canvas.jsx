import { useEffect, useRef, useState } from "react";
import Canvasimages from "./Canvasimages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const [Index, setIndex] = useState({ value: details.startIndex });
  const canvasRef = useRef(null);

  useGSAP(() => {
    gsap.to(Index, {
      value: startIndex + numImages - 1,
      duration: duration,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        setIndex({ value: Math.round(Index.value) });
      },
    });
    gsap.from(canvasRef.current, {
      opacity: 0,
      scale:0.3,
      duration: 0.5,
      ease:"power2.inOut",
    });
  });

  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = Canvasimages[Index.value];
    img.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.Height = canvas.offsetHeight + "px";
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
  }, [Index]);
  return (
    <canvas
      data-scroll
      data-scroll-speed={Math.random().toFixed(1)}
      ref={canvasRef}
      className="absolute"
      style={{
        width: `${size * 1.2}px`,
        height: `${size * 1.2}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: `${zIndex}%`,
      }}
      id="canvas"
    ></canvas>
  );
}

export default Canvas;
