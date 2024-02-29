/* eslint-disable react/prop-types */
import PageNavigation from "../PageNavigation/PageNavigation";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./productsList.module.css";

const ProductsList = ({ data }) => {
  return (
    <>
      <ul className={styles.productsList}>
        {data ? (
          data.map((item) => <ProductCard key={item.id} item={item} />)
        ) : (
          <p>There are no products available.</p>
        )}
      </ul>
      <PageNavigation />
    </>
  );
};

export default ProductsList;
