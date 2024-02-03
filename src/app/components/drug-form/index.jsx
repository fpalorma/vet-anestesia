'use client';
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Button from "@mui/material/Button";
import { useFormContext, useFormState, Controller } from "react-hook-form"
import drugList from '../../constants/drugs.json';
import styles from './style.module.css';
import { checkTimeDisabled } from "@/app/utils/form";

const DrugForm = ({ handleOnAddDrug, selectedDrugs }) => {
  const { control, setValue, reset, watch, getValues, resetField, trigger } = useFormContext();
  const { isDirty, isValid, errors } = useFormState({ control });

  const [isBoloDose = [true, true], drug] = watch(['isBoloDose', 'drug']);
  const [isBolo, isDose] = isBoloDose;

  const handleOnDrugChange = (selectedDrug) => {
    /* Reset isBoloDose errors and values to true. This avoid issues
     with some conditions of the form that depends on this field */
    resetField('isBoloDose');
    if (!selectedDrug) {
      return;
    }
    const { dose, bolo } = selectedDrug;
    if (dose) {
      setValue('dose', dose.value);
    }
    if (bolo) {
      setValue('bolo', bolo.value);
    }
    // Refresh validation state with the new values
    trigger(['dose', 'bolo']);
  }

  const handleOnAdd = () => {
    /* I create a copy with the basic data of the drug and then I add 
     the dose, bole and time according to the conditions below */
    const { time, bolo, dose } = getValues();
    const { id, label, price, size, density } = drug;
    const element = { id, label, price, size, density };
    if (drug.bolo && isBolo) {
      element.bolo = { ...drug.bolo, value: bolo };
    }
    if (isDose) {
      element.dose = { ...drug.dose, value: dose };
    }
    if (!drug.dose.unique && isDose) {
      element.time = time;
    }
    // Check if there is an error adding the drug
    const response = handleOnAddDrug(element);
    if (response) {
      reset();
    }
  };

  const options = drugList.filter(d => !selectedDrugs.some(r => r.id == d.id));
  const isTimeDisabled = checkTimeDisabled(drug, isDose);
  return (
    <>
      <Controller 
        control={control}
        name='drug'
        defaultValue={null}
        rules={{
          required: true
        }}
        render={({ field }) => (
          <Autocomplete
            disablePortal
            {...field} 
            isOptionEqualToValue={(option, value) => value.id === option.id}
            onChange={(_, newDrug) => {
              field.onChange(newDrug);
              handleOnDrugChange(newDrug);
            }}
            options={options}
            renderInput={(params) => 
              <FormControl fullWidth margin='normal'>
                <TextField {...params} label="Droga" />
              </FormControl>
            }
          />
        )}
      ></Controller>
      {drug?.bolo &&
        <>
          <FormControl fullWidth margin='normal' error={!!errors.isBoloDose}>
            <FormGroup className={styles.flexRow}>
              <Controller 
                control={control}
                name='isBoloDose'
                defaultValue={[true, true]}
                rules={{
                  // if both checkboxes are false the drug can not be added
                  validate: (value) => value.includes(true),
                }}
                render={({ field }) => (
                  <>
                    <FormControlLabel 
                      control={<Switch {...field} onChange={() => field.onChange([!field.value[0], field.value[1]])} checked={field.value[0]} />}
                      label="Bolo"
                    />
                    <FormControlLabel 
                      control={<Switch {...field} onChange={() => field.onChange([field.value[0], !field.value[1]])} checked={field.value[1]} />}
                      label="Mantenimiento"
                    />
                  </>
                )}
              ></Controller>
            </FormGroup>
            <FormHelperText id="bolo-helper">{errors.isBoloDose ? 'Se debe seleccionar al menos uno' : null}</FormHelperText>
          </FormControl>
          <Controller 
            control={control}
            name='bolo'
            rules={{ 
              required: 'La dosis del bolo es requerida',
              pattern: {
                value: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/g,
                message: 'La dosis del bolo debe ser mayor a 0'
              }
            }}
            disabled={!drug || !isBolo}
            defaultValue='0'
            render={({ field }) => (
              <FormControl fullWidth margin='normal' error={!!errors.bolo}>
                <InputLabel id="bolo-label">Bolo</InputLabel>
                <OutlinedInput
                  {...field}
                  id="bolo"
                  label="Bolo"
                  type='number'
                  endAdornment={<InputAdornment position="end">{drug?.bolo?.unit}</InputAdornment>}
                  inputProps={{
                    'aria-label': 'bolo'
                  }}
                />
                <FormHelperText id="bolo-helper">{errors.bolo?.message}</FormHelperText>
              </FormControl>
            )}
          >
          </Controller>
        </>
      }
      <Controller 
        control={control}
        name='dose'
        rules={{ 
          required: 'La dosis es requerida',
          pattern: {
            value: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/g,
            message: 'La dosis debe ser mayor a 0'
          }
        }}
        disabled={!drug || !isDose}
        defaultValue='0'
        render={({ field }) => (
          <FormControl fullWidth margin='normal' error={!!errors.dose}>
            <InputLabel id="dose-label">Dosis</InputLabel>
            <OutlinedInput
              {...field}
              id="dose"
              label="Dosis"
              type='number'
              endAdornment={<InputAdornment position="end">{drug?.dose.unit}</InputAdornment>}
              inputProps={{
                'aria-label': 'dose'
              }}
            />
            <FormHelperText id="dose-helper">{errors.dose?.message}</FormHelperText>
          </FormControl>
        )}
      >
      </Controller>
      <Controller 
        control={control}
        name='time'
        rules={{ 
          required: 'El tiempo es requerido',
          pattern: {
            value: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/g,
            message: 'El tiempo debe ser mayor a 0'
          }
        }}
        disabled={isTimeDisabled}
        defaultValue='0'
        render={({ field }) => (
          // Not all drugs has time so we hide errors when the field is disabled
          <FormControl fullWidth margin='normal' error={!isTimeDisabled && !!errors.time}>
            <InputLabel id="time-label">Tiempo</InputLabel>
            <OutlinedInput
              {...field}
              id="time"
              label="Tiempo"
              type='number'
              endAdornment={<InputAdornment position="end">hr</InputAdornment>}
              inputProps={{
                'aria-label': 'time'
              }}
            />
            {!isTimeDisabled && <FormHelperText id="time-helper">{errors.time?.message}</FormHelperText>}
          </FormControl>
        )}
      >
      </Controller>
      <Button
        fullWidth 
        variant="contained"
        onClick={handleOnAdd}
        startIcon={<AddCircleOutlineOutlinedIcon />}
        disabled={!isDirty || !isValid}
      >
        Agregar
      </Button>
    </>
  )
};

export default DrugForm;