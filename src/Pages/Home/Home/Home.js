import React from "react";
import AdvertisedItems from "../AdvertisedItems/AdvertisedItems";
import HomeDelivery from "../HomeDelivery/HomeDelivery";
import HomePageBanner from "../HomePageBanner/HomePageBanner";
import MobileCategories from "../MobileCategories/MobileCategories";

const Home = () => {
  return (
    <div>
      <HomePageBanner></HomePageBanner>
      <MobileCategories></MobileCategories>
      <AdvertisedItems></AdvertisedItems>
      <HomeDelivery></HomeDelivery>
    </div>
  );
};

export default Home;
