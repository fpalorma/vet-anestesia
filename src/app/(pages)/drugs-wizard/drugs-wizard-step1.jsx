import { useForm, FormProvider } from "react-hook-form"
import { useContext } from "react";
import { WizardContext } from "./wizard-context";
import MainForm from "@/app/components/main-form";
import { Box, Button } from "@mui/material";
import asas from "../../constants/asas.json";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function DrugWizardStep1() {
    const mainForm = useForm({ mode: "onBlur" });
    const { getValues, formState: { isDirty, isValid, errors }, watch, reset, handleSubmit, control } = mainForm;

    const { asaObj, drugObj, weightObj, stepObj } = useContext(WizardContext);
    const [, setWeightState] = weightObj;
    const [selectedAsa, setSelectedAsa] = asaObj;
    const [, setActiveStep] = stepObj;
    const [drugs,] = drugObj;

    const { weight } = watch();
    setWeightState(weight)
    const { asa } = watch();
    const filteredSelectedAsa = asas.find(a => a.id === asa);
    setSelectedAsa(filteredSelectedAsa);


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
                <Button 
                startIcon={<NavigateNextIcon />}
                variant="contained" onClick={handleSubmit(() => setActiveStep(1))} >
                    Siguiente
                </Button>
            </Box>
        </>
    )
}