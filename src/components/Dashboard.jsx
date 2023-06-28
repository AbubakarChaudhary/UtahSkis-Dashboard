import React from "react";
import Table from "./Table";
import Card from "./Card";
import LatestNews from "./LatestNews";

const Content = (props) => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-3/4 pr-5">
          <h1 className="text-2xl font-bold mb-7 text-gray-800">
            {props.heading}
          </h1>
          <Card />
          <Table />
        </div>
        <div className="w-1/4  ">
          <h1 className="text-2xl font-bold mb-7 text-gray-800">Latest News</h1>
          <div className="bg-gray-50 p-5">
            <LatestNews />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
