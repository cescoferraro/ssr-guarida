import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ImovelDetail } from "old/imovel/ImovelDetail";
import { imovelDetailsQuery } from "old/imovel/useImovelDetailsQuery";
import { Imovel } from "typings";

interface IProps {
  imovel: Imovel;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{
  props: IProps;
}> {
  const startTime = performance.now();
  console.log("initial");
  //
  const id = context?.params?.id;
  console.log(id);
  const imovel = await imovelDetailsQuery(id as string);
  console.log(imovel);
  const endTime = performance.now();
  console.log(
    `Call to doSomething took ${Math.round(
      (endTime - startTime) / 1000
    )} seconds`
  );
  return {
    props: {
      imovel,
    },
  };
}

export default function Buscar({ imovel }: IProps) {
  console.log(imovel);
  return <ImovelDetail imovel={imovel} />;
}
