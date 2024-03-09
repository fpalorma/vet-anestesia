import React from 'react'
import Budget from '../../components/budget';

export default function DrugWizardStep3({handleNextStep,selectedAsa,drugs,weight}) {
  return (
    <div>
      <Budget
        asa={selectedAsa}
        weight={weight}
        drugs={drugs}
        //disabled={!isDirty || !isValid || !drugs.length}
        disabled={false}
      />
    </div>
  )
}
