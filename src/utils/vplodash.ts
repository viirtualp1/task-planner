export function get<T>(
  obj: Record<string, T>,
  path: string | string[],
  defValue?: string
) {
  if (!path) return undefined;

  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result = pathArray?.reduce(
    // @ts-ignore
    (prevObj, key) => prevObj && prevObj[key],
    obj
  );

  return result === undefined ? defValue : result;
}
