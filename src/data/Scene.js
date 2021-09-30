import { ID } from "./data.helpers"
class Scene {

  constructor(name, height = 8, width = 8, gridData = null) {

    this.name = name
    this.id = `sc_${ID()}`
    this.height = height
    this.width = width
    this.spriteSheet = gridData ?? [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]
  }



}

export default Scene