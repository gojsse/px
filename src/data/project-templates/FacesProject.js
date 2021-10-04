// face shapes, etc.
// ladders, ropes, holes, etc.
import Project from "../Project"
import Scene from "../Scene"

const spriteSheet = [
  [{id:4},{id:4},{id:4},{id:4},{id:5},{id:14},{id:6},{id:4}],
  [{id:13},{id:12},{id:4},{id:4},{id:4},{id:5},{id:13},{id:12}],
  [{id:6},{id:4},{id:4},{id:5},{id:12},{id:4},{id:5},{id:14}],
  [{id:4},{id:18},{id:4},{id:4},{id:4},{id:4},{id:4},{id:4}],
  [{id:2},{id:4},{id:4},{id:4},{id:4},{id:2},{id:2},{id:2}],
  [{id:8},{id:4},{id:4},{id:4},{id:4},{id:0},{id:0},{id:0}],
  [{id:16},{id:4},{id:4},{id:3},{id:3},{id:1},{id:1},{id:1}],
  [{id:11},{id:10},{id:10},{id:10},{id:10},{id:11},{id:11},{id:11}]
]

class FacesProject extends Project {

  constructor({ name }) {

    super({ name })

    this.palette = 'default'

    const scene = new Scene({
      name: 'First faces scene',
      gridData: [ ...spriteSheet ]
    })

    this.scenes = [
      { ...scene.data }
    ]
  }

}

export default FacesProject
