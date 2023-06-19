import React from "react";
import Table from "./Table";
import Card from "./Card";

const Content = (props) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-7 text-gray-800">{props.heading}</h1>
      <Card />
      <Table />
    </>
  );
};

export default Content;
