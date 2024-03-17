import { WizardContext } from "./wizard-context";
import { useContext } from "react";
import { Box, Button } from "@mui/material";
import DrugList from "@/app/components/drug-list";


export default function DrugWizardStep3() {
    const {drugObj , stepObj } = useContext(WizardContext);
    const [activeStep, setActiveStep] = stepObj;
    const [drugs, setDrugs] = drugObj;


    
    const handleOnDelete = (id) => {
        const list = drugs.filter(row => row.id !== id);
        setDrugs(list);
      };



    return (
        <Box>
      <DrugList list={drugs} handleOnDelete={handleOnDelete} />

      <Box
            sx={{
                marginTop: 3,
                display: 'flex',
                justifyContent: 'flex-end' 

            }}
            >
            <Button sx={{marginX:1}} variant="contained" onClick={() => setActiveStep(1)} >
                Volver
            </Button>
            <Button variant="contained" onClick={() => setActiveStep(3)} >
                Ver presupuesto
            </Button>
            </Box>
        </Box>
    )
}