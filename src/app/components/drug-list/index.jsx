import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import DrugDetails from './drug-details';
import DrugTitle from './drug-title';

const DrugList = ({ list = [], handleOnDelete }) => {
  return (
    <List dense={true}>
    {
      list.map((row) => 
        <div key={row.id}>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleOnDelete(row.id)}>
                <DeleteOutlinedIcon color='error' />
              </IconButton>
            }
          >
            <ListItemText
              primary={<DrugTitle title={row.label} />}
              secondary={<DrugDetails drug={row} />}
            />
          </ListItem>
          <Divider />
        </div>
      )
    }
    </List>
  )
};

export default DrugList;