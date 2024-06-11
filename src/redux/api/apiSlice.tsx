import { getFromLocalStorage } from "@/util/local-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = getFromLocalStorage("dentistAuthToken");

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.116:7000",
    headers: {},
  }),
  endpoints: () => ({}),
});
