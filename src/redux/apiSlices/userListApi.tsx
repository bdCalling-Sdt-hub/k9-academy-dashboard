import { api } from "../api/apiSlice";

const userListApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: (keyword) => {
                const params = new URLSearchParams();
                if (keyword) params.append('name', keyword);
                return {
                    url : `/auth/admin/users?${params.toString()}`,
                    method: "GET"
                };
            }
        }),
        blockUser: builder.mutation({
            query: (id) => ({
                url: `/auth/admin/user-block/${id}`,
                method: "PATCH",
                data: {}
            })
        }),
    })
})
export const { useGetAllUsersQuery, useBlockUserMutation } = userListApi