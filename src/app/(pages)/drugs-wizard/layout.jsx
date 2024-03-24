'use client'
import { useState } from "react";
import { WizardContext } from "./wizard-context";
import { Box } from "@mui/material";

export default function DrugsWizardLayout({
  children, // will be a page or nested layout
}) {

  const [selectedAsa, setSelectedAsa] = useState()
  const [drugs, setDrugs] = useState([]);
  const [weightState, setWeightState] = useState();
  return (

    <WizardContext.Provider
      value={{
        drugObj: [drugs, setDrugs],
        weightObj: [weightState, setWeightState],
        asaObj: [selectedAsa, setSelectedAsa],
      }}
    >
      <section>
        <Box sx={{
          margin: 5
        }}>
          {children}
        </Box>
      </section>

      {/* Include shared UI here e.g. a header or sidebar */}
    </WizardContext.Provider>

  )
}