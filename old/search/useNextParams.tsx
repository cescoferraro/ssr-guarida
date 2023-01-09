import { useRouter } from "next/router";

export const useNextParams = (): Record<string, string> => {
  const router = useRouter();
  return router.query as Record<string, string>;
};
