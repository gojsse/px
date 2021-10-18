import { createApi } from '@reduxjs/toolkit/query/react'

import { readProjectInStorage, updateProjectInStorage } from '../../services/localForage'

// Define a service using a base URL and expected endpoints
export const currentProjectApi = createApi({
  reducerPath: 'currentProjectApi',
  tagTypes: ['Post'],
  baseQuery: (args) => {
    return readProjectInStorage(args)
      .then(data => ({data}))
      .catch(error => ({error}))
  },
  // refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    readProjectById: builder.query({
      query: (projectId) => `${projectId}`,
      providesTags: (result) =>
        result
          ? [
              ...Object.keys(result).map(({ id }) => ({ type: 'Post', id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),
    updateProject: builder.mutation({
      queryFn: ({ project }) => {
        return updateProjectInStorage(project)
          .then(data => ({data}))
          .catch(error => ({error}))
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useReadProjectByIdQuery, useUpdateProjectMutation } = currentProjectApi
