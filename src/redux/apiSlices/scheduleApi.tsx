import { api } from "../api/apiSlice";

const scheduleApi= api.injectEndpoints({
    endpoints : (builder) => ({
        getSchedule : builder.query({
            query : ()=> `/schedule/all`
        }),
        updateSchedule : builder.mutation({
            query: ({id, data}) => ({
                method: "PATCH",
                url: `/schedule/update/${id}`,
                body: data,
            })
        }),
        deleteSchedule : builder.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `/schedule/delete/${id}`,
            })
        }),
    })
})
export const { useGetScheduleQuery, useDeleteScheduleMutation, useUpdateScheduleMutation } = scheduleApi;