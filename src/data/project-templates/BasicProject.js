import Project from "../Project"
import Scene from "../Scene"

const spriteSheet = [
  [4,4,4,4,5,14,6,4],
  [13,12,4,4,4,5,13,12],
  [6,4,4,5,12,4,5,14],
  [4,18,4,4,4,4,4,4],
  [2,4,4,4,4,2,2,2],
  [8,4,4,4,4,0,0,0],
  [16,4,4,3,3,1,1,1],
  [11,10,10,10,10,11,11,11]
]

class BasicProject extends Project {

  constructor({ name }) {

    super({ name })

    this.palette = 'sky-high'

    const scene = new Scene({
      name: 'first scene',
      gridData: [ ...spriteSheet ]
    })

    this.scenes = [
      { ...scene.data }
    ]
  }

}

export default BasicProject
