import { api } from "../api/apiSlice";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmin: builder.query({
      query: () => "/auth/admin/admins",
      providesTags: ["admin"],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/auth/admin/add-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const { useGetAllAdminQuery, useCreateAdminMutation } = adminApi;
