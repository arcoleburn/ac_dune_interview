export const formatNum = (
  num: string | number,
  price: boolean = false
): string => {
  const parsed = typeof num === "string" ? parseFloat(num) : num;

  if (isNaN(parsed)) return price ? "$0.00" : "0.00";

  let suffix = "";
  let value = parsed;

  if (parsed >= 1_000_000_000_000) {
    value = parsed / 1_000_000_000_000;
    suffix = "T";
  } else if (parsed >= 1_000_000_000) {
    value = parsed / 1_000_000_000;
    suffix = "B";
  } else if (parsed >= 1_000_000) {
    value = parsed / 1_000_000;
    suffix = "M";
  }

  let formatted = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (formatted === "0.00" && parsed !== 0) {
    formatted = value.toFixed(6);
  }
  return `${price ? "$" : ""}${formatted}${suffix}`.trim();
};
