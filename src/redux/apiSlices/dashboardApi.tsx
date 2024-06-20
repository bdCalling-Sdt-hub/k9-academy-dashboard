import { api } from "../api/apiSlice";

const dashboardApi= api.injectEndpoints({
    endpoints : (builder) => ({
        getEarnStatus : builder.query({
            query : ()=> `/overview/total-users-earning`,
            providesTags: ["earn"],
        })
    })
})
export const {useGetEarnStatusQuery} = dashboardApi