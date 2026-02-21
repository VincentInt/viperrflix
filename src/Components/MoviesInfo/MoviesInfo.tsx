import { useParams } from "react-router-dom";
import errorCardImg from "../../../public/img/izobr.-otsutst-scaled.jpg";
import RatingIndicator from "../../UI/RatingIndicator/RatingIndicator";
import type { OmdbResponse } from "../../utils/type/OmdbType";
import "./MoviesInfo.css";
import { useEffect, useState } from "react";
import { fetchOmdb } from "../../utils/fetch/fetchOmdb";
import { onLoadImg } from "../../utils/onLoadImg/onLoadImg";
import LoadIndicator from "../../UI/LoadIndicator/LoadIndicator";
import { fetchTraktItem } from "../../utils/fetch/fetchTrakt";
import type {
  TraktPeopleResponse,
  TraktResponse,
} from "../../utils/type/TraktType";
import { fetchTvmaze } from "../../utils/fetch/fetchTvmaze";

type StatusImg = "load" | "done" | "error";
type TvmazeType = {
  person: {
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    birthday: string;
    image: {
      medium: string;
      original: string;
    };
  };
};

const MoviesInfo = () => {
  const [dataCardTrakt, setdataCardTrakt] = useState<TraktResponse>();
  const [dataCardOmd, setDataCardOmd] = useState<OmdbResponse>();

  const [dataPeopleTrakt, setDataPeopleTrakt] = useState<TraktPeopleResponse>();
  const [dataPeopleTvmaze, setDataPeopleTvmaze] = useState<TvmazeType[]>([]);

  const [loadImg, setLoadImg] = useState<StatusImg>("load");

  const params = useParams<{ id: string; type: string }>();

  useEffect(() => {
    if (params.id?.length && params.type?.length) {
      fetchTraktItem<TraktResponse>(
        `${params.type}/${params.id}`,
        (json: TraktResponse) => {
          setdataCardTrakt(json);
        },
      );
      fetchTraktItem<TraktPeopleResponse>(
        `${params.type}/${params.id}/people`,
        (json: TraktPeopleResponse) => {
          setDataPeopleTrakt(json);
        },
      );
    }
  }, [params]);

  useEffect(() => {
    if (dataCardTrakt) {
      fetchOmdb<OmdbResponse>(
        `&i=${dataCardTrakt.ids.imdb}`,
        (json: OmdbResponse) => {
          setDataCardOmd(json);
        },
      );
    }
  }, [dataCardTrakt]);

  useEffect(() => {
    const array: TvmazeType[] = [];

    dataPeopleTrakt?.cast.forEach((item) => {
      fetchTvmaze<TvmazeType>(
        `search/people?q=${item.person.name}`,
        (json: TvmazeType[]) => {
          if (json[0]?.person?.image?.original) {
            array.push(json[0]);
          }
        },
      );
    });

    setDataPeopleTvmaze(array);
  }, [dataPeopleTrakt]);

  useEffect(() => {
    if (dataCardOmd !== undefined) {
      onLoadImg(
        (status) => setLoadImg(() => (status ? "done" : "error")),
        dataCardOmd.Poster,
      );
    }
  }, [dataCardOmd]);
  return (
    <section className="section_movies_info">
      {dataCardOmd ? (
         (
          <div className="main_container_info">
            {loadImg === "load" ? <LoadIndicator /> : ""}
            {loadImg === "done" ? (
              <img
                className="img_poster"
                src={dataCardOmd.Poster}
                alt="card_img"
              />
            ) : (
              ""
            )}
            {loadImg === "error" ? (
              <img
                className="img_poster"
                src={errorCardImg}
                alt="error_card_img"
              />
            ) : (
              ""
            )}
            <div className="container_info">
              <h1 className="title">{`${dataCardOmd.Title} (${dataCardOmd.Year})`}</h1>
              <div className="container_flex_info">
                <RatingIndicator item={dataCardOmd} />
                <h5>{dataCardOmd.Language}</h5>
                <h5>{dataCardOmd.Runtime}</h5>
              </div>
              <div className="container_text_info">
                <h5>About the movie:</h5>
                <h5>Rated: +{dataCardOmd.Rated}</h5>
                <h5>Released: {dataCardOmd.Released}</h5>
                <h5>Country: {dataCardOmd.Country}</h5>
                <h5>Genre: {dataCardOmd.Genre}</h5>
                <h5>Director: {dataCardOmd.Director}</h5>
                <h5>Writer: {dataCardOmd.Writer}</h5>
                <h5>BoxOffice: {dataCardOmd.BoxOffice}</h5>{" "}
                <h5 className="title_actors">Actors: {dataCardOmd.Actors}</h5>
                {dataPeopleTvmaze.length ? (
                  <div className="container_actors">
                    {dataPeopleTvmaze?.map((item: TvmazeType, index: number) => {
                      return (
                        <div key={index} className="actors_card">
                          <img
                            src={item?.person?.image?.original}
                            alt="actors_img"
                          />
                          <h5>{item.person.name}</h5>
                          <h6>{item.person.country?.timezone}</h6>
                          <h6>{item.person.birthday}</h6>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
                <p>{dataCardOmd.Plot}</p>
              </div>
            </div>
          </div>
        )
      
      ) : (
        <div className="main_container_info_loading">
          <div className="img_poster">
            <div className="glow"></div>
          </div>
          <div className="container_info">
            <div className="title">
              <div className="glow"></div>
            </div>
            <div className="container_flex_info">
              <div className="main_info">
                <div className="glow"></div>
              </div>
            </div>
            <div className="container_text_info">
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              <div>
                <div className="glow"></div>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MoviesInfo;
