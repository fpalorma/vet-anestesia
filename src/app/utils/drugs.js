import { getTimeMultiplier } from './units';

export const getDrugDetails = (drug) => {
  if (drug.bolo && drug.dose) {
    return `Bolo: ${drug.bolo.value} ${drug.bolo.unit} - Mant: ${drug.dose.value} ${drug.dose.unit}`;
  }
  if (drug.bolo) {
    return `Bolo: ${drug.bolo.value} ${drug.bolo.unit}`;
  }
  let details = `${drug.dose.value} ${drug.dose.unit}`;
  if (!drug.dose.unique && drug.time) {
    details += ` (${drug.time} hr)`;
  }
  return details;
};

const getDrugPricePerMilliliter = (price, size) => price/size.value;

const getTime = (time, unit) => {
  const t = Number(time);
  const multiplier = getTimeMultiplier(unit);
  return t * multiplier;
}

export const getBudget = (asa, weight, list) => {
  let total = asa.price;
  list.forEach(({ price, bolo, time, density, size, dose }) => {
    const priceXMl = getDrugPricePerMilliliter(price, size)
    if (bolo) {
      total += ((weight * bolo.value) / density.value) * priceXMl;
    }
    if (!dose) {
      return total;
    }
    if (dose.unique) {
      if (density) {
        total += ((weight * dose.value) / density.value) * priceXMl;
      } else {
        total += weight * dose.value * priceXMl;
      }
    } else {
      total += ((weight * dose.value) / density.value) * priceXMl * getTime(time, dose.unit);
    }
  });
  return total;
}
