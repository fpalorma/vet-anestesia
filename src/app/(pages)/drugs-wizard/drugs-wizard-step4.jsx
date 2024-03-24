import { WizardContext } from "./wizard-context";
import { useContext } from "react";
import { Box, Button } from "@mui/material";
import Budget from "@/app/components/budget";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';


export default function DrugWizardStep4() {
    const { asaObj, drugObj, weightObj, stepObj } = useContext(WizardContext);
    const [weightState, setWeightState] = weightObj;
    const [selectedAsa, setSelectedAsa] = asaObj;
    const [, setActiveStep] = stepObj;
    const [drugs, setDrugs] = drugObj;

    const limpiar = () => {
        setSelectedAsa();
        setDrugs([]);
        setWeightState();
        setActiveStep(0)
    }

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
                <Button
                    startIcon={<CleaningServicesIcon />}
                    sx={{ marginX: 1 }}
                    color="error"
                    variant="contained" onClick={() => limpiar()} >
                    Limpiar
                </Button>
                <Button sx={{ marginX: 1 }} variant="contained" onClick={() => setActiveStep(1)} >
                    Volver
                </Button>
            </Box>
        </Box>
    )
}