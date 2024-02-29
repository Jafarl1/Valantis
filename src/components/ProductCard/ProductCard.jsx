/* eslint-disable react/prop-types */
import icon from "../../assets/icons/product-icon.png";
import styles from "./productCard.module.css";

function ProductCard({ item }) {
  return (
    <li className={styles.productCard}>
      <div className={styles.itemIcon}>
        <img src={icon} alt={item.product} />
      </div>
      <p>{item.brand} </p>
      <p>{item.product}</p>
      <p>Цена: {item.price}$</p>
      <p>{item.id}</p>
    </li>
  );
}

export default ProductCard;
