# scratchblocks-plus-react

Render [scratchblocks-plus](https://github.com/LuYifei2011/scratchblocks-plus) in React!

## Installation

```bash
npm install scratchblocks-plus scratchblocks-plus-react
# or
yarn add scratchblocks-plus scratchblocks-plus-react
```

Note that in addition to the `scratchblocks-plus-react` package, you must have `scratchblocks-plus` installed (and `react`).

## Usage

### Simple

```jsx
import ScratchBlocks from "scratchblocks-plus-react"

function MyComponent() {
  return (
    <ScratchBlocks>
      {`
        when green flag clicked
        forever {
          move (10) steps
        }
      `}
    </ScratchBlocks>
  )
}
```

### Dynamic

In this example, the user can edit the Scratch code.

```jsx
import ScratchBlocks from "scratchblocks-plus-react"

function MyComponent() {
  const [code, setCode] = useState("move (10) steps")

  return (
    <div>
      <textarea
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <ScratchBlocks>{code}</ScratchBlocks>
    </div>
  )
}
```

### Non-English Languages

```jsx
import ScratchBlocks from "scratchblocks-plus-react"

// Load some extra languages (English comes loaded by default)
import scratchblocks from "scratchblocks-plus"
import es from "scratchblocks-plus/locales/es.json" // Spanish
import de from "scratchblocks-plus/locales/de.json" // German

// Register the language files with scratchblocks
scratchblocks.loadLanguages({ es, de })

function MyComponent() {
  return (
    <ScratchBlocks
      languages={["en", "es", "de"]} // Choose which languages to allow
    >
      {`
        when green flag clicked
        por siempre
          gehe (10) er Schritt
        fin
      `}
    </ScratchBlocks>
  )
}
```

## Available Props

| Name       | Default    | Valid Values                                        | Description                                                          |
| ---------- | ---------- | --------------------------------------------------- | -------------------------------------------------------------------- |
| blockStyle | "scratch3" | "scratch2", "scratch3", or "scratch3-high-contrast" | Changes the visual style of the rendered blocks.                     |
| languages  | ["en"]     | An array of language codes such as ["en", "de"]     | Enables the use of non-english languages. Requires additional setup. |
| inline     | {false}    | {true} or {false}                                   | Write scratchblocks-plus inline in text. This is not recommended.    |
| scale      | {0.675}    | Any positive number                                 | Scales the rendered blocks.                                          |

> [!Note]
> The `scale` prop's default value is `0.675` when `blockStyle` is `scratch3` or `scratch3-high-contrast`, and `1` otherwise.
