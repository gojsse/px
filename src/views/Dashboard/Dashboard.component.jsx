import React from 'react'

import { useGetAllProjectsQuery } from '@store/projects/allProjects.api'
import ScenePreview from './ScenePreview.component'

const Dashboard = (props) => {
  const { data = [], isLoading } = useGetAllProjectsQuery()

  return (
    <div className='overflow-hidden'>
      {(isLoading || data.length === 0) && <div>Dashboard...</div>}
      {!isLoading && <ScenePreview project={data[0]} />}
    </div>
  )
}

export default Dashboard
