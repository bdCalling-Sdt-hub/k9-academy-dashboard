import { api } from "../api/apiSlice";

const programApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProgram: builder.query({
      query: () => {
        return {
          url: "/training/all",
          method: "GET",
        };
      },
    }),
    createProgram: builder.mutation({
      query: (value) => {
        return {
          url: "/training/add",
          method: "POST",
          body: value,
        };
      },
    }),
    updateProgram: builder.mutation({
      query: ({ id, value }) => {
        return {
          url: `/training/update/${id}`,
          method: "PATCH",
          body: value,
        };
      },
    }),
    deleteProgram: builder.mutation({
      query: (id) => {
        console.log(id)
        return {
          url: `/training/delete/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetProgramQuery,
  useCreateProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation
} = programApi;
