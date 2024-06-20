import { api } from "../api/apiSlice";

const userListApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => `/auth/admin/users`,
            providesTags: [`alluser`]
        })
    })
})
export const { useGetAllUsersQuery } = userListApi