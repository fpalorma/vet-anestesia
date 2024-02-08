import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
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

const Budget = ({ asa, drugs = [], disabled, weight }) => {
  const [budget, setBudget] = useState(0);

  const handleOnQuote = () => {
    const total = getBudget(asa, weight, drugs);
    setBudget(total);
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
      {
        !!budget && <Box sx={{ mt: 2 }}>
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