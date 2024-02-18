'use client';
import { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form"
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DrugList from './components/drug-list';
import Budget from './components/budget';
import DrugForm from './components/drug-form';
import MainForm from './components/main-form';
import { addDrugMl } from './utils/drugs';
import asas from "./constants/asas.json";
import styles from './page.module.css'
import BudgetItem from './components/budget/budget-item';
import { ListItem } from '@mui/material';
import Total from './components/budget/total';

export default function Home() {
  const [drugs, setDrugs] = useState([]);

  const mainForm = useForm({ mode: "onBlur" });
  const drugForm = useForm({ mode: "onBlur" });
  const { getValues, formState: { isDirty, isValid }, watch } = mainForm;

  /* asa can change after budget calculation but weight not */
  const { weight } = getValues();
  const { asa } = watch();

  const selectedAsa = asas.find(a => a.id === asa);

  const handleOnAdd = (drug) => {
    /* Check weight and calculate ml here with the weight */
    if (Number(weight)) {
      const list = [addDrugMl(weight, drug), ...drugs];
      setDrugs(list);
      return true;
    }

    const { trigger } = mainForm;
    trigger('weight');
    return false;
  };

  const handleOnDelete = (id) => {
    const list = drugs.filter(row => row.id !== id);
    setDrugs(list);
  };

  const handleOnClean = () => {
    setDrugs([]);
    mainForm.reset();
    drugForm.reset();
  };

  return (
    <main className={styles.main}>
      <FormProvider {...mainForm}>
        <MainForm asa={selectedAsa} disableWeight={!!drugs.length} />
      </FormProvider>
      <Divider variant="fullWidth">
        <Chip label="Drogas" />
      </Divider>
      <FormProvider {...drugForm}>
        <DrugForm handleOnAddDrug={handleOnAdd} selectedDrugs={drugs} />
      </FormProvider>
      <DrugList list={drugs} handleOnDelete={handleOnDelete} />
      <Budget
        asa={selectedAsa}
        weight={weight}
        drugs={drugs}
        disabled={!isDirty || !isValid || !drugs.length}
      />
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
