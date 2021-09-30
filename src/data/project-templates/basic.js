const testScene = {
  name: 'My First Scene',
  height: 8,
  width: 8,
  spriteSheet: [
    [{id:4},{id:4},{id:4},{id:4},{id:5},{id:14},{id:6},{id:4}],
    [{id:13},{id:12},{id:4},{id:4},{id:4},{id:5},{id:13},{id:12}],
    [{id:6},{id:4},{id:4},{id:5},{id:12},{id:4},{id:5},{id:14}],
    [{id:4},{id:18},{id:4},{id:4},{id:4},{id:4},{id:4},{id:4}],
    [{id:2},{id:4},{id:4},{id:4},{id:4},{id:2},{id:2},{id:2}],
    [{id:8},{id:4},{id:4},{id:4},{id:4},{id:0},{id:0},{id:0}],
    [{id:16},{id:4},{id:4},{id:3},{id:3},{id:1},{id:1},{id:1}],
    [{id:11},{id:10},{id:10},{id:10},{id:10},{id:11},{id:11},{id:11}]
  ]
}

const basic = new Project('New Basic')
basic.palette = 'sky-high'
basic.sprites = []
basic.scenes = [
  ...testScene, ...testScene, ...testScene
]
basic.updated()

export default basic
