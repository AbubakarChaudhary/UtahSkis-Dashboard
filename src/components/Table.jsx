import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Skeleton = () => (
  <tr>
    <td className="py-3 px-3">
      <div className="px-3 py-3 rounded-full animate-pulse bg-gray-400"></div>
    </td>
    <td className="py-3 px-3">
      <div className="px-3 py-3 rounded-full animate-pulse bg-gray-200"></div>
    </td>
    <td className="py-3 px-3">
      <div className="px-3 py-3 rounded-full animate-pulse bg-gray-400"></div>
    </td>
    <td className="py-3 px-3">
      <div className="px-3 py-3 rounded-full animate-pulse bg-gray-200"></div>
    </td>
  </tr>
);

const Table = () => {
  const itemsPerPage = 10; // Number of items/rows to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://6471f1e36a9370d5a41adaa8.mockapi.io/drivetable"
      );
      const totalItems = response.data;
      const filteredItems = totalItems.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
      setTotalPages(totalPages);
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredItems.slice(
        indexOfFirstItem,
        indexOfLastItem
      );
      setCurrentItems(currentItems);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="mx-auto py-8">
        <div className="text-right">
          <select
            name=""
            id=""
            className="bg-gray-200 text-black py-2 px-4  mb-3 mx-3"
          >
            <option value="">Select Category</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by vendor..."
            className="p-2 border border-gray-300 rounded mb-3"
          />
        </div>
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
        </div>
        {/* Pagination */}
        <div className="pagination">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>

          <p className="m-2">{currentPage}</p>

          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
