import React from "react";
import AdvertisedItems from "../AdvertisedItems/AdvertisedItems";
import HomePageBanner from "../HomePageBanner/HomePageBanner";
import MobileCategories from "../MobileCategories/MobileCategories";

const Home = () => {
  return (
    <div>
      <HomePageBanner></HomePageBanner>
      <MobileCategories></MobileCategories>
      <AdvertisedItems></AdvertisedItems>
    </div>
  );
};

export default Home;
