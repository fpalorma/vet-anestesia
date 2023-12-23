
export const getDrogaDetails = (droga, tiempo) => {
  let details = '';
  if (droga.bolo) {
    details = `Bolo: ${droga.bolo.value} ${droga.bolo.unit} - Mant: `;
  }
  details += `${droga.dosis.value} ${droga.dosis.unit}`;
  if (!droga.dosis.unique && tiempo) {
    details += ` (${tiempo} hr)`;
  }
  return details;
};
