import List from '@mui/material/List';
import DrugItem from './drug-item';

const DrugList = ({ list = [], handleOnDelete }) => (
  <List dense={true}>
    {list.map((row) => <DrugItem key={row.id} drug={row} handleOnDelete={handleOnDelete} />)}
  </List>
);

export default DrugList;