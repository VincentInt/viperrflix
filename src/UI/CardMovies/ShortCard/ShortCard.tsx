import "./ShortCard.css";

const URL_IMG_PUCK =
  "https://image.tmdb.org/t/p/w300_and_h450_bestv2/imKSymKBK7o73sajciEmndJoVkR.jpg";

function colorRating(rating: number) {
  if (rating > 5) {
    let firstColor = 225 - (rating - 5) * 45;
    return `${firstColor}, ${225}`;
  } else {
    let lastColor = 225 + (rating - 5) * 45;
    return `${225}, ${lastColor}`;
  }
}
const ShortCard = ({ ...props }: any) => {
  const rating = 1.5;

  return (
    <div {...props} className="card">
      <div
        style={{
          backgroundColor: `rgb(${colorRating(rating)}, 0, 0.7)`,
        }}
        className="container_rating"
      >
        <h6 className="text_rating">{rating}</h6>
      </div>
      <div className="container_img">
        <img src={URL_IMG_PUCK} alt="card_img" />
      </div>
      <div className="container_text">
        <h4 className="text_name">Flow</h4>
        <div className="container_flex_text">
          <h5>2025</h5>
          <h5>Фэнтази</h5>
        </div>
      </div>
    </div>
  );
};

export default ShortCard;
