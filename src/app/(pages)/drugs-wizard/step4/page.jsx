
'use client'
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Box, Grid, Typography } from "@mui/material";
import Button from "../../../components/button";
import { NavigateBefore } from '@mui/icons-material';
import { WizardContext } from "../context";
import Budget from "../../../components/budget";
import Footer from "../../../components/footer";

export default function DrugWizardStep4() {
  const { asaObj, drugObj, weightObj } = useContext(WizardContext);
  const [weightState, setWeightState] = weightObj;
  const [selectedAsa, setSelectedAsa] = asaObj;
  const [drugs, setDrugs] = drugObj;
  const router = useRouter();
  
  const goToStep1 = () => {
    setSelectedAsa();
    setDrugs([]);
    setWeightState();
    router.push('./step1')
  }

  return (
    <Box>
      <Typography
        sx={{ mb: 1 }}
        component="h2"
        variant="h5"
        color="text.primary"
      >
        Presupuesto
      </Typography>
      <Budget
        asa={selectedAsa}
        weight={weightState}
        drugs={drugs}
        disabled={!drugs.length}
      />
      <Footer>
        <Grid container columns={2} columnGap={{ xs: 1 }}>
          <Grid item={true} xs>
            <Button
              fullWidth={true}
              startIcon={<NavigateBefore />}
              variant="outlined"
              onClick={() => router.push('./step3')}
            >
              Volver
            </Button>
          </Grid>
          <Grid item={true} xs>
            <Button
              fullWidth={true}
              variant="contained"
              onClick={() => goToStep1()}
            >
              Nuevo
            </Button>
          </Grid>
        </Grid>
      </Footer>
    </Box>
  )
}