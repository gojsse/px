import { setProjectPalette, updateProjectScene } from '@store/projects/projects.slice'
import { getSelectedProjectId, setSelectedProjectPalette, updateSelectedProjectSprite, updateSelectedProjectScene } from '@store/currentProject/currentProject.slice'
import { getSelectedSprite, getSelectedSpriteIndex } from '@store/spriteEditor/spriteEditor.slice'
import { getSelectedScene, getSelectedSceneIndex, updateSelectedSceneCell } from '@store/sceneEditor/sceneEditor.slice'

export const handleSpriteActionButton = (buttonAction) => {
  return (dispatch, getState) => {
    dispatch(buttonAction())
    const state = getState()
    const sprite = getSelectedSprite(state)
    const spriteIndex = getSelectedSpriteIndex(state)
    dispatch(updateSelectedProjectSprite({index: spriteIndex, sprite}))
  }
}

export const handleSceneActionButton = (buttonAction) => {
  return (dispatch, getState) => {
    dispatch(buttonAction())
    const state = getState()
    const scene = getSelectedScene(state)
    const sceneIndex = getSelectedSceneIndex(state)
    dispatch(updateSelectedProjectScene({index: sceneIndex, scene}))
  }
}

export const updateScene = (row, column, value) => {
  return (dispatch, getState) => {
    const state = getState()
    const projectId = getSelectedProjectId(state)
    dispatch(updateSelectedSceneCell(row, column, value))
    // TODO performance issues? sometimes doesn't update a change
    const sceneIndex = getSelectedSceneIndex(state)
    const scene = getSelectedScene(state)
    dispatch(updateProjectScene({ projectId, sceneIndex, scene }))
  }
}

export const updateSprite = () => {
  return (dispatch) => {
    // TODO
  }
}

export const updatePalette = ({ palette }) => {
  return (dispatch, getState) => {
    const state = getState()
    const projectId = getSelectedProjectId(state)
    dispatch(setSelectedProjectPalette({ value: palette }))
    dispatch(setProjectPalette({ projectId, value: palette }))
  }
}
