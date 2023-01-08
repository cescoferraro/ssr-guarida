import { IconButton } from "@mui/material";
import blogger from "common/assets/images/blogger.svg";
import facebook from "common/assets/images/facebook.svg";
import instagram from "common/assets/images/instagram.svg";
import linkedin from "common/assets/images/linkedin.svg";
import twitter from "common/assets/images/twitter.svg";
import youtube from "common/assets/images/youtube.svg";

export const AppIconsSocial = () => {
  return (
    <>
      {[
        { key: "twitter", value: twitter, href: "" },
        { key: "linkedin", value: linkedin, href: "" },
        { key: "youtube", value: youtube, href: "" },
        { key: "instagram", value: instagram, href: "" },
        { key: "blogger", value: blogger, href: "" },
        { key: "facebook", value: facebook, href: "" },
      ].map((item, index) => {
        return (
          <IconButton key={index} href={item.href}>
            <img className={item.value} src={item.value} alt={item.value} />
          </IconButton>
        );
      })}
    </>
  );
};
