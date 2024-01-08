export default interface ReactElement {
  id: string
  tag: string
  attributes: any
  style?: React.CSSProperties
  children?: ReactElement[]
  isActive?: boolean
}