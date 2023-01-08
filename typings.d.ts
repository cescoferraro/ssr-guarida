import { components } from "guarida";

export type SearchType = "alugar" | "comprar";
export type Categoria = components["schemas"]["RetornaCategoriaBusca"];

export type SearchInput =
  components["schemas"]["AluguelIndexFiltroViewModel"] & {
    logradouro?: number;
  };

export type MinMax = components["schemas"]["FilterMinMax"];
export type Propriedade = components["schemas"]["Propriedade"];
export type FilterByCategory = components["schemas"]["Filtro"];
export type Localizacoes = components["schemas"]["RetornaLocalizacoes"];

export type LocalizacoesBySlug =
  components["schemas"]["RetornaLocalizacaoViewModel"];

export type LocalType = "estado" | "bairro" | "cidade" | "logradouro";

export type Cidade = components["schemas"]["Cidade"];
export type Logradouro = components["schemas"]["Logradouro"];
export type Bairro = components["schemas"]["Bairro"];
export type UF = components["schemas"]["Estado"];

export interface Local extends Bairro, Cidade, Logradouro, UF {
  type?: LocalType;
}

export type SearchResponse = components["schemas"]["RetornaImoveisModel"];
export type Imovel = components["schemas"]["FilterDetailsModel"];
export type Foto = components["schemas"]["FotoModel"];
export type SearchImovelCode = components["schemas"]["ImovelCodigoViewModel"];
export type ImovelCodeQuery =
  components["schemas"]["RetornaImovelCodigoViewModel"];
export type Undefinable<T> = T | undefined;
export type CampanhaResult = components["schemas"]["CampanhaListResponse"];
export type Campanha = components["schemas"]["CampanhaListResponseDataItem"];
export type FiltroCampanha =
  components["schemas"]["CampanhaListResponseDataItem"]["attributes"]["filtros"]["data"];
export type CampanhaImage = components["schemas"]["ImagemImagemComponent"];
