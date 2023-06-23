import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faGift,
  faEarthAmericas,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const SkeletonCard = () => (
  <div className="border-2 border-black-500 w-64 shadow p-3 mb-3 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="h-10 w-10 rounded-full bg-gray-300"></div>
      <div className="h-5 w-5 rounded-full bg-gray-500"></div>
    </div>
    <div className="text-sm mt-6">
      <div className="h-4 w-16 rounded bg-gray-300"></div>
    </div>
  </div>
);

function Card() {
  const [isLoading, setIsLoading] = useState(true);
  const cardsData = [
    { heading: 23, icon: faBolt, color: "blue" },
    { heading: 33, icon: faGift, color: "orange" },
    { heading: 43, icon: faEarthAmericas, color: "green" },
    { heading: 53, icon: faUserPlus, color: "purple" },
  ];

  useEffect(() => {
    // Simulating loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-between">
        {isLoading
          ? Array.from({ length: 4 }).map((_, id) => <SkeletonCard key={id} />)
          : cardsData.map((data, id) => (
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
            ))}
      </div>
    </>
  );
}

export default Card;
