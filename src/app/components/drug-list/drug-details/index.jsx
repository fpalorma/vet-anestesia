import Typography from '@mui/material/Typography';
import { getDrugDetails } from '../../../utils/drugs';

const DrugDetails = ({ drug }) => {
  const { bolo, dose } = getDrugDetails(drug);
  return (
    <>
      <Typography
        sx={{ display: bolo ? 'inline' : 'none' }}
        component="span"
        variant="body2"
        color="text.primary"
      >
        Bolo: 
      </Typography>
      {bolo}
      <Typography
        sx={{ display: dose ? 'inline' : 'none' }}
        component="span"
        variant="body2"
        color="text.primary"
      >
        Dosis: 
      </Typography>
      {dose}
    </>
  )
}; 

export default DrugDetails;