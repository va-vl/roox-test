export const logObject = (obj: Record<string | number, unknown>) => {
  const result = '';
  const log = Object.entries(obj).forEach(
    ([key, value]) => result + `${result ? '\n' : ''}${key} = ${value}`,
  );
  console.log(log);
};
