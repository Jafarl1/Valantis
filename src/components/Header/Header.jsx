/* eslint-disable react/prop-types */
import { useState } from "react";
import { fetchData } from "../../utils";
import Modal from "../Modal/Modal";
import searchIcon from "../../assets/icons/seacrh-icon.png";
import styles from "./header.module.css";

function Header() {
  const [searchFor, setSearchFor] = useState("name");
  const [inputData, setInputData] = useState("");
  const [modal, setModal] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchFor = (e) => {
    setSearchFor(e.target.value);
  };

  const handleSearchInput = (e) => {
    setInputData(e.target.value);
  };

  const startTheSearch = async () => {
    setLoading(true);
    setModal(true);

    const params = {
      [searchFor]: isNaN(+inputData) ? inputData : +inputData,
    };

    const filteredIds = await fetchData("filter", params);
    const filtered = await fetchData("get_items", { ids: filteredIds });

    if (filtered && filtered.length > 0) {
      setFilteredItems(filtered);
    } else {
      setFilteredItems(null);
    }
    setLoading(false);
  };

  return (
    <>
      <header className={styles.header}>
        <h1> Products </h1>
        <div className={styles.searchBar}>
          <select name="searchFor" id="searchFor" onChange={handleSearchFor}>
            <option value="product"> Product </option>
            <option value="price"> Price </option>
            <option value="brand"> Brand </option>
          </select>
          <input type="text" onChange={handleSearchInput} />
          <button onClick={startTheSearch}>
            <img src={searchIcon} alt="Search button" />
          </button>
        </div>
      </header>
      <Modal
        modal={modal}
        setModal={setModal}
        filteredItems={filteredItems}
        loading={loading}
      />
    </>
  );
}

export default Header;
