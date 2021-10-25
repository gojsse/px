import { useParams } from 'react-router'

interface ProjectParamsTypes {
  projectId: string
}

const Project = () => {
  const { projectId } = useParams<ProjectParamsTypes>()

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 pt-10'>
      { projectId }
    </div>
  )
}

export default Project
