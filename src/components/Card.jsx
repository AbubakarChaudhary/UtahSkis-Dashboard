import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faGift,
  faEarthAmericas,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

function Card() {
  const cardsData = [
    { heading: 23, icon: faBolt, color: "blue" },
    { heading: 33, icon: faGift, color: "orange" },
    { heading: 43, icon: faEarthAmericas, color: "green" },
    { heading: 53, icon: faUserPlus, color: "purple" },
  ];

  return (
    <>
      <div className="flex flex-wrap justify-between">
        {cardsData.map((data, id) => {
          return (
            <div
              className="border-2 border-black-500 w-64 shadow p-3 mb-3"
              key={id}
            >
              <div className="flex justify-between items-center">
                <h2
                  className="font-bold text-3xl"
                  style={{ color: data.color }}
                >
                  {data.heading}
                </h2>
                <FontAwesomeIcon
                  className="text-xl"
                  icon={data.icon}
                  style={{ color: data.color }}
                />
              </div>
              <div className="text-sm mt-6">
                <p>Items</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Card;
