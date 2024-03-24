'use client'
import { WizardContext } from "../wizard-context";
import { useContext } from "react";
import { Box, Button } from "@mui/material";
import DrugList from "@/app/components/drug-list";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PaidIcon from '@mui/icons-material/Paid';
import { useRouter } from "next/navigation";

export default function DrugWizardStep3() {
    const { drugObj } = useContext(WizardContext);
    const [drugs, setDrugs] = drugObj;

    const router = useRouter();

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
                <Button
                    startIcon={<NavigateBeforeIcon />}
                    sx={{ marginX: 1 }} variant="contained" onClick={() => router.push('step2')} >
                    Volver
                </Button>
                <Button
                    startIcon={<PaidIcon />}
                    variant="contained" onClick={() => router.push('./step4')} >
                    Presupuesto
                </Button>
            </Box>
        </Box>
    )
}