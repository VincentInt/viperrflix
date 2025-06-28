import "./Background.css";
import CursorLight from "./CursorLight/CursorLight";
import RandomLights from "./RandomLights/RandomLights";

const Background = () => {
  return (
    <div className="container_background">
      <div className="container_blur"></div>
      <div className="noises"></div>
      <RandomLights />
      <CursorLight />
    </div>
  );
};

export default Background;
