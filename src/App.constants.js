export const EMPTY_USER = {
  name: '',
  email: '',
  createdDate: new Date(),
  updatedDate: new Date(),
  settings: {
    theme: 'default',
  },
}

export const PALETTE_LIST = [
  'default',
  'ff-nes',
  'sky-high',
  'brinstar',
  'brinstar-2',
]

export const COLOR_KEYS = [
  '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
]

export const SCENE_TOOLS = {
  MOVE: 'move',
  STAMP: 'stamp',
}

export const SCENE_ACTIONS = {
  MOVE_LEFT: 'move-left',
  MOVE_UP: 'move-up',
  MOVE_RIGHT: 'move-right',
  MOVE_DOWN: 'move-down',
  CLEAR_SCENE: 'clear-scene',
}

export const SPRITE_TOOLS = {
  PENCIL: 'pencil',
  ERASER: 'eraser',
  FILL: 'fill',
  COLOR_SAMPLE: 'color-sample',
}

export const SPRITE_ACTIONS = {
  MOVE_COLORS_1: 'move-colors-1',
  MOVE_COLORS_2: 'move-colors-2',
  FLIP_HORIZONTAL: 'flip-horizontal',
  FLIP_VERTICAL: 'flip-vertical',
  MOVE_LEFT: 'move-left',
  MOVE_UP: 'move-up',
  MOVE_RIGHT: 'move-right',
  MOVE_DOWN: 'move-down',
}

export const EMPTY_SCENE = {
  name: 'new scene',
  height: 8,
  width: 8,
  spriteSheet: [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ],
}

export const EMPTY_SPRITE = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
]

export const SPRITE_LIST = new Array(128)
  .fill(null)
  .map(() => [
    ["00", "00", "00", "00", "00", "00", "00", "00"],
    ["00", "00", "00", "00", "00", "00", "00", "00"],
    ["00", "00", "00", "00", "00", "00", "00", "00"],
    ["00", "00", "00", "00", "00", "00", "00", "00"],
    ["00", "00", "00", "00", "00", "00", "00", "00"],
    ["00", "00", "00", "00", "00", "00", "00", "00"],
    ["00", "00", "00", "00", "00", "00", "00", "00"],
    ["00", "00", "00", "00", "00", "00", "00", "00"],
  ])

export const EMPTY_PROJECT = {
  id: 'init',
  name: 'init',
  author: 'init',
  createdDate: 'date1',//new Date(),
  updatedDate: 'date2',//new Date(),
  palette: 'default',
  scenes: [
    { ...EMPTY_SCENE },
  ],
  sprites: SPRITE_LIST,
}
