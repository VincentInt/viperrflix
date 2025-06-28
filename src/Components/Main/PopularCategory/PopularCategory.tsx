import "./PopularCategory.css";

const URL_IMG_Plug =
  "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/m0SbwFNCa9epW1X60deLqTHiP7x.jpg";

const PopularCategory = () => {
  return (
    <section className="section_popular_category">
      <div className="container_card_popular_category">
        {[...Array(4)].map((_: unknown, index: number) => {
          return (
            <div key={index} className="card_popular_category">
              <div className="vintage"></div>
              <img src={URL_IMG_Plug} alt="popular_category_img" />
              <h4 className="text_card">3D ANIMATION</h4>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PopularCategory;
