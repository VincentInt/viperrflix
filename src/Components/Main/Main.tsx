import Banner from "./Banner/Banner";
import CardList from "../../UI/CardList/CardList";
import PopularCategory from "./PopularCategory/PopularCategory";
import ShortCard from "../../UI/CardMovies/ShortCard/ShortCard";

const Main = () => {
  return (
    <>
      <Banner />
      <PopularCategory />
      <CardList>
        <ShortCard />
      </CardList>
    </>
  );
};

export default Main;
