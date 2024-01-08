import * as React from 'react'
import './DraggableContainer.css'

interface Position {
  x: number
  y: number
  h: number
  w: number
}

interface DraggableContainerProps {
  children?: React.ReactNode
  initialPosition: Position
  title: string
}

type MouseAction = 'Move' | 'N-Size' | 'S-Size' | 'E-Size' | 'W-Size' | 'NE-Size' | 'NW-Size' | 'SW-Size' | 'SE-Size' | null

const getCusor = (mouseAction: MouseAction) => {
  switch (mouseAction) {
    case 'N-Size':
      return 'n-resize'
    case 'S-Size':
      return 's-resize'
    case 'E-Size':
      return 'e-resize'
    case 'W-Size':
      return 'w-resize'
    case 'NE-Size':
      return 'ne-resize'
    case 'NW-Size':
      return 'nw-resize'
    case 'SW-Size':
      return 'sw-resize'
    case 'SE-Size':
      return 'se-resize'
  }
}

const DraggableContainer: React.FC<DraggableContainerProps> = ({
  children,
  initialPosition,
  title
}) => {
  const sizeDivRef = React.useRef<HTMLDivElement | null>(null)
  const dragDivRef = React.useRef<HTMLDivElement | null>(null)
  const [position, setPosition] = React.useState<Position>(initialPosition)
  const [mouseAction, setMouseAction] = React.useState<MouseAction>(null)
  const [preprosedMouseAction, setPreproseMouseAction] = React.useState<MouseAction>(null)

  React.useEffect(() => {
    const mouseDown = (event: MouseEvent) => {
      if (event.buttons === 1 && mouseAction === null) {
        if (preprosedMouseAction !== null) {
          setMouseAction(preprosedMouseAction)
        } else if (dragDivRef.current &&
          event.target &&
          dragDivRef.current.contains(event.target as Node)) {
          setMouseAction('Move')
        }
      }
    }
    const mouseUp = () => {
      setMouseAction(null)
    }
    const mouseMove = (event: MouseEvent) => {
      {
        const h = dragDivRef.current?.clientHeight
        const w = dragDivRef.current?.clientWidth
        if (mouseAction === 'Move') {
          setPosition(p => {
            return {
              x: p.x + event.movementX,
              y: p.y + event.movementY,
              h: p.h,
              w: p.w
            }
          })
        } if (mouseAction !== null && h && w) {
          if (mouseAction === 'N-Size') {
            setPosition(p => {
              return {
                x: p.x,
                y: (p.h - event.movementY) > h ? p.y + event.movementY : p.y,
                h: (p.h - event.movementY) > h ? p.h - event.movementY : p.h,
                w: p.w
              }
            })
          } else if (mouseAction === 'S-Size') {
            setPosition(p => {
              return {
                x: p.x,
                y: p.y,
                h: (p.h + event.movementY) > h ? p.h + event.movementY : p.h,
                w: p.w
              }
            })
          } else if (mouseAction === 'W-Size') {
            setPosition(p => {
              return {
                x: (p.w - event.movementX) > 40 ? p.x + event.movementX : p.x,
                y: p.y,
                h: p.h,
                w: (p.w - event.movementX) > 40 ? p.w - event.movementX : p.w
              }
            })
          } else if (mouseAction === 'E-Size') {
            setPosition(p => {
              return {
                x: p.x,
                y: p.y,
                h: p.h,
                w: (p.w + event.movementX) > 40 ? p.w + event.movementX : p.w
              }
            })
          } else if (mouseAction === 'NE-Size') {
            setPosition(p => {
              return {
                x: p.x,
                y: (p.h - event.movementY) > h ? p.y + event.movementY : p.y,
                h: (p.h - event.movementY) > h ? p.h - event.movementY : p.h,
                w: (p.w + event.movementX) > 40 ? p.w + event.movementX : p.w
              }
            })
          } else if (mouseAction === 'NW-Size') {
            setPosition(p => {
              return {
                x: (p.w - event.movementX) > 40 ? p.x + event.movementX : p.x,
                y: (p.h - event.movementY) > h ? p.y + event.movementY : p.y,
                h: (p.h - event.movementY) > h ? p.h - event.movementY : p.h,
                w: (p.w - event.movementX) > 40 ? p.w - event.movementX : p.w
              }
            })
          } else if (mouseAction === 'SE-Size') {
            setPosition(p => {
              return {
                x: p.x,
                y: p.y,
                h: (p.h + event.movementY) > h ? p.h + event.movementY : p.h,
                w: (p.w + event.movementX) > 40 ? p.w + event.movementX : p.w
              }
            })
          } else if (mouseAction === 'SW-Size') {
            setPosition(p => {
              return {
                x: (p.w - event.movementX) > 40 ? p.x + event.movementX : p.x,
                y: p.y,
                h: (p.h + event.movementY) > h ? p.h + event.movementY : p.h,
                w: (p.w - event.movementX) > 40 ? p.w - event.movementX : p.w
              }
            })
          }
        } else if (sizeDivRef.current &&
          event.target &&
          sizeDivRef.current.contains(event.target as Node) &&
          event.buttons === 0) {
          const clientX = event.clientX - sizeDivRef.current.offsetLeft
          const clientY = event.clientY - sizeDivRef.current.offsetTop
          const topPos = clientY < 6
          const leftPos = clientX < 6
          const bottomPos = (sizeDivRef.current.offsetHeight - clientY) < 6
          const rightPos = (sizeDivRef.current.offsetWidth - clientX) < 6
          setPreproseMouseAction(
            topPos && leftPos
              ? 'NW-Size'
              : topPos && rightPos
                ? 'NE-Size'
                : bottomPos && leftPos
                  ? 'SW-Size'
                  : bottomPos && rightPos
                    ? 'SE-Size'
                    : topPos
                      ? 'N-Size'
                      : bottomPos
                        ? 'S-Size'
                        : leftPos
                          ? 'W-Size'
                          : rightPos
                            ? 'E-Size'
                            : null
          )
        } else if (preprosedMouseAction !== null) {
          setPreproseMouseAction(null)
        }
      }
    }
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mousedown', mouseDown)
    document.addEventListener('mouseup', mouseUp)
    return () => {
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mousedown', mouseDown)
      document.removeEventListener('mouseup', mouseUp)
    }
  }, [mouseAction, preprosedMouseAction])


  return (
    <div
      ref={sizeDivRef}
      className='draggableMain'
      style={{
        top: position.y,
        left: position.x,
        height: position.h,
        width: position.w,
        cursor: getCusor(preprosedMouseAction)
      }}
      draggable={false}
    >
      <div
        ref={dragDivRef}
        draggable={false}
        className='draggableToolBar'
      >
        <span className='draggableTitle' draggable={false}>{title}</span>
      </div>
      <div className='draggableContentArea'>
        {children}
      </div>
    </div>
  )
}

export default DraggableContainer