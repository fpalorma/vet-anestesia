'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Box } from "@mui/material";
import { WizardContext } from "./context";

const DrugsWizardLayout = ({ children }) => {
  const [selectedAsa, setSelectedAsa] = useState();
  const [drugs, setDrugs] = useState([]);
  const [weightState, setWeightState] = useState();
  
  const router = useRouter();

  /* Validation on refresh or open one of the next steps by url */
  useEffect(() => {
    if (!selectedAsa) {
      router.push('./step1')
    }
  }, [])

  return (
    <WizardContext.Provider
      value={{
        drugObj: [drugs, setDrugs],
        weightObj: [weightState, setWeightState],
        asaObj: [selectedAsa, setSelectedAsa],
      }}
    >
      <section>
        <Box sx={{ margin: 3 }}>
          {children}
        </Box>
      </section>
    </WizardContext.Provider>
  )
}

export default DrugsWizardLayout;