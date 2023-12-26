'use client';
import styles from './page.module.css'
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from '@mui/material/Autocomplete';
import FormHelperText from '@mui/material/FormHelperText';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { lightBlue } from '@mui/material/colors';
import { getDrugDetails, getBudget } from './utils/drugs';
import { useForm, Controller } from "react-hook-form"
import drugList from './constants/drugs.json';
import asas from "./constants/asas.json";

export default function Home() {
  const [drugs, setDrugs] = useState([]);
  const [drug, setDrug] = useState(null);
  const [budget, setBudget] = useState(0);

  const { formState: { errors }, control, trigger, clearErrors, getFieldState, getValues, setValue, reset } = useForm();
  const { asa, weight, time } = getValues();

  const listaDrogas = drugList.filter(d => !drugs.some(r => r.id == d.id));

  const handleOnAdd = () => {
    const element = {
      time,
      ...drug,
    }
    const list = [element, ...drugs];
    setDrugs(list);
    setDrug(null);
    setValue('time', '0');
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
    setDrugs([]);
    setBudget(0);
    reset();
  };

  const handleOnQuote = () => {
    const selectedAsa = asas.find(a=> a.id === asa);
    const total = getBudget(selectedAsa, weight, drugs);
    setBudget(total);
  };
  
  return (
    <main className={styles.main}>
      <Controller 
        control={control}
        name='asa'
        rules={{ 
          required: 'El asa médica es requerida',
        }}
        defaultValue=''
        render={({ field }) => (
          <FormControl fullWidth margin='normal' error={errors.asa}>
            <InputLabel id="asa-label">Asa medica</InputLabel>
            <Select
              {...field}
              labelId="asa-label"
              id="asa"
              label="Asa médica"
              onBlur={() => trigger('asa')}
            >
              {asas.map((asa) => (
                <MenuItem key={asa.id} value={asa.id}>
                  {asa.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText id="asa-helper">{errors.asa ? errors.asa.message : asa?.description}</FormHelperText>
          </FormControl>
        )}
      >
      </Controller>
      <Controller 
        control={control}
        name='weight'
        defaultValue={0}
        rules={{ 
          required: 'El peso es requerido',
          pattern: {
            value: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/g,
            message: 'El peso debe ser mayor a 0'
          }
        }}
        render={({ field }) => (
          <FormControl fullWidth margin='normal' error={errors.weight}>
            <InputLabel id="weight-label">Peso</InputLabel>
            <OutlinedInput
              {...field}
              id="weight"
              label="Peso"
              type='number'
              onBlur={() => trigger('weight')}
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight'
              }}
            />
            <FormHelperText id="weight-helper">{errors.weight?.message}</FormHelperText>
          </FormControl>
        )}
      >
      </Controller>
      <Divider variant="fullWidth">
        <Chip label="Drogas" />
      </Divider>
      <Autocomplete
        disablePortal
        id="drug"
        value={drug}
        options={listaDrogas}
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
          <FormControl fullWidth margin='normal' error={errors.time}>
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
      <Button
        fullWidth 
        variant="contained"
        onClick={handleOnAdd}
        startIcon={<AddCircleOutlineOutlinedIcon />}
        disabled={!drug || (!drug.dose.unique && !time) || getFieldState('time').invalid }
      >
        Agregar
      </Button>
      <List dense={true}>
      {
        drugs.map((row) => 
          <>
            <ListItem
              key={row.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleOnDelete(row.id)}>
                  <DeleteOutlinedIcon color='error' />
                </IconButton>
              }
            >
              <ListItemText
                primary={row.label}
                secondary={`${getDrugDetails(row)}`}
              />
            </ListItem>
            <Divider />
          </>
        )
      }
      </List>
      <Button
        fullWidth 
        variant="contained"
        onClick={handleOnQuote}
        startIcon={<ReceiptOutlinedIcon />}
        disabled={!asa || !weight || !drugs.length}
      >
        Presupuestar
      </Button>
      {
        !!budget && <Box fullWidth sx={{ my: 2 }}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: 'primary.main' }}>
            <Box sx={{ color: lightBlue[100], fontWeight: 'medium', fontSize: 18 }}>Presupuesto</Box>
            <Box sx={{ color: 'white', fontSize: 34, fontWeight: 'medium', my: 2 }}>
              $ {budget}
            </Box>
          </Paper>
        </Box>
      }
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

