import Typography from '@mui/material/Typography';

const DrugTitle = ({ title }) => {
  return (
    <Typography
      sx={{ display: 'inline' }}
      component="span"
      variant="subtitle2"
      color="text.primary"
    >
      {title}
    </Typography>
  )
}; 

export default DrugTitle;