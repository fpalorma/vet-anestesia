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
import { useFormContext, Controller } from "react-hook-form"
import { getDrugDetails } from '../../utils/drugs';
import drugList from '../../constants/drugs.json';
import styles from './style.module.css';

const DrugForm = ({ drug, selectedDrugs, handleOnDrugChange, handleOnDrugSettingsChange, drugSettings }) => {
  const { formState: { errors }, control, trigger } = useFormContext();
  const options = drugList.filter(d => !selectedDrugs.some(r => r.id == d.id));

  return (
    <>
      <Autocomplete
        disablePortal
        id="drug"
        value={drug}
        options={options}
        onChange={(_, newValue) => handleOnDrugChange(newValue)}
        renderInput={(params) => 
          <FormControl fullWidth margin='normal'>
            <TextField {...params} label="Droga" />
            {drug && <FormHelperText id="drug-dose">
              {getDrugDetails(drug)}
              </FormHelperText>}
          </FormControl>
        }
      />
      {
        drug?.bolo && <FormGroup className={styles.flexRow}>
          <FormControlLabel 
            control={<Switch name="bolo" onChange={handleOnDrugSettingsChange} checked={drugSettings.bolo} />}
            label="Bolo"
          />
          <FormControlLabel 
            control={<Switch name='mant' onChange={handleOnDrugSettingsChange} checked={drugSettings.mant} />}
            label="Mantenimiento"
          />
        </FormGroup>
      }
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
        defaultValue={0}
        render={({ field }) => (
          <FormControl fullWidth margin='normal' error={!!errors.time}>
            <InputLabel id="time-label">Tiempo</InputLabel>
            <OutlinedInput
              {...field}
              id="time"
              label="Tiempo"
              type='number'
              disabled={!drug || drug?.dose?.unique}
              onBlur={() => trigger('time')}
              endAdornment={<InputAdornment position="end">hr</InputAdornment>}
              inputProps={{
                'aria-label': 'time'
              }}
            />
            <FormHelperText id="time-helper">{errors.time?.message}</FormHelperText>
          </FormControl>
        )}
      >
      </Controller>
    </>
  )
};

export default DrugForm;