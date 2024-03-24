import Typography from "@mui/material/Typography";
import { getDrugDetails } from "../../../utils/drugs";

const DrugDetails = ({ drug }) => {
  const { bolo, dose } = getDrugDetails(drug);
  return (
    <>
      {bolo && (
        <Typography component="span" variant="body2" color="text.primary">
          Bolo:{" "}
          <span>
            {bolo} - {drug.bolo.ml} ml{" "}
          </span>
        </Typography>
      )}
      {dose && (
        <Typography
          style={{ display: "block" }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          Dosis:{" "}
          <span>
            {dose} - {drug.dose.ml} ml
          </span>
        </Typography>
      )}
    </>
  );
};

export default DrugDetails;
