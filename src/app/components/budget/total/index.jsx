import Grid from '@mui/material/Grid';
import Price from '../price';
import styles from './style.module.css';

const Total = ({ value }) => (
  <Grid
    container
    direction="row"
    justifyContent="space-between"
    alignItems="flex-start"
    className={styles.total}
  >
    <span>Total</span>
    <Price value={value} />
  </Grid>
)

export default Total;