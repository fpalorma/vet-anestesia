'use client'
import { useForm, FormProvider } from "react-hook-form"
import { useContext, useEffect } from "react";
import MainForm from "../../../components/main-form";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { NavigateNext } from '@mui/icons-material';
import { WizardContext } from "../context";
import asas from "../../../constants/asas.json";
import Footer from "../../../components/footer";

export default function DrugWizardStep1() {
  const mainForm = useForm({ mode: "onBlur" });
  const { setValue } = mainForm;
  const { watch, handleSubmit } = mainForm;

  const { asaObj, weightObj } = useContext(WizardContext);
  const [weightValue, setWeightState] = weightObj;
  const [selectedAsa, setSelectedAsa] = asaObj;

  const router = useRouter()
  useEffect(() => {
    setValue('weight', weightValue);
  }, []);

  const { weight } = watch();
  setWeightState(weight);
      
  const { asa } = watch();
  const filteredSelectedAsa = asas.find(a => a.id === asa);
  setSelectedAsa(filteredSelectedAsa);

  const { formState: { isValid } } = mainForm;

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
        <Footer>
          <Button
            endIcon={<NavigateNext />}
            variant="contained"
            onClick={handleSubmit(() => router.push('./step2'))}
            disabled={!isValid}
            fullWidth={true}
          >
            Siguiente
          </Button>
        </Footer>
      </Box>
    </>
  )
}