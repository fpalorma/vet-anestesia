'use client'

import { useForm, FormProvider } from "react-hook-form"
import { useContext } from "react";
import { WizardContext } from "../wizard-context";
import MainForm from "@/app/components/main-form";
import { Box, Button } from "@mui/material";
import asas from "../../../constants/asas.json";
import { useRouter } from "next/navigation";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function DrugWizardStep1() {
    const mainForm = useForm({ mode: "onBlur" });
    const { watch, handleSubmit } = mainForm;

    const { asaObj, weightObj,drugObj } = useContext(WizardContext);
    const [, setWeightState] = weightObj;
    const [selectedAsa, setSelectedAsa] = asaObj;
    const [drugs] = drugObj;

    const router = useRouter()

    const { weight } = watch();

    // if(drugs.length > 0){
    //     alert("drugs tiener dro")
    // }
    setWeightState(weight)
    
    
    const { asa } = watch();
    const filteredSelectedAsa = asas.find(a => a.id === asa);
    setSelectedAsa(filteredSelectedAsa);


    return (
        <>
            <FormProvider {...mainForm}>
                <MainForm asa={selectedAsa} disableWeight={false} />
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
                    variant="contained" onClick={handleSubmit(() => router.push('./step2'))} >
                    Siguiente
                </Button>
            </Box>
        </>
    )
}