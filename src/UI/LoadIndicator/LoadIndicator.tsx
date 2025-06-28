import "./LoadIndicator.css";

const LoadIndicator = () => {
  return (
    <div className="container_load_indicator">
      <div className="ball">
        <div className="intersection_ball"></div>
        <div className="intersection_line"></div>
      </div>
    </div>
  );
};

export default LoadIndicator;
