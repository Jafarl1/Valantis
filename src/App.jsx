import { useState, useEffect, useCallback } from "react";
import { chunkArray, fetchData } from "./utils";

import Loader from "./components/Loader/Loader";
import ProductsList from "./components/ProductsList/ProductsList";
import Pagination from "./components/Pagination/Pagination";
import Header from "./components/Header/Header";

function App() {
  const [ids, setIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentItems, setCurrentItems] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getIds = async () => {
      const ids = await fetchData("get_ids", { offset: 0 });
      const uniqueIds = [...new Set(ids)];

      setIds(chunkArray(uniqueIds, 50));
      setTotalPages(Math.ceil(uniqueIds.length / 50));
    };
    getIds();
  }, []);

  const getCurrentPageItems = useCallback(async () => {
    setLoading(true);
    const items = await fetchData("get_items", { ids: ids[currentPage - 1] });
    let filteredItems;
    if (items) {
      filteredItems = items.filter(
        (obj, index, self) => self.findIndex((o) => o.id === obj.id) === index
      );
    }
    setCurrentItems(filteredItems);
  }, [ids, currentPage]);

  useEffect(() => {
    getCurrentPageItems();
  }, [getCurrentPageItems]);

  useEffect(() => {
    if (currentItems && currentItems.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [currentItems]);

  return (
    <div className="app">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <ProductsList data={currentItems} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default App;
