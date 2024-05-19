
'use client'
import { WizardContext } from "../context";
import { useContext } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import Budget from "../../../components/budget";
import { useRouter } from "next/navigation";
import Footer from "../../../components/footer";
import { NavigateBefore } from "@mui/icons-material";

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
      <Budget
        asa={selectedAsa}
        weight={weightState}
        drugs={drugs}
        disabled={!drugs.length}
      />
      <Footer>
        <ButtonGroup fullWidth={true}>
          <Button
            sx={{ marginX: 1 }}
            startIcon={<NavigateBefore />}
            variant="outlined"
            onClick={() => router.push('./step3')}
          >
            Volver
          </Button>
          <Button
            sx={{ marginX: 1 }}
            variant="contained"
            onClick={() => goToStep1()}
          >
            Nuevo
          </Button>
        </ButtonGroup>
      </Footer>
    </Box>
  )
}