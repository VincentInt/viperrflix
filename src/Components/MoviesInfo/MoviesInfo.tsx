import { useParams } from "react-router-dom";
import RatingIndicator from "../../UI/RatingIndicator/RatingIndicator";
import type { OmdbResponse } from "../../utils/type/OmdbType";
import "./MoviesInfo.css";
import { useEffect, useState } from "react";
import { fetchOmdb } from "../../utils/fetch/fetchOmdb";

const MoviesInfo = () => {
  const [dataMovies, setDataMovies] = useState<OmdbResponse>();
  const params = useParams<{ id: string; type: string }>();

  useEffect(() => {
    if (params.id?.length && params.type?.length) {
      fetchOmdb<OmdbResponse>(`&i=${params.id}`, (json: OmdbResponse) => {
        setDataMovies(json);
      });
    }
  }, [params]);
  return (
    <section className="section_movies_info">
      {dataMovies ? (
        <div className="main_container_info">
          <img
            className="img_poster"
            src={dataMovies.Poster}
            alt="poster_img"
          />
          <div className="container_info">
            <h1 className="title">{`${dataMovies.Title} (${dataMovies.Year})`}</h1>
            <div className="container_flex_info">
              <RatingIndicator item={dataMovies} />
              <h5>{dataMovies.Language}</h5>
              <h5>{dataMovies.Runtime}</h5>
            </div>
            <div className="container_text_info">
              <h5>About the movie:</h5>
              <h5>Rated: +{dataMovies.Rated}</h5>
              <h5>Released: {dataMovies.Released}</h5>
              <h5>Country: {dataMovies.Country}</h5>
              <h5>Genre: {dataMovies.Genre}</h5>
              <h5>Director: {dataMovies.Director}</h5>
              <h5>Writer: {dataMovies.Writer}</h5>
              <h5>Actors: {dataMovies.Actors}</h5>
              <h5>BoxOffice: {dataMovies.BoxOffice}</h5>
              <p>{dataMovies.Plot}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default MoviesInfo;
