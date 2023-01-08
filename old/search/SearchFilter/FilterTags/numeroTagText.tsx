import { capitalize } from "lodash";
import { SearchInput } from "typings";

export function numeroTagText(
  input: Partial<SearchInput & { logradouro?: number }>,
  k: string
): string {
  return `Mínimo ${input[k as keyof SearchInput] || ""} ${capitalize(
    k.replace("numero", "")
  )}`;
}
