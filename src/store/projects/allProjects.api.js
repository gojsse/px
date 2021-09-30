import { createApi } from '@reduxjs/toolkit/query/react'

import { createProjectInStorage, getAllProjectsInStorage, deleteProjectInStorage } from '../../services/localForage'

const customBaseQuery = (
  args,
  { signal, dispatch, getState },
  extraOptions
) => {
  return getAllProjectsInStorage()
    .then(data => ({data}))
    .catch(error => ({error}))
}

// Define a service using a base URL and expected endpoints
export const allProjectsApi = createApi({
  reducerPath: 'allProjectsApi',
  tagTypes: ['Posts'],
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    createNewProject: builder.mutation({
      queryFn: ({ project }) => {
        return createProjectInStorage(project)
          .then(data => ({data}))
          .catch(error => ({error}))
      },
      invalidatesTags: ['Posts'],
    }),
    getAllProjects: builder.query({
      query: () => {},
      providesTags: (result) =>
        result
          ? [
              ...Object.keys(result).map(({ id }) => ({ type: 'Posts', id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    deleteProject: builder.mutation({
      queryFn: ({ projectId }) => {
        return deleteProjectInStorage(projectId)
          .then(data => ({data}))
          .catch(error => ({error}))
      },
      invalidatesTags: ['Posts'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateNewProjectMutation,
  useGetAllProjectsQuery,
  useDeleteProjectMutation
} = allProjectsApi
