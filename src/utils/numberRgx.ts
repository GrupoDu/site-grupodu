export const numberRgx = (value: string) => {
  const rgx = /[^0-9]/g;
  return value.replaceAll(rgx, "");
};
