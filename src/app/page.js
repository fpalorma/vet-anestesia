'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import drogas from './constants/drogas.json';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import asas from "./constants/asas.json";
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
import { getDrogaDetails } from './utils/drogas';

export default function Home() {
  const [rows, setRows] = useState([]);
  const [droga, setDroga] = useState(null);
  const [tiempo, setTiempo] = useState(0);
  const [asa, setAsa] = useState('');
  const [peso, setPeso] = useState(0);

  const listaDrogas = drogas.filter(d => !rows.some(r => r.id == d.id));

  const handleOnAdd = () => {
    const row = {
      tiempo,
      ...droga,
    }
    const list = [row, ...rows];
    setRows(list);
    setDroga(null);
    setTiempo(0);
  };

  const handleOnDelete = (id) => {
    const list = rows.filter(row => row.id !== id);
    setRows(list);
  };

  // TODO: Mover a una page donde mostrar el resultado con el destalle de los costos 
  const handleOnPresupuestar = (id) => {

  };

  const calculate = () => {
    let total = asa.precio;
    rows.forEach((row) => {
      if (row.bolo) {
        total += row.precio * row.bolo.value * peso;
      }
      if (row.dosis.unique) {
        total += row.precio * row.dosis.value * peso;
      } else {
        total += row.precio * row.dosis.value * row.tiempo * peso;
      }
    });
    return total;
  }
  
  // TODO: Agregar validaciones con libreria de react para el previsualizar y agregar droga
  return (
    <main className={styles.main}>
      <FormControl fullWidth margin='normal'>
        <InputLabel id="asas-label">Asa medica</InputLabel>
        <Select
          labelId="asas-label"
          id="asa"
          value={asa}
          label="Asa médica"
          onChange={(e) => setAsa(e.target.value)}
        >
          {asas.map((asa) => (
            <MenuItem key={asa.id} value={asa}>
              {asa.label}
            </MenuItem>
          ))}
        </Select>
        {asa && <FormHelperText id="asa-descripcion">{asa.description}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <InputLabel id="peso-label">Peso</InputLabel>
        <OutlinedInput
          id="peso"
          label="Peso"
          type='number' 
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            'aria-label': 'peso',
            pattern: "^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$",
          }}
        />
      </FormControl>
      <Divider variant="fullWidth">
        <Chip label="Drogas" />
      </Divider>
      <Autocomplete
        disablePortal
        id="droga"
        value={droga}
        options={listaDrogas}
        onChange={(_, newValue) => setDroga(newValue)}
        renderInput={(params) => 
          <FormControl fullWidth margin='normal'>
            <TextField {...params} label="Droga" />
            {droga && <FormHelperText id="droga-dosis">
              {getDrogaDetails(droga)}
              </FormHelperText>}
          </FormControl>
        }
      />
      <FormControl fullWidth margin='normal'>
        <InputLabel id="tiempo-label">Tiempo</InputLabel>
        <OutlinedInput
          id="tiempo"
          label="Tiempo"
          type='number'
          disabled={!droga || droga?.dosis?.unique}
          value={tiempo}
          onChange={(e) => setTiempo(e.target.value)}
          endAdornment={<InputAdornment position="end">hr</InputAdornment>}
          inputProps={{
            'aria-label': 'tiempo',
            pattern: "^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$",
          }}
        />
      </FormControl>
      <Button
        fullWidth 
        variant="contained"
        onClick={handleOnAdd}
        startIcon={<AddCircleOutlineOutlinedIcon />}
        disabled={!droga || (!droga.dosis.unique && !tiempo) }
      >
        Agregar
      </Button>
      <List dense={true}>
      {
        rows.map((row) => 
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
                secondary={`${getDrogaDetails(row, tiempo)}`}
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
        onClick={handleOnPresupuestar}
        startIcon={<ReceiptOutlinedIcon />}
        disabled={!asa || !peso || !rows.length}
      >
        Presupuestar
      </Button>
    </main>
  )
}

