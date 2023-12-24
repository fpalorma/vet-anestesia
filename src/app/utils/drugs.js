import { getTimeMultiplier } from './units';

export const getDrugDetails = (drug) => {
  let details = '';
  if (drug.bolo) {
    details = `Bolo: ${drug.bolo.value} ${drug.bolo.unit} - Mant: `;
  }
  details += `${drug.dose.value} ${drug.dose.unit}`;
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
  list.forEach(({ price, bolo, time, density, size }) => {
    const priceXMl = getDrugPricePerMilliliter(price, size)
    if (bolo) {
      total += ((weight * bolo.value) / density.value) * priceXMl;
    }
    if (dose.unique) {
      total += ((weight * dose.value) / density.value) * priceXMl;
    } else {
      total += ((weight * dose.value) / density.value) * priceXMl * getTime(time, dose.unit);
    }
  });
  return total;
}
