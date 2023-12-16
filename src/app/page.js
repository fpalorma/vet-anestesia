'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import medicamentos from './constants/medicamentos.json';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export default function Home() {
  const [medicamento, setMedicamento] = useState('');

  const handleChange = (event) => {
    setMedicamento(event.target.value);
  };
  
  return (
    <main className={styles.main}>
      <FormControl fullWidth>
        <InputLabel id="medicamento-label">Medicamento</InputLabel>
        <Select
          labelId="medicamento-label"
          id="medicamento"
          value={medicamento}
          label="Medicamento"
          onChange={handleChange}
        >
          {medicamentos.map(m => <MenuItem key={m.value} value={m.value}>{m.name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="peso-label">Peso</InputLabel>
        <OutlinedInput
          id="peso"
          label="Peso"
          endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            'aria-label': 'peso',
          }}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="tiempo-label">Tiempo</InputLabel>
        <OutlinedInput
          id="tiempo"
          label="Tiempo"
          endAdornment={<InputAdornment position="end">hr</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            'aria-label': 'tiempo',
          }}
        />
      </FormControl>
    </main>
  )
}

