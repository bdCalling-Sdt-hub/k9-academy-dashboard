import { api } from "../api/apiSlice";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/auth/admin/login",
        body: data,
      }),
    }),
  }),
});

export const { useAdminLoginMutation } = authSlice;
