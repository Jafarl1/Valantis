import arrowIcon from "../../assets/icons/arrow-icon.png";
import styles from "./pageNavigation.module.css";

function PageNavigation() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.pageNavigators}>
      <button style={{ transform: "rotate(180deg)" }} onClick={scrollToTop}>
        <img src={arrowIcon} alt="up" />
      </button>
      <button onClick={scrollToDown}>
        <img src={arrowIcon} alt="down" />
      </button>
    </div>
  );
}

export default PageNavigation;
