import { RingLoader } from "react-spinners";
import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <RingLoader color="#4c1111" size={80} />
      Loading . . .
    </div>
  );
}
