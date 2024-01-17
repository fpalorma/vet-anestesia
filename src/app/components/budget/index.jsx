import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { lightBlue } from '@mui/material/colors';

const Budget = ({ total }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Paper elevation={3} sx={{ p: 2, bgcolor: 'primary.main' }}>
        <Box sx={{ color: lightBlue[100], fontWeight: 'medium', fontSize: 18 }}>Presupuesto</Box>
        <Box sx={{ color: 'white', fontSize: 34, fontWeight: 'medium', my: 2 }}>
          $ {total}
        </Box>
      </Paper>
    </Box>
  )
};

export default Budget;