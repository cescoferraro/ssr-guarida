import { useGuaridaLocal } from "common/hooks/useGuaridaLocal";

export function useCurrentLocal(): {
  estado?: number;
  cidade?: number;
  bairro?: number;
  initialized: boolean;
} {
  const query = useGuaridaLocal();
  return {
    [query?.data?.tipo as string]: query.data?.id,
    initialized: query.isFetched,
  };
}
