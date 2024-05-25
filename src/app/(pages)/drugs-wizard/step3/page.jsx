'use client'
import { WizardContext } from "../context";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Grid, Box, Button, Typography } from "@mui/material";
import { NavigateBefore } from '@mui/icons-material';
import DrugList from "../../../components/drug-list";
import Footer from '../../../components/footer';

export default function DrugWizardStep3() {
  const { drugObj } = useContext(WizardContext);
  const [drugs, setDrugs] = drugObj;

  const router = useRouter();

  const handleOnDelete = (id) => {
    const list = drugs.filter(row => row.id !== id);
    setDrugs(list);

    /* If there is no more drugs, go back to step 2 */
    if (!list.length) {
      router.push('./step2');
    }
  };




  return (
    <Box>
      <Typography
        sx={{ mb: 1 }}
        component="h2"
        variant="h5"
        color="text.primary"
      >
        Lista de drogas
      </Typography>
      <DrugList list={drugs} handleOnDelete={handleOnDelete} />
      <Footer>
        <Grid container columns={2} columnGap={{ xs: 1 }}>
          <Grid item={true} xs>
            <Button
              fullWidth={true}
              startIcon={<NavigateBefore />}
              variant="outlined" 
              onClick={() => router.push('step2')}
            >
              Volver
            </Button>
          </Grid>
          <Grid item={true} xs>
            <Button
              fullWidth={true}
              variant="contained" 
              onClick={() => router.push('./step4')}
              
              autoFocus = {true}
              
            >
              Presupuestar
            </Button>
          </Grid>
        </Grid>
      </Footer>
    </Box>
  )
}