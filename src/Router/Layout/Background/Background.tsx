import { useEffect, useState } from "react";
import "./Background.css";
import CursorLight from "./CursorLight/CursorLight";
import RandomLights from "./RandomLights/RandomLights";

const Background = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(
      /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent,
      ),
    );
  }, []);
  return (
    <div className="container_background">
      <div className="container_blur"></div>
      <div className="noises"></div>
      <RandomLights />
      {isMobile ? "" : <CursorLight />}
    </div>
  );
};

export default Background;
