import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { lightBlue } from "@mui/material/colors";
import Price from "../price";
import { getDrugPrice } from "../../../utils/drugs";

const DrugSecondaryText = ({ drug }) => {
  const boloMl = parseFloat(drug.bolo?.ml || 0);
  const doseMl = parseFloat(drug.dose?.ml || 0);
  const total = boloMl + doseMl;
  return <span>{total.toFixed(2)} ml</span>;
};

const BudgetItem = ({ drug, weight }) => (
  <ListItem sx={{ color: 'primary.main', fontWeight: "medium" }}>
    <ListItemText
      primary={drug.label}
      secondary={<DrugSecondaryText drug={drug} />}
    />
    <Price value={getDrugPrice(weight, drug)} />
  </ListItem>
);

export default BudgetItem;
