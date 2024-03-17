import { WizardContext } from "./wizard-context";
import { useContext } from "react";
import { Box, Button } from "@mui/material";
import Budget from "@/app/components/budget";


export default function DrugWizardStep4() {
    const { asaObj, drugObj, weightObj, stepObj } = useContext(WizardContext);
    const [weightState, setWeightState] = weightObj;
    const [selectedAsa, setSelectedAsa] = asaObj;
    const [activeStep, setActiveStep] = stepObj;
    const [drugs, setDrugs] = drugObj;


    return (
        <Box>
            <Budget
                asa={selectedAsa}
                weight={weightState}
                drugs={drugs}
                disabled={!drugs.length}
            />
            <Box
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    justifyContent: 'flex-end' 

                }}
            >
                <Button sx={{ marginX: 1 }} variant="contained" onClick={() => setActiveStep(1)} >
                    Volver
                </Button>
            </Box>
        </Box>
    )
}