const getTimeMultiplier = (unit) => {
  unit = unit.toLowerCase();
  return unit.includes("min") ? 60 : 1;
}
