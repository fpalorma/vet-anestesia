import { useEffect, useRef, useState } from 'react';
import { jsPDF } from "jspdf";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { lightBlue } from '@mui/material/colors';
import BudgetItem from './budget-item';
import Price from './price';
import Total from './total';
import { getBudget } from '../../utils/drugs';
import styles from './style.module.css';

const AsaSecondaryText = ({ value }) => (
  <span className={styles.asa}>{value}</span>
);

const Budget = ({ asa, drugs = [], disabled, weight}) => {
  const [budget, setBudget] = useState(0);
  const ref = useRef(null);

  const handleOnQuote = () => {
    const total = getBudget(asa, weight, drugs);
    setBudget(total);
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    const { current } = ref;

    const actualDate = ()=>{
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      return day + "/" + (month+1) + "/" + year
    }
    

    doc.html(current, {
      callback: function (doc) {
        doc.save(`Presupuesto ${actualDate()}.pdf`); 
      },
      margin: [0, 30, 0, 30],
      width: 150,
      windowWidth: current.clientWidth
    });
  };

  /* This hides the budget if user changes the list of drugs or the asa */
  useEffect(() => {
    setBudget(0);
  },[asa, drugs]);

  return (
    <>
      <Button
        fullWidth 
        variant="contained"
        onClick={handleOnQuote}
        startIcon={<ReceiptOutlinedIcon />}
        disabled={disabled}
      >
        Presupuestar
      </Button>
      
      <Button
        fullWidth 
        variant="contained"
        onClick={exportPdf}
        startIcon={<DownloadIcon />}
        disabled={!budget}
        className={styles.marginBtn}
      >
        Exportar
      </Button>
      {
        !!budget && <Box sx={{ mt: 2 }} ref={ref}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: 'primary.main' }}>
            
            <Box className={styles.title}>Presupuesto</Box>
            <List dense={true}>
              {
                !!asa && <ListItem sx={{ color: lightBlue[100], fontWeight: 'medium' }}>
                  <ListItemText
                    primary={asa.label}
                    secondary={<AsaSecondaryText value={asa.description} />}
                  />
                  <Price value={asa.price} />
                </ListItem>
              }
              { 
                drugs.map((drug) => (<BudgetItem key={drug.id} drug={drug} weight={weight} />)
              )}
              <Divider component="li" variant="middle" className={styles.divider} />
            </List>
            <Total value={budget} />
          </Paper>
        </Box>
      }
    </>
  )
};

export default Budget;