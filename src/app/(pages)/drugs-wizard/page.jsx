/* eslint-disable no-unused-vars */
'use client'
import { useState, createContext } from "react";
import DrugWizardStep1 from './drugs-wizard-step1'
import DrugWizardStep2 from "./drugs-wizard-step2";
import DrugWizardStep3 from "./drugs-wizard-step3";
import DrugWizardStep4 from "./drugs-wizard-step4";
import { WizardContext } from "./wizard-context";
import { Box } from "@mui/material";

export default function DrugsWizard() {

    //estates nd hooks
    const [activeStep, setActiveStep] = useState(0)
    const [selectedAsa, setSelectedAsa] = useState()
    const [drugs, setDrugs] = useState([]);
    const [weightState, setWeightState] = useState();


    const wizardSteps = [
        {
            id: 1,
            label: "Paso1",
            step: <DrugWizardStep1
                title="Asa"
            />
        },
        {
            id: 2,
            label: "Paso2",
            step: <DrugWizardStep2
                title="Drogas"
            />
        },
        {
            id: 3,
            label: "Paso3",
            step: <DrugWizardStep3
                title="Lista"
            />
        },
        {
            id: 4,
            label: "Paso4",
            step: <DrugWizardStep4
                title="Presupuesto"
            />
        },

    ]


    return (
        <WizardContext.Provider
            value={{
                stepObj: [activeStep, setActiveStep],
                drugObj: [drugs, setDrugs],
                weightObj: [weightState, setWeightState],
                asaObj: [selectedAsa, setSelectedAsa],
            }}
        >
            <Box sx={{
                margin:5
            }}>
                {wizardSteps[activeStep].step}
            </Box>
        </WizardContext.Provider>
    );
}
