import React from 'react'
import { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form"
import MainForm from '../../components/main-form';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import DrugForm from '../../components/drug-form';
import asas from "../../constants/asas.json";
import Button from "@mui/material/Button";
import { addDrugMl } from '../../utils/drugs';

export default function DrugWizardStep1({handleNextStep,label,setSelectedAsa,drugs,setDrugs,setWeight}) {
    
  //Hooks
    const mainForm = useForm({ mode: "onBlur" });
    const drugForm = useForm({ mode: "onBlur" });
    
    const { getValues, formState: { isDirty, isValid }, watch, reset } = mainForm;
    const {  reset : resetDrugs  } = drugForm;


  /* asa can change after budget calculation but weight not */
  const { weight } = getValues();
  setWeight(weight)
  
  const { asa } = watch();

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

  //Functions
  const selectedAsa = asas.find(a => a.id === asa);
  setSelectedAsa(selectedAsa)

  const restore = () => { 
      reset()
      resetDrugs()
  }

  return (
    <div>
      <h1>{label}</h1>
      <FormProvider {...mainForm}>
        <MainForm asa={selectedAsa} disableWeight={!!drugs.length} />
      </FormProvider>
      <Divider variant="fullWidth">
        <Chip label="Drogas" />
      </Divider>
      <FormProvider {...drugForm}>
        <DrugForm handleOnAddDrug={handleOnAdd} selectedDrugs={drugs} />
      </FormProvider>
      <Button
      sx={{ marginTop:1 }}
      className='mt-1'
        fullWidth 
        variant="contained"
        onClick={restore}
        disabled={false}
      >
        Reestablecer
      </Button>
      <Button
      sx={{ marginTop:1 }}
      className='mt-1'
        fullWidth 
        variant="contained"
        onClick={handleNextStep}
        disabled={!isDirty || !isValid || !drugs.length}
      >
        Ver lista
      </Button>
    </div>
  )
}
