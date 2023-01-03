import { components } from "guarida";

export type SearchType = "alugar" | "comprar";
export type Categoria = components["schemas"]["RetornaCategoriaBusca"];
export type SearchInput = components["schemas"]["AluguelIndexFiltroViewModel"];
export type MinMax = components["schemas"]["FilterMinMax"];
export type Propriedade = components["schemas"]["Propriedade"];
export type FilterByCategory = components["schemas"]["Filtro"];
export type Localizacoes = components["schemas"]["RetornaLocalizacoes"];
export type LocalType = "Bairros" | "Cidades" | "Logradouros";
export type Cidade = components["schemas"]["Cidade"];
export type Logradouro = components["schemas"]["Logradouro"];
export type Bairro = components["schemas"]["Bairro"];

export interface Local extends Bairro, Cidade, Logradouro {
  type?: LocalType;
}

export type SearchResponse = components["schemas"]["RetornaImoveisModel"];
export type Imovel = components["schemas"]["FilterDetailsModel"];
export type Foto = components["schemas"]["FotoModel"];
export type SearchImovelCode = components["schemas"]["ImovelCodigoViewModel"];
export type ImovelCodeQuery =
  components["schemas"]["RetornaImovelCodigoViewModel"];
