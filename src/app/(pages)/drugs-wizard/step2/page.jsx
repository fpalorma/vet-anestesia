'use client'
import { useForm, FormProvider } from "react-hook-form"
import { WizardContext } from "../context";
import { useContext } from "react";
import DrugForm from "../../../components/drug-form";
import { addDrugMl } from '../../../utils/drugs';
import { Box, Button } from "@mui/material";
import { NavigateNext, NavigateBefore } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useRouter } from "next/navigation";
import Footer from "../../../components/footer";
import ButtonGroup from '@mui/material/ButtonGroup';

export default function DrugWizardStep2() {
    const { drugObj, weightObj } = useContext(WizardContext);
    const [weightState,] = weightObj;
    const [drugs, setDrugs] = drugObj;
    const router = useRouter();

    const drugForm = useForm({ mode: "onBlur" });

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
				<Footer>
					<ButtonGroup fullWidth={true}>
						<Button
							variant="outlined"
							startIcon={<NavigateBefore />}
							sx={{ marginX: 1 }} 
							onClick={() => router.push('./step1')} 
						>
							Volver
						</Button>
						<Button
							variant="contained"
							endIcon={<NavigateNext />}
							onClick={() => router.push('./step3')}
							disabled={drugs.length === 0}
						>
							Siguiente
						</Button>
					</ButtonGroup>
				</Footer>
			</Box>
    )
}