import * as React from "react"
import scratchblocks, { RenderOptions } from "scratchblocks-plus"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  blockStyle?: "scratch2" | "scratch3" | "scratch3-high-contrast"
  languages?: string[]
  inline?: boolean
  scale?: number
}

class ScratchBlocks extends React.Component {
  isBrowser: boolean
  blockRef: React.RefObject<any>
  props: Props

  constructor(props: Props) {
    super(props)

    this.isBrowser = typeof window != "undefined"
    this.blockRef = React.createRef()
  }

  async renderBlocks() {
    let options: RenderOptions = {}
    if (this.props.blockStyle !== undefined)
      options.style = this.props.blockStyle
    else options.style = "scratch3"
    if (this.props.languages !== undefined)
      options.languages = this.props.languages
    if (this.props.inline !== undefined) options.inline = this.props.inline
    if (this.props.scale !== undefined) options.scale = this.props.scale
    else options.scale = /^scratch3($|-)/.test(options.style) ? 0.675 : 1

    const doc = scratchblocks.parse(this.props.children.toString(), options)
    const svg = scratchblocks.render(doc, options)

    const node: any = this.blockRef.current
    if (node == null) {
      return
    }
    node.innerHTML = ""
    node.appendChild(svg)
  }

  setBlockCode() {
    const node: any = this.blockRef.current
    if (node == null) {
      return
    }
    node.innerHTML = ""
    let el = <code>{this.props.children}</code>
    if (!this.props.inline) {
      el = <pre>{el}</pre>
    }
    node.appendChild(el)
  }

  componentDidMount() {
    if (this.isBrowser) {
      this.renderBlocks()
    } else {
      this.setBlockCode()
    }
  }

  render() {
    if (this.props.inline) {
      return (
        <span
          ref={this.blockRef}
          style={this.props.style}
          className={this.props.className}
        ></span>
      )
    } else {
      return (
        <div
          ref={this.blockRef}
          style={this.props.style}
          className={this.props.className}
        ></div>
      )
    }
  }
}

export default ScratchBlocks
