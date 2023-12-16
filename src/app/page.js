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
import TextField from "@mui/material/TextField";
import asas from "./constants/asas.json";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Home() {
  const [medicamento, setMedicamento] = useState('');

  const handleChange = (event) => {
    setMedicamento(event.target.value);
  };
  const [asa, setAsa] = useState("");

  const handleChangeAsa = (event) => {
    setAsa(event.target.value);
  };
  const handleOnClick = () => {
    console.log("click");
  };
  
  return (
    <main className={styles.main}>
      {/* Asas médicas */}
      <FormControl fullWidth>
        <InputLabel id="asas-label">Asa medica</InputLabel>
        <Select
          labelId="asas-label"
          id="demo-simple-select"
          value={asa}
          label="Asa médica"
          onChange={handleChangeAsa}
        >
          {asas.map((asa) => (
            <MenuItem key={asa.value} value={asa.value}>
              {asa.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Cantidad de droga */}

      <TextField id="outlined-basic" label="Cantidad" variant="outlined" />

      {/* Botón agregar */}

      <Button variant="contained" onClick={handleOnClick}>
        Agregar
      </Button>
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

