import { Box, Button, Paper, Stack, TextField } from "@mui/material"

interface Props { }

export default function Calculator(_props: Props) {
  return (
    <Box data-testid="Calculator">
      <Paper elevation={4}>
        <Stack direction={"row"}>
          <Stack direction={"column"} margin={2} spacing={1}>
            <TextField
              value={formatedInputs}
              inputProps={{ readOnly: true, "data-testid": "inputs"  }}
            />
            <TextField
              value={formatedOutput}
              inputProps={{ readOnly: true, "data-testid": "output"  }}
            />
            <Stack direction={"row"} spacing={1}>
              <Button variant="text" size="large" onClick={() => insert("+")}>+</Button>
              <Button variant="text" size="large" onClick={() => insert("-")}>-</Button>
              <Button variant="text" size="large" onClick={() => insert("×")}>×</Button>
              <Button variant="text" size="large" onClick={() => insert("÷")}>÷</Button>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Button variant="text" size="large" onClick={() => insert("7")}>7</Button>
              <Button variant="text" size="large" onClick={() => insert("8")}>8</Button>
              <Button variant="text" size="large" onClick={() => insert("9")}>9</Button>
              <Button variant="text" size="large" color="warning" onClick={remove}>↩</Button>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Stack direction={"column"} spacing={1}>
                <Button variant="text" size="large" onClick={() => insert("4")}>4</Button>
                <Button variant="text" size="large" onClick={() => insert("1")}>1</Button>
                <Button variant="text" size="large" onClick={() => insert(".")}>.</Button>
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Button variant="text" size="large" onClick={() => insert("5")}>5</Button>
                <Button variant="text" size="large" onClick={() => insert("2")}>2</Button>
                <Button variant="text" size="large" onClick={() => insert("0")}>0</Button>
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Button variant="text" size="large" onClick={() => insert("6")}>6</Button>
                <Button variant="text" size="large" onClick={() => insert("3")}>3</Button>
                <Button variant="text" size="large" color="warning" onClick={clear}>C</Button>
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Button variant="text" size="large" sx={{ height: "100%" }}>=</Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}
