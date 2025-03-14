import MostViewed from "../../components/LandingPage/MostViewed";
import ItemSort from "../../components/ItemSort/SearchFilterBar";
import Library from "../../components/LandingPage/Library";

export default function Home() {
  return (
    <>
      <MostViewed />
      <ItemSort />
      <Library />
    </>
  );
}
