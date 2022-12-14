import { useState } from "react"
import { Box, Button, Paper, Stack, TextField } from "@mui/material"

interface Props { }

export default function Calculator(_props: Props) {
  const [inputs, setInputs] = useState<string[]>([])
  const [output, setOutput] = useState<number>(NaN)
  const [lastValidOutput, setLastValidOutput] = useState<number>(NaN)

  function update(inputs: string[]) {
    const nextOutput = compute(inputs)

    setInputs(inputs)
    setOutput(nextOutput)
    if (!isOutputValid(nextOutput)) setLastValidOutput(nextOutput)
  }

  function insert(input: string) {
    update([...inputs, input])
  }

  function remove() {
    if (inputs.length > 0) update(inputs.slice(0, inputs.length - 1))
  }

  function clear() {
    update([])
  }

  return (
    <Box data-testid="Calculator">
      <Paper elevation={4}>
        <Stack direction={"row"}>
          <Stack direction={"column"} margin={2} spacing={1}>
            <TextField
              value={formatInputs(inputs)}
              inputProps={{ readOnly: true, "data-testid": "inputs" }}
            />
            <TextField
              value={isInputsEmpty(inputs) ? "" : formatOutput(lastValidOutput)}
              disabled={isOutputValid(output)}
              inputProps={{ readOnly: true, "data-testid": "output" }}
            />
            <Stack direction={"row"} spacing={1}>
              <Button variant="text" size="large" onClick={() => insert("(")}>(</Button>
              <Button variant="text" size="large" onClick={() => insert(")")}>)</Button>
              <Button variant="text" size="large" color="warning" onClick={remove}>↩</Button>
              <Button variant="text" size="large" color="warning" onClick={clear}>C</Button>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Button variant="text" size="large" onClick={() => insert("7")}>7</Button>
              <Button variant="text" size="large" onClick={() => insert("8")}>8</Button>
              <Button variant="text" size="large" onClick={() => insert("9")}>9</Button>
              <Button variant="text" size="large" onClick={() => insert("+")}>+</Button>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Button variant="text" size="large" onClick={() => insert("4")}>4</Button>
              <Button variant="text" size="large" onClick={() => insert("5")}>5</Button>
              <Button variant="text" size="large" onClick={() => insert("6")}>6</Button>
              <Button variant="text" size="large" onClick={() => insert("-")}>-</Button>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Button variant="text" size="large" onClick={() => insert("1")}>1</Button>
              <Button variant="text" size="large" onClick={() => insert("2")}>2</Button>
              <Button variant="text" size="large" onClick={() => insert("3")}>3</Button>
              <Button variant="text" size="large" onClick={() => insert("×")}>×</Button>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Button variant="text" size="large" onClick={() => insert(".")}>.</Button>
              <Button variant="text" size="large" onClick={() => insert("0")}>0</Button>
              <Button variant="text" size="large" disabled></Button>
              <Button variant="text" size="large" onClick={() => insert("÷")}>÷</Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

function compute(inputs: string[]): number {
  try {
    return Number(eval(formatInputsForEval(inputs)))
  } catch (_error) {
    return NaN
  }
}

function formatInputs(inputs: string[]): string {
  return inputs.join("")
}

function formatInputsForEval(inputs: string[]): string {
  return inputs.map(input => {
    switch (input) {
      case "×":
        return "*"
      case "÷":
        return "/"
      default:
        return input
    }
  }).join("")
}

function formatOutput(output: number): string {
  if (isOutputValid(output)) return ""
  else return String(output)
}

function isInputsEmpty(inputs: string[]) {
  return inputs.length === 0
}

function isOutputValid(output: number) {
  return Number.isNaN(output)
}
