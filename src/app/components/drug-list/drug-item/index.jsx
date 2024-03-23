import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import DrugDetails from "../drug-details";
import DrugTitle from "../drug-title";

const DrugItem = ({ drug, handleOnDelete }) => {
  return (
    <div key={drug.id}>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleOnDelete(drug.id)}
          >
            <DeleteOutlinedIcon color="error" />
          </IconButton>
        }
      >
        <ListItemText
          primary={<DrugTitle title={drug.label} />}
          secondary={<DrugDetails drug={drug} />}
        />
      </ListItem>
      <Divider />
    </div>
  );
};

export default DrugItem;
