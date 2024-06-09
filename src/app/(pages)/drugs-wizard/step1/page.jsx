'use client'
import { useForm, FormProvider } from "react-hook-form"
import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import  Button  from "../../../components/button";
import { NavigateNext } from '@mui/icons-material';
import { WizardContext } from "../context";
import MainForm from "../../../components/main-form";
import Footer from "../../../components/footer";
import asas from "../../../constants/asas.json";

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

  const buttonRef = useRef();
  const changeFocus = () => {
    buttonRef.current.focus();
  }

  return (
    <>
      <FormProvider {...mainForm}>
        <MainForm asa={selectedAsa} handleOnChangeFocus={changeFocus} />
      </FormProvider>
      <Footer>
        <Button
          ref={buttonRef}
          endIcon={<NavigateNext />}
          variant="contained"
          onClick={handleSubmit(() => router.push('./step2'))}
          disabled={!isValid}
          fullWidth={true}
          disableFocusRipple={true}
        >
          Siguiente
        </Button>
      </Footer>
    </>
  )
}