import { setProjectPalette, updateProjectScene } from '@store/projects/projects.slice'
import { getSelectedProjectId, setSelectedProjectPalette, updateSelectedProjectSprite, updateSelectedProjectScene } from '@store/currentProject/currentProject.slice'
import { getSelectedSprite, getSelectedSpriteIndex } from '@store/spriteEditor/spriteEditor.slice'
import { getSelectedScene, getSelectedSceneIndex, updateSelectedSceneCell } from '@store/sceneEditor/sceneEditor.slice'

// updateSelectedProjectScene

export const handleSpriteActionButton = (buttonAction) => {
  return (dispatch, getState) => {
    dispatch(buttonAction())
    const sprite = getSelectedSprite(getState())
    const spriteIndex = getSelectedSpriteIndex(getState())
    dispatch(updateSelectedProjectSprite({index: spriteIndex, sprite}))
  }
}

export const handleSceneActionButton = (buttonAction) => {
  return (dispatch, getState) => {
    dispatch(buttonAction())
    const scene = getSelectedScene(getState())
    const sceneIndex = getSelectedSceneIndex(getState())
    dispatch(updateSelectedProjectScene({index: sceneIndex, scene}))
  }
}

export const updateScene = (row, column, value) => {
  return (dispatch, getState) => {
    const projectId = getSelectedProjectId(getState())
    dispatch(updateSelectedSceneCell(row, column, value))
    const sceneIndex = getSelectedSceneIndex(getState())
    const scene = getSelectedScene(getState())
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
    const projectId = getSelectedProjectId(getState())
    dispatch(setSelectedProjectPalette({ value: palette }))
    dispatch(setProjectPalette({ projectId, value: palette }))
  }
}
