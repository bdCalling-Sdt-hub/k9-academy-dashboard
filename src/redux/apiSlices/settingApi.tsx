import { api } from "../api/apiSlice";

const settingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => "/manage/get-privacy-policy",
      providesTags: ["privacy"],
    }),
    postPrivacyPolicy: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/manage/add-privacy-policy",
        body: data,
      }),
      invalidatesTags: ["privacy"],
    }),
    getAbout: builder.query({
      query: () => "/manage/get-about-us",
      providesTags: ["about"],
    }),
    postAbout: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/manage/add-about-us",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),
    getTermsAndConditions: builder.query({
      query: () => "/manage/get-terms-conditions",
      providesTags: ["terms"],
    }),
    postTermsAndConditions: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/manage/add-terms-conditions",
        body: data,
      }),
      invalidatesTags: ["terms"],
    }),
    getSlider: builder.query({
      query: () => "/manage/get-slider",
      providesTags: ["banner"],
    }),
    postSlider: builder.mutation({
      query: (data) => ({
        url: "/manage/add-slider",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),
    deleteSlider: builder.mutation({
      query: (id) => ({
        url: `/manage/delete-slider/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  usePostPrivacyPolicyMutation,
  useGetAboutQuery,
  usePostAboutMutation,
  useGetTermsAndConditionsQuery,
  usePostTermsAndConditionsMutation,
  useGetSliderQuery,
  usePostSliderMutation,
  useDeleteSliderMutation,
} = settingApi;