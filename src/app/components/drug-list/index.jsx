import List from '@mui/material/List';
import DrugItem from './drug-item';
import { Divider } from '@mui/material';

const DrugList = ({ list = [], handleOnDelete }) => (
  <List dense={true}>
    <Divider />
    {list.map((row) => <DrugItem key={row.id} drug={row} handleOnDelete={handleOnDelete} />)}
  </List>
);

export default DrugList;