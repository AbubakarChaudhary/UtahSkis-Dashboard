import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

function LatestNews() {
  const [newsItems, setNewsItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&pageSize=8&apiKey=c6c9f6f4564a4a768aa040e7914da92c"
      );
      const { articles } = response.data;
      setNewsItems(articles);
      console.log(articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {newsItems.length === 0 ? (
        <p>Loading...</p>
      ) : (
        newsItems.map((item) => (
          <div className="flex mb-5" key={item.id}>
            <FontAwesomeIcon
              icon={faNewspaper}
              className="text-2xl mr-3 mt-1"
              style={{ color: "#24c243" }}
            />
            <p>
              <a
                rel="noreferrer"
                href={item.url}
                target="_blank"
                className="hover:underline"
              >
                {item.title}
              </a>
            </p>
          </div>
        ))
      )}
    </>
  );
}

export default LatestNews;
