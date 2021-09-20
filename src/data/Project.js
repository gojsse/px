import Scene from './Scene';

class Project {

  constructor(name) {
    this.name = name
    this.initializeData()
    this.initializeScenes()
    this.initializeSprites()
  }

  initializeData() {
    this.id = 'id10'
    this.author = ''
    this.created = Date.now()
    this.updated = ''
    this.palette = 'default'
    this.scenes = []
    this.sprites = []
  }

  initializeScenes() {
    this.scenes = [
      { ...new Scene('test scene', 8, 8) }
    ]
  }

  initializeSprites() {
    this.sprites = new Array(128)
      .fill(null)
      .map(() => [
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
      ]);
  }
}

export default Project;
