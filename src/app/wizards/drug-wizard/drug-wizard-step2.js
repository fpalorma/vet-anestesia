import { useEffect, useRef, useState } from 'react';
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
import BudgetItem from '../../components/budget/budget-item';
import Price from '../../components/budget/price';
import Total from '../../components/budget/total';
import { getBudget } from '../../utils/drugs';
import { actualDate } from '../../utils/date';
import styles from '../../components/budget/style.module.css';

const AsaSecondaryText = ({ value }) => (
  <span className={styles.asa}>{value}</span>
);

export default function DrugWizardStep2({handleNextStep,handlePrevStep,drugs,asa,weight}) {

  const [budget, setBudget] = useState(0);
  const ref = useRef(null);
  
  const handleOnQuote = () => {
    const total = getBudget(asa, weight, drugs);
    setBudget(total);
  };

    useEffect(() => {
      handleOnQuote();
    },);


  
    return (
    <div>
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
      <Button
        sx={{ marginTop:1 }}
        fullWidth 
        variant="contained"
        onClick={handlePrevStep}
      >
        volver
      </Button>
      <Button
        sx={{ marginTop:1 }}
        fullWidth 
        variant="contained"
        onClick={handleNextStep}
      >
        Presupuesto
      </Button>
    </div>
  )
}
