import { createSlice } from '@reduxjs/toolkit';

import { spriteTools, colorKeys } from '@/App.constants';

const initialState = {
  selectedTool: spriteTools.PENCIL,
  selectedColor: colorKeys[0],
  selectedSprite: []
};

export const spriteEditorSlice = createSlice({
  name: 'spriteEditor',
  initialState: { ...initialState },
  reducers: {
    setSelectedTool(state, action) {
      const { tool } = action.payload;
      state.selectedTool = tool;
    },
    setSelectedColor(state, action) {
      const { color } = action.payload;
      state.selectedColor = color;
    },
    setSelectedSprite(state, action) {
      const { sprite } = action.payload;
      state.selectedSprite = sprite;
    },
    flipSpriteHorizontal(state) {
      state.selectedSprite.forEach((row, index) => {
        state.selectedSprite[index] = row.reverse();
      });
    },
    flipSpriteVertical(state) {
      state.selectedSprite.reverse();
    },
    moveSpriteUp(state) {
      const firstRow = state.selectedSprite.shift();
      state.selectedSprite.push(firstRow);
    },
    moveSpriteRight(state) {
      state.selectedSprite.forEach(row => {
        const lastCell = row.pop();
        row.unshift(lastCell);
      });
    },
    moveSpriteDown(state) {
      const lastRow = state.selectedSprite.pop();
      state.selectedSprite.unshift(lastRow);
    },
    moveSpriteLeft(state) {
      state.selectedSprite.forEach(row => {
        const firstCell = row.shift();
        row.push(firstCell);
      });
    },
    rotateSpriteRight(state) {
      const tempSprite = state.selectedSprite.map(row => ([ ...row.map(cell => cell) ]));
      state.selectedSprite.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          tempSprite[cellIndex][state.selectedSprite.length - rowIndex - 1] = cell;
        });
      });
      state.selectedSprite = tempSprite;
    },
    rotateSpriteLeft(state) {
      const tempSprite = state.selectedSprite.map(row => ([ ...row.map(cell => cell) ]));
      state.selectedSprite.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          tempSprite[state.selectedSprite.length - cellIndex - 1][rowIndex] = cell;
        });
      });
      state.selectedSprite = tempSprite;
    },
  },
})

// Actions
export const {
  setSelectedTool,
  setSelectedColor,
  setSelectedSprite,
  flipSpriteHorizontal,
  flipSpriteVertical,
  moveSpriteLeft,
  moveSpriteUp,
  moveSpriteRight,
  moveSpriteDown,
  rotateSpriteRight,
  rotateSpriteLeft,
} = spriteEditorSlice.actions;

// Selectors
export const getSelectedTool = (state) => state.spriteEditor.selectedTool;
export const getSelectedColor = (state) => state.spriteEditor.selectedColor;
export const getSelectedSprite = (state) => state.spriteEditor.selectedSprite;

export default spriteEditorSlice.reducer;
