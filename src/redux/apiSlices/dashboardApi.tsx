import { api } from "../api/apiSlice";

const dashboardApi= api.injectEndpoints({
    endpoints : (builder) => ({
        getEarnStatus : builder.query({
            query : ()=> `/overview/total-users-earning`,
            providesTags: ["earn"],
        }),
        getOverview : builder.query({
            query : ()=> `/overview/overviews`,
            providesTags: ["overview"],
        }),
        getPurchasedPackage : builder.query({
            query : ()=> `/overview/purchased-package-list`,
            providesTags: ["purchased-package"],
        }),
    })
})
export const {useGetEarnStatusQuery,useGetOverviewQuery,useGetPurchasedPackageQuery} = dashboardApi