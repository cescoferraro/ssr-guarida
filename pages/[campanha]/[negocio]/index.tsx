import { getBuscaServerProps } from "common/getBuscaServerProps";
import { GetServerSidePropsContext } from "next";
import { SearchPage as SearchPageComponent } from "old/search/SearchPage";
import { Categoria, LocalizacoesBySlug, SearchResponse } from "typings";

interface IProps {
  categorias?: Categoria[];
  initialLocal?: LocalizacoesBySlug;
  initialResult?: SearchResponse;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: IProps }> {
  return {
    props: await getBuscaServerProps(context),
  };
}

export default function SearchPage(props: IProps): React.ReactNode {
  return <SearchPageComponent {...props} />;
}
