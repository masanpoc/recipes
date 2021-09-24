export function getFormattedQuery(str: string): string {
  str = str.trim();
  let strArr: string[] = str.split(" ");
  strArr = strArr.map((query: string, i: number) => {
    if (i == 0) return query;
    return "%20" + query;
  });
  return strArr.join("");
}
