import { getFromLocalStorage } from "@/util/local-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = getFromLocalStorage("dentistAuthToken");

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://143.198.3.51:8000",
    // baseUrl: "http://192.168.10.11:9000",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "banner",
    "terms",
    "privacy",
    "about",
    "profile",
    "admin",
    "earn",
    "overview",
    "purchased-package",
    "alluser",
    "message",
    "faq",
    "plan",
    "program",
  ],
});

// export const imageUrl = "http://143.198.3.51:8000";
// export const socketURL = "http://143.198.3.51:8000";
export const imageUrl = "http://192.168.10.11:9000";
export const socketURL = "http://192.168.10.11:9000";
// export const socketURL = "http://192.168.10.153:8050";
