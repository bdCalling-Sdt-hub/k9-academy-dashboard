import { api } from "../api/apiSlice";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/auth/login",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => "/auth/admin/profile",
      providesTags: ["profile"],
    }),
    updatedProfile: builder.mutation({
      query: (data) => ({
        url: `/auth/admin/edit-profile/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetProfileQuery,
  useUpdatedProfileMutation,
} = authSlice;
