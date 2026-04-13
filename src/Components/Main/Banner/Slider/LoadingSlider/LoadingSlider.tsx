import { useEffect, useState } from "react";
import "./LoadingSlider.css";

const LoadingSlider = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    setIsMobile(
      /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent,
      ),
    );
  }, []);
  return (
    <div
      style={
        isMobile && window.visualViewport?.height
          ? {
              marginBottom: `${(window.screen.height - window.visualViewport?.height) }px`,
            }
          : { marginBottom: `35px` }
      }
      className="container_banner_nav_load"
    >
      <div className="container_window">
        <div className="container_state_img_page">
          <div className="loading load_title">
            <div className="glow"></div>
          </div>
          <div className="loading load_title">
            <div className="glow"></div>
          </div>
          <div className="loading load_title">
            <div className="glow"></div>
          </div>
          <div className="loading load_title">
            <div className="glow"></div>
          </div>
          <div className="loading load_title">
            <div className="glow"></div>
          </div>
          <div className="loading load_title">
            <div className="glow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSlider;
