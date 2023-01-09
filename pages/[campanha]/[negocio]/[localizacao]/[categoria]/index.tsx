import { getBuscaServerProps, IResult } from "common/getBuscaServerProps";
import { GetServerSidePropsContext } from "next";
import { SearchPage as SearchPageComponent } from "old/search/SearchPage";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: IResult }> {
  return {
    props: await getBuscaServerProps(context),
  };
}

export default function SearchPage(props: IResult): React.ReactNode {
  return <SearchPageComponent {...props} />;
}
