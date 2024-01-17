export const checkDrugFormValid = (drug, drugSettings, time) => {
  if (!drug) {
    return false;
  }

  if (!drug.dose.unique && drugSettings.mant && time == 0) {
    return false;
  }

  if (!drug.dose.unique && !drugSettings.mant && !drugSettings.bolo) {
    return false;
  }

  return true;
};

export const checkTimeDisabled = (drug, drugSettings) => {
  if (!drug) {
    return true;
  }

  if (drug?.dose?.unique) {
    return true;
  }
  
  if (!drug?.dose.unique && !drugSettings.mant) {
    return true;
  }

  return false;
};