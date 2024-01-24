'use client';
import styles from './page.module.css'
import { useState } from 'react';
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { useForm, FormProvider } from "react-hook-form"
import DrugList from './components/drug-list';
import Budget from './components/budget';
import DrugForm from './components/drug-form';
import MainForm from './components/main-form';
import { getBudget } from './utils/drugs';
import asas from "./constants/asas.json";

export default function Home() {
  const [drugs, setDrugs] = useState([]);
  const [budget, setBudget] = useState(0);

  const mainForm = useForm({ mode: "onBlur" });
  const drugForm = useForm({ mode: "onBlur" });
  const { getValues, formState: { isDirty, isValid } } = mainForm;
  const { asa, weight } = getValues();

  const selectedAsa = asas.find(a=> a.id === asa);

  const handleOnAdd = (drug) => {
    const list = [drug, ...drugs];
    setDrugs(list);
  };

  const handleOnDelete = (id) => {
    const list = drugs.filter(row => row.id !== id);
    setDrugs(list);
  };

  const handleOnClean = () => {
    setDrugs([]);
    setBudget(0);
    mainForm.reset();
    drugForm.reset();
  };

  const handleOnQuote = () => {
    const total = getBudget(selectedAsa, weight, drugs);
    setBudget(total);
  };
  
  return (
    <main className={styles.main}>
      <FormProvider {...mainForm}>
        <MainForm asa={selectedAsa} />
      </FormProvider>
      <Divider variant="fullWidth">
        <Chip label="Drogas" />
      </Divider>
      <FormProvider {...drugForm}>
        <DrugForm handleOnAddDrug={handleOnAdd} selectedDrugs={drugs} />
      </FormProvider>
      <DrugList list={drugs} handleOnDelete={handleOnDelete} />
      <Button
        fullWidth 
        variant="contained"
        onClick={handleOnQuote}
        startIcon={<ReceiptOutlinedIcon />}
        disabled={!isDirty || !isValid || !drugs.length}
      >
        Presupuestar
      </Button>
      {!!budget && <Budget total={budget} />}
      <Button
        fullWidth
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleOnClean}
        color="error"
        startIcon={<CleaningServicesIcon />}
      >
        Limpiar
      </Button>
    </main>
  )
}
