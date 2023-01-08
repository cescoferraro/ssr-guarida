import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export const useNextParams = (): ParsedUrlQuery => {
  const router = useRouter();
  return router.query;
};
