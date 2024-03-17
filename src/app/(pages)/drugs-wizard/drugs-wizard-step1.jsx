import { useForm, FormProvider } from "react-hook-form"
import { useContext } from "react";
import { WizardContext } from "./wizard-context";
import MainForm from "@/app/components/main-form";
import { Box, Button } from "@mui/material";
import asas from "../../constants/asas.json";

export default function DrugWizardStep1() {
    const mainForm = useForm({ mode: "onBlur" });
    const { watch ,handleSubmit } = mainForm;

    const { asaObj, drugObj, weightObj, stepObj } = useContext(WizardContext);
    const [, setWeightState] = weightObj;
    const [selectedAsa, setSelectedAsa] = asaObj;
    const [activeStep, setActiveStep] = stepObj;
    const [drugs, setDrugs] = drugObj;

    const { weight } = watch();
    setWeightState(weight)
    const { asa } = watch();
    const filteredSelectedAsa = asas.find(a => a.id === asa);
    setSelectedAsa(filteredSelectedAsa);


    function checkBeforeNext(){
        alert('pass')
    }

    return (
        <>
            <FormProvider {...mainForm}>
                <MainForm asa={selectedAsa} disableWeight={!!drugs.length} />
            </FormProvider>
            <Box
            sx={{
                marginTop: 3,
                display: 'flex',
                justifyContent: 'flex-end' 

            }}
            >
            <Button variant="contained" onClick={() => setActiveStep(1)} >
                Siguiente
            </Button>
            <Button variant="contained" onClick={() => handleSubmit(checkBeforeNext())} >
                Siguientex
            </Button>
            </Box>
        </>
    )
}