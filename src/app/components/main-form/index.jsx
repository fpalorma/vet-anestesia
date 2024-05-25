
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { Controller, useFormContext } from "react-hook-form"
import asas from "../../constants/asas.json";

const MainForm = ({ asa, handleOnChangeFocus }) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

 const changeFocus = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleOnChangeFocus();
    }
 };

  return (
    <>
      <Controller
        control={control}
        name='asa'
        rules={{
          required: 'El asa anestésica es requerida',
        }}
        defaultValue={asa?.id || ''}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.asa}>
            <InputLabel id="asa-label">Asa anestésica</InputLabel>
            <Select
              {...field}
              labelId="asa-label"
              id="asa"
              label="Asa anestésica"
            >
              {asas.map((asa) => (
                <MenuItem key={asa.id} value={asa.id}>
                  {asa.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText id="asa-helper">
              {errors.asa ? errors.asa.message : asa?.description}
            </FormHelperText>
          </FormControl>
        )}
      ></Controller>
      <Controller
        control={control}
        name="weight"
        rules={{
          required: "El peso es requerido",
          pattern: {
            value: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/g,
            message: "El peso debe ser mayor a 0",
          },
        }}
        defaultValue="0"
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.weight}>
            <InputLabel id="weight-label">Peso</InputLabel>
            <OutlinedInput
              {...field}
              id="weight"
              label="Peso"
              type="number"
              onKeyDown={changeFocus}
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </FormControl>
        )}
      ></Controller>
    </>
  );
};

export default MainForm;
