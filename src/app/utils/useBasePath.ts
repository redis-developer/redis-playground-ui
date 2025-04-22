export function useBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  console.log("base", base);
  return `${base}${path}`;
}
