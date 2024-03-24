import styles from "./style.module.css";

const Price = ({ value }) => (
  <span className={styles.price}>$ {value.toFixed(2)}</span>
);

export default Price;
