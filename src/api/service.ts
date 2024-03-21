import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommentObj } from "../App";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Message"],
  endpoints: (build) => ({
    getComments: build.query<CommentObj[], void>({
      query: () => "/getComments",
      providesTags: ["Message"],
    }),
    addComment: build.mutation<CommentObj, Partial<CommentObj>>({
      query: (body) => ({
        url: "/createComment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Message"],
    }),
    deleteComment: build.mutation<{ success: boolean; id: number }, number>({
      query: () => ({
        url: `/deleteComments`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
    deleteComments: build.mutation<{}, void>({
      query: () => ({
        url: `/deleteComments`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentsMutation,
  useDeleteCommentMutation,
} = api;
