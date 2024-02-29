/* eslint-disable react/prop-types */
import { memo } from "react";
import ProductCard from "../ProductCard/ProductCard";
import closeIcon from "../../assets/icons/close-icon.png";
import notFound from "../../assets/icons/not-found-icon.png";
import Loader from "../Loader/Loader";
import styles from "./modal.module.css";

const Modal = memo(({ modal, setModal, filteredItems, loading }) => {
  const closeModal = () => {
    setModal(false);
  };

  return (
    <div
      className={
        modal ? `${styles.itemsModal} ${styles.showModal}` : styles.itemsModal
      }
    >
      <div className={styles.modalHeader}>
        <p>Products according to your request</p>
        <button onClick={closeModal}>
          <img src={closeIcon} alt="Close modal" />
        </button>
      </div>
      <div className={styles.modalBody}>
        {loading ? (
          <Loader />
        ) : filteredItems ? (
          filteredItems.map((item) => <ProductCard key={item.id} item={item} />)
        ) : (
          <p className={styles.notFound}>
            <img src={notFound} alt="Not Found" />
            Unfortunately, there are no products according to the search data.
          </p>
        )}
      </div>
    </div>
  );
});

Modal.displayName = "Modal";

export default Modal;
