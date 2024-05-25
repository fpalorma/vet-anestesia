"use client";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";
import { Grid, Badge, Box, Button } from "@mui/material";
import { NavigateNext, NavigateBefore, Vaccines } from "@mui/icons-material";
import { WizardContext } from "../context";
import DrugForm from "../../../components/drug-form";
import Footer from "../../../components/footer";
import { addDrugMl } from "../../../utils/drugs";

export default function DrugWizardStep2() {
  const { drugObj, weightObj } = useContext(WizardContext);
  const [weightState] = weightObj;
  const [drugs, setDrugs] = drugObj;
  const router = useRouter();

  const drugForm = useForm({ mode: "onBlur" });

  const handleOnAdd = (drug) => {
    /* Check weight and calculate ml here with the weight */
    if (Number(weightState)) {
      const list = [addDrugMl(weightState, drug), ...drugs];
      setDrugs(list);
      return true;
    }
  };

  const buttonNextRef = useRef()

  return (
    <Box>
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {drugs.length !== 0 && (
          <Badge badgeContent={drugs.length} color="primary">
            <Vaccines />
          </Badge>
        )}
      </Box>
      <FormProvider {...drugForm}>
        <DrugForm
          handleOnAddDrug={handleOnAdd}
          selectedDrugs={drugs}
        />
      </FormProvider>
      <Footer>
        <Grid container columns={2} columnGap={{ xs: 1 }}>
          <Grid item={true} xs>
            <Button
              variant="outlined"
              startIcon={<NavigateBefore />}
              fullWidth={true}
              onClick={() => router.push("./step1")}
            >
              Volver
            </Button>
          </Grid>
          <Grid item={true} xs>
            <Button
              variant="contained"
              endIcon={<NavigateNext />}
              fullWidth={true}
              onClick={() => router.push("./step3")}
              disabled={drugs.length === 0}
			  ref = {buttonNextRef}
			  autoFocus = {true}
            >
              Siguiente
            </Button>
          </Grid>
        </Grid>
      </Footer>
    </Box>
  );
}
