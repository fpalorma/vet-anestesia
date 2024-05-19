import { getTimeMultiplier } from "./units";

export const getDrugDetails = (drug) => {
  let bolo, dose;
  if (drug.bolo) {
    bolo = ` ${drug.bolo.value} ${drug.bolo.unit} `;
  }
  if (drug.dose) {
    dose = ` ${drug.dose.value} ${drug.dose.unit} `;
  }
  if (!drug.dose?.unique && drug.time) {
    dose += `(${drug.time} hr)`;
  }
  return { bolo, dose };
};

const getDrugPricePerMilliliter = (price, size) => price / size.value;

const getTime = (time, unit) => {
  const t = Number(time);
  const multiplier = getTimeMultiplier(unit);
  return t * multiplier;
};

export const getBudget = (asa, weight, list) =>
  list.reduce((acc, drug) => acc + getDrugPrice(weight, drug), asa.price);

export const getMl = (weight, dose, density, time = 1, unit = "h") => {
  if (!density) {
    return weight * dose;
  }
  return ((weight * dose) / density) * getTime(time, unit);
};

export const getDrugPrice = (
  weight,
  { price, bolo, time, density, size, dose },
) => {
  let total = 0;
  const priceXMl = getDrugPricePerMilliliter(price, size);
  if (bolo) {
    total += getMl(weight, bolo.value, density.value) * priceXMl;
  }
  if (dose) {
    const d = density ? density.value : null;
    const t = dose.unique ? 1 : time;
    const unit = dose.unit ? dose.unit : null;
    total += getMl(weight, dose.value, d, t, unit) * priceXMl;
  }
  return total;
};

export const addDrugMl = (weight, drug) => {
  const { bolo, density, dose, time } = drug;
  if (bolo) {
    bolo.ml = getMl(weight, bolo.value, density.value).toFixed(2);
  }
  if (dose) {
    dose.ml = getMl(
      weight,
      dose.value,
      density?.value,
      time,
      dose.unit,
    ).toFixed(2);
  }
  return drug;
};
