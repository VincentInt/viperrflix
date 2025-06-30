import "./LoadingContentBanner.css";

const LoadingContentBanner = () => {
  return (
    <div className="container_info_page_load">
      <div className="info_page">
        <div className="loading load_title">
          <div className="glow"></div>
        </div>
        <div className="loading load_container_info">
          <div className="glow"></div>
        </div>
        <div className="loading load_p_text_description">
          <div className="glow"></div>
        </div>
      </div>
      <div className="container_btn info_source_btn">
        <div className="loading load_btn">
          <div className="glow"></div>
        </div>
        <div className="loading load_btn">
          <div className="glow"></div>
        </div>

        <div className="loading load_small_btn">
          <div className="glow"></div>
        </div>
        <div className="loading load_small_btn">
          <div className="glow"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingContentBanner;
