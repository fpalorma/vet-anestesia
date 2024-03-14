'use client';

import styles from '../../page.module.css'
import { useState } from 'react';
import DrugWizardStep1 from './drug-wizard-step1'
import DrugWizardStep2 from './drug-wizard-step2';
import DrugWizardStep3 from './drug-wizard-step3';

export default function WizardDrugs() {

  //estates
  const [activeStep,setActiveStep] = useState(0)
  const [selectedAsa, setSelectedAsa] = useState()
  const [drugs, setDrugs] = useState([]);
  const [weight, setWeight] = useState();

  //functions
  const handleNextStep = () => { 
    setActiveStep((current) => current + 1)
   }
  const handlePrevStep = () => { 
    if(activeStep > 0){
        setActiveStep((current) => current - 1)
    }
   }



  const wizardSteps = [
    {
      id:1,
      label:"Paso1",
      step: <DrugWizardStep1
      title="Asa y Drogas"
      setSelectedAsa={setSelectedAsa}
      handleNextStep={handleNextStep}
      drugs={drugs}
      setDrugs={setDrugs}
      setWeight={setWeight}
        />
    },
    {
      id:2,
      label:"Paso 2",
      step: <DrugWizardStep2
      selectedAsa={selectedAsa}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
      drugs={drugs}
      weight={weight}
      asa={selectedAsa}
      />
    },
    {
      id:1,
      label:"Paso 3",
      step: <DrugWizardStep3
      selectedAsa={selectedAsa}
      drugs={drugs}
      weight={weight}
      />
    }
  ]

  return (
    <main className={styles.main}>
      {wizardSteps[activeStep].step}
    </main>
  )
}
