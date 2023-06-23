import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Skeleton = () => (
  <tr>
    <td className="py-3 px-3">
      <div className="px-3 py-3  rounded-full animate-pulse bg-gray-400"></div>
    </td>
    <td className="py-3 px-3">
      <div className="px-3 py-3  rounded-full animate-pulse bg-gray-200"></div>
    </td>
    <td className="py-3 px-3">
      <div className="px-3 py-3  rounded-full animate-pulse bg-gray-400"></div>
    </td>
    <td className="py-3 px-3">
      <div className="px-3 py-3  rounded-full animate-pulse bg-gray-200"></div>
    </td>
  </tr>
);

const Table = () => {
  const itemsPerPage = 10; // Number of items/rows to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://6471f1e36a9370d5a41adaa8.mockapi.io/drivetable"
      );
      const totalItems = response.data;
      const totalPages = Math.ceil(totalItems.length / itemsPerPage);
      setTotalPages(totalPages);
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = totalItems.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(currentItems);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-4 border-b text-left bg-gray-100">ID</th>
                <th className="px-6 py-4 border-b text-left bg-gray-100">
                  Vendor
                </th>
                <th className="px-6 py-4 border-b text-left bg-gray-100">
                  Truck Name
                </th>
                <th className="px-6 py-4 border-b text-left bg-gray-100">
                  Campaign
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </>
              ) : (
                currentItems.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4 border-b">{row.id}</td>
                    <td className="px-6 py-4 border-b">{row.Vendor}</td>
                    <td className="px-6 py-4 border-b">{row.TruckName}</td>
                    <td className="px-6 py-4 border-b">{row.Campaign}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
