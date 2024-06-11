import { api } from "../api/apiSlice";

const settingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => "/manage/get-privacy-policy",
    }),
    postPrivacyPolicy: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/manage/add-privacy-policy",
        body: data,
      }),
    }),
  }),
});

export const { useGetPrivacyPolicyQuery, usePostPrivacyPolicyMutation } =
  settingApi;
