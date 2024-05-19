import { Box } from "@mui/material";
import styles from './style.module.css';

const Footer = ({ children }) => {
  return (
    <footer className={styles.footer}>
      <Box sx={{ borderTop: 2, borderColor: 'primary.main', p: '0.5rem' }}>
        {children}
      </Box>
    </footer>
  );
};

export default Footer;