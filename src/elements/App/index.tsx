import * as React from 'react'
import './App.css'
import { useAppSelector } from '../../hooks/redux'
import ReactElement from '../../types/ReactElement'
import DraggableContainer from '../DraggableContainer'
import ToolBox from '../ToolBox'
import Properties from '../Properties'


const showElement = (element: ReactElement) => {

  return <div
    {...element.attributes}
    id={element.id}
    style={element.style}>
    {
      element.children?.map(child => showElement(child))
    }
  </div>
}

const App = () => {

  const element: ReactElement = useAppSelector(state => state.element.element)

  return (
    <div className='mainBody'>
      {
        showElement(element)
      }
      <DraggableContainer title='ToolBox' initialPosition={{ x: 100, y: 100, w: 100, h: 300 }}>
        <ToolBox />
      </DraggableContainer>
      <DraggableContainer title='Properties' initialPosition={{ x: 200, y: 200, w: 100, h: 300 }}>
        <Properties />
      </DraggableContainer>
      <DraggableContainer title='DOM Tree' initialPosition={{ x: 150, y: 150, w: 100, h: 300 }}>
        <Properties />
      </DraggableContainer>
    </div>
  )
}

export default App
