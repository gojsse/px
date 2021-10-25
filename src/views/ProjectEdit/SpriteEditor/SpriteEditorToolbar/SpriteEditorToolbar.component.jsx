import { useDispatch, useSelector } from 'react-redux'

import { ReactComponent as PixelIcon } from '../../../../images/icons/pixel.svg'
import { ReactComponent as EraseIcon } from '../../../../images/icons/erase.svg'
import { ReactComponent as FillIcon } from '../../../../images/icons/fill.svg'
import { ReactComponent as SampleIcon } from '../../../../images/icons/sample.svg'

import { SPRITE_TOOLS } from '@/App.constants'
import { getCurrentTool, setCurrentTool } from '@store/spriteEditor/spriteEditor.slice'

import EditorToolbar from '../../../../components/EditorToolbar/EditorToolbar.component'

const SpriteEditorToolbar = (props) => {
  const dispatch = useDispatch()
  const selectedTool = useSelector(getCurrentTool)

  const buttons = [
    {tool: SPRITE_TOOLS.PENCIL, icon: <PixelIcon className='block' />},
    {tool: SPRITE_TOOLS.ERASER, icon: <EraseIcon className='block' />},
    {tool: SPRITE_TOOLS.FILL, icon: <FillIcon className='block' />},
    {tool: SPRITE_TOOLS.COLOR_SAMPLE, icon: <SampleIcon className='block' />},
  ]

  const handleToolClick = tool => dispatch(setCurrentTool({tool}))

  return (
    <EditorToolbar
      buttons={buttons}
      selectedTool={selectedTool}
      onClick={handleToolClick}
    />
  )
}

export default SpriteEditorToolbar
