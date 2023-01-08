import axios from "axios";

export const GuaridaHttpClient = axios.create({
  baseURL: process.env.API_URL || "",
});

export const GuaridaCMSHttpClient = axios.create({
  baseURL: process.env.CMS_API_URL || "",
});
