/* eslint-disable react/prop-types */
import styles from "./pagination.module.css";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  function switchToPrevPage() {
    if (currentPage > 1) {
      setCurrentPage((current) => current - 1);
    }
  }

  function switchToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((current) => current + 1);
    }
  }

  return (
    <ul className={styles.pagination}>
      <li onClick={switchToPrevPage}>
        <i className="fa-solid fa-chevron-left"></i>
      </li>
      <span>{currentPage}</span>
      <li onClick={switchToNextPage}>
        <i className="fa-solid fa-chevron-right"></i>
      </li>
    </ul>
  );
};

export default Pagination;
