import { useForm, FormProvider } from "react-hook-form"
import { WizardContext } from "./wizard-context";
import { useContext } from "react";
import DrugForm from "@/app/components/drug-form";
import { addDrugMl } from '../../utils/drugs';
import { Box, Button } from "@mui/material";



export default function DrugWizardStep2() {
    const {  drugObj, weightObj, stepObj } = useContext(WizardContext);
    const [weightState,] = weightObj;
    const [, setActiveStep] = stepObj;
    const [drugs, setDrugs] = drugObj;


    const drugForm = useForm({ mode: "onBlur" });


    const handleOnAdd = (drug) => {
        /* Check weight and calculate ml here with the weight */
        if (Number(weightState)) {
            const list = [addDrugMl(weightState, drug), ...drugs];
            setDrugs(list);
            return true;
        }

        // const { trigger } = mainForm;
        // trigger('weight');
        // return false;
    };

    return (
        <Box>
            <FormProvider {...drugForm}>
                <DrugForm handleOnAddDrug={handleOnAdd} selectedDrugs={drugs} />
            </FormProvider>

            <Box
            sx={{
                marginTop: 3,
                display: 'flex',
                justifyContent: 'flex-end' 

            }}
            >
            <Button sx={{marginX:1}} variant="contained" onClick={() => setActiveStep(0)} >
                Volver
            </Button>
            <Button variant="contained" onClick={() => setActiveStep(2)} >
                Siguiente
            </Button>
            </Box>

        </Box>
    )
}