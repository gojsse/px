export const emptyUser = {
  name: '',
  email: '',
  createdDate: new Date(),
  updatedDate: new Date(),
  settings: {
    theme: 'default',
  },
}

export const paletteList = [
  'default',
  'ff-nes',
  'sky-high',
  'brinstar',
  'brinstar-2',
];

export const colorKeys = [
  '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
]

export const spriteTools = {
  PENCIL: 'pencil',
  ERASER: 'eraser',
  FILL: 'fill',
  COLOR_SAMPLE: 'color-sample',
}

export const spriteActions = {
  MOVE_COLORS_1: 'move-colors-1',
  MOVE_COLORS_2: 'move-colors-2',
  FLIP_HORIZONTAL: 'flip-horizontal',
  FLIP_VERTICAL: 'flip-vertical',
  MOVE_LEFT: 'move-left',
  MOVE_UP: 'move-up',
  MOVE_RIGHT: 'move-right',
  MOVE_DOWN: 'move-down',
}

export const sceneActions = {
  MOVE_LEFT: 'move-left',
  MOVE_UP: 'move-up',
  MOVE_RIGHT: 'move-right',
  MOVE_DOWN: 'move-down',
}

export const emptyScene = {
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

export const emptySprite = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, "03", null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];

export const spriteList = new Array(128)
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
  ]);

export const emptyProject = {
  id: '',
  name: 'My Project',
  author: '',
  createdDate: 'date1',//new Date(),
  updatedDate: 'date2',//new Date(),
  palette: 'default',
  scenes: [
    {...emptyScene},
  ],
  sprites: spriteList,
}
