'use client'
import { useForm, FormProvider } from "react-hook-form"
import { WizardContext } from "../wizard-context";
import { useContext } from "react";
import DrugForm from "@/app/components/drug-form";
import { addDrugMl } from '../../../utils/drugs';
import { Box, Button } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Badge from '@mui/material/Badge';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useRouter } from "next/navigation";


export default function DrugWizardStep2() {
    const { drugObj, weightObj } = useContext(WizardContext);
    const [weightState,] = weightObj;
    const [drugs, setDrugs] = drugObj;
    const router = useRouter();

    const drugForm = useForm({ mode: "onBlur" });
    const { handleSubmit, formState } = drugForm;

    const checkBeforeNextPage = () => {
        router.push('./step3')
    }

    const handleOnAdd = (drug) => {
        /* Check weight and calculate ml here with the weight */
        if (Number(weightState)) {
            const list = [addDrugMl(weightState, drug), ...drugs];
            setDrugs(list);
            return true;
        }

    };

    return (
        <Box>
            <Box
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                {drugs.length !== 0 && (<Badge badgeContent={drugs.length} color="primary">
                    <VaccinesIcon />
                </Badge>)}
            </Box>
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
                <Button
                    startIcon={<NavigateBeforeIcon />}
                    sx={{ marginX: 1 }} variant="contained" onClick={() => router.push('./step1')} >
                    Volver
                </Button>
                <Button
                    startIcon={<NavigateNextIcon />}
                    variant="contained"
                    onClick={() => router.push('./step3')}
                    disabled={drugs.length === 0}
                >
                    Siguiente
                </Button>
            </Box>
        </Box>
    )
}