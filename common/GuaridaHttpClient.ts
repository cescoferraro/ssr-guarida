import axios from "axios";

const baseURL = process.env.API_URL || "";
export const GuaridaHttpClient = axios.create({ baseURL });
