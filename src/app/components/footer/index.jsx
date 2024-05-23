import { Box } from "@mui/material";
import styles from './style.module.css';

const Footer = ({ children }) => {
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <Box sx={{ borderTop: 2, borderColor: 'primary.main', p: '0.5rem' }}>
          {children}
        </Box>
      </footer>
    </div>
  );
};

export default Footer;