import {Box} from "@mui/material";
import {GuaridaAppBar} from "components/GuaridaAppBar/GuaridaAppBar";
import {GuaridaFooter} from "components/GuaridaFooter/GuaridaFooter";
import {ImovelBody} from "legacy/imovel/ImovelBody/ImovelBody";
import {ImovelImages} from "legacy/imovel/ImovelImages/ImovelImages";
import {ImovesRelacionados} from "legacy/imovel/ImovesRelacionados/ImovesRelacionados";
import {useImovelDetailsQuery} from "legacy/imovel/useImovelDetailsQuery";
import {useRouter} from "next/router";
import React from "react";

export const ImovelDetail = () => {
    const release = false;
    const params = useRouter().query;
    const query = useImovelDetailsQuery(params?.id as string | undefined);
    return (
        <>
            <GuaridaAppBar position="sticky"/>
            <Box sx={{flexGrow: 1, overflowY: "scroll"}}>
                <ImovelImages query={query}/>
                <ImovelBody query={query}/>
                {release && <ImovesRelacionados/>}
                <GuaridaFooter
                    sx={{
                        transform: {
                            xs: "translateY( -200px )",
                            sm: "translateY( -200px )",
                            md: "translateY( 0px )",
                        },
                    }}
                />
            </Box>
        </>
    );
};
