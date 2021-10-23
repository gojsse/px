import { ID } from './data.helpers'
import { PALETTE_LIST } from '../App.constants'
import Scene from './Scene'
import Sprite from './Sprite'

import packageJson from '@root/package.json'

class Project {

  constructor({ name }) {
    this.name = name
    this.initializeData()
  }

  initializeData() {
    this.id = `p_${ID()}`
    this.author = 'sys'
    this.created = Date.now()
    this.updated = Date.now()
    this.palette = PALETTE_LIST[0]
    this.version = packageJson.version

    this.scenes = [
      { ...new Scene({ name: '🦴' }).data }
    ]

    this.sprites = new Array(128)
      .fill(null)
      .map(() => [ ...new Sprite().data ])
  }

  setUpdated() {
    this.updated = Date.now()
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      author: this.author,
      created: this.created,
      updated: this.updated,
      palette: this.palette,
      scenes: this.scenes,
      sprites: this.sprites
    }
  }
}

export default Project
