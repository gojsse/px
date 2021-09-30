import { createApi } from '@reduxjs/toolkit/query/react'

import { readProjectInStorage, updateProjectInStorage } from '../../services/localForage'

const customBaseQuery = (
  args,
  { signal, dispatch, getState },
  extraOptions
) => {
  return readProjectInStorage(args)
    .then(data => ({data}))
    .catch(error => ({error}))
}

// Define a service using a base URL and expected endpoints
export const currentProjectApi = createApi({
  reducerPath: 'currentProjectApi',
  tagTypes: ['Posts'],
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    readProjectById: builder.query({
      query: (projectId) => `${projectId}`,
      providesTags: (result) =>
        result
          ? [
              ...Object.keys(result).map(({ id }) => ({ type: 'Posts', id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    updateProject: builder.mutation({
      queryFn: ({ projectId, updatedProject }) => {
        return updateProjectInStorage(projectId, { ...updatedProject, updated: Date.now() })
          .then(data => ({data}))
          .catch(error => ({error}))
      },
      // TOO intensive. Do not enable cache invalidation here.
      // invalidatesTags: ['Posts'],
      // invalidatesTags: (result, error, { palette }) => [{ type: 'Posts', palette }],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useReadProjectByIdQuery, useUpdateProjectMutation } = currentProjectApi
