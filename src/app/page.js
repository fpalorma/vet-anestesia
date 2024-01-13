'use client';
import styles from './page.module.css'
import { useState } from 'react';
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
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
  const [drug, setDrug] = useState(null);
  const [budget, setBudget] = useState(0);

  const methods = useForm();
  const { clearErrors, getFieldState, getValues, setValue, reset } = methods;
  const { asa, weight, time } = getValues();

  const selectedAsa = asas.find(a=> a.id === asa);

  const [drugSettings, setDrugSettings] = useState({ bolo: true, mant: true });

  const handleOnDrugSettingsChange = (event) => {
    setDrugSettings({
      ...drugSettings,
      [event.target.name]: event.target.checked,
    });
  };

  const handleOnAdd = () => {
    const element = {
      time,
      ...drug,
      bolo: drugSettings.bolo ? drug.bolo : undefined,
      dose: drugSettings.mant ? drug.dose : undefined
    };
    const list = [element, ...drugs];
    setDrugs(list);
    setDrug(null);
    setValue('time', '0');
    setDrugSettings({ bolo: true, mant: true });
  };

  const handleOnDrugChange = (value) => {
    clearErrors('time');
    setValue('time', '0'),
    setDrug(value);
  }

  const handleOnDelete = (id) => {
    const list = drugs.filter(row => row.id !== id);
    setDrugs(list);
  };

  const handleOnClean = () => {
    setDrug(null);
    setDrugSettings({ bolo: true, mant: true });
    setDrugs([]);
    setBudget(0);
    reset();
  };

  const handleOnQuote = () => {
    const total = getBudget(selectedAsa, weight, drugs);
    setBudget(total);
  };
  
  return (
    <main className={styles.main}>
      <FormProvider {...methods}>
        <MainForm asa={selectedAsa} />
        <Divider variant="fullWidth">
          <Chip label="Drogas" />
        </Divider>
        <DrugForm
          drug={drug}
          selectedDrugs={drugs}
          handleOnDrugChange={handleOnDrugChange} 
          drugSettings={drugSettings}
          handleOnDrugSettingsChange={handleOnDrugSettingsChange}
        />
      </FormProvider>
      <Button
        fullWidth 
        variant="contained"
        onClick={handleOnAdd}
        startIcon={<AddCircleOutlineOutlinedIcon />}
        disabled={!drug || (!drug.dose.unique && time == 0) || getFieldState('time').invalid }
      >
        Agregar
      </Button>
      <DrugList list={drugs} handleOnDelete={handleOnDelete} />
      <Button
        fullWidth 
        variant="contained"
        onClick={handleOnQuote}
        startIcon={<ReceiptOutlinedIcon />}
        disabled={!asa || !weight || !drugs.length}
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
