// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseJSON = (json: any) => {
  if (String(json).includes('__proto__')) return JSON.parse(json, noProto);
  return JSON.parse(json);
};
const noProto = (k: string, v: string) => {
  if (k !== '__proto__') return v;
};
