export function getNegocioIdFromUrl(negocio?: string): 1 | 2 {
    return negocio === "alugar" ? 1 : 2;
}
