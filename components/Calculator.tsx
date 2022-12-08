import { Box, Button, Paper, Stack, TextField } from "@mui/material"

interface Props { }

export default function Calculator(_props: Props) {
  return (
    <Box data-testid="Calculator">
      <Paper elevation={4}>
        <Stack direction={"row"}>
          <Stack direction={"column"} margin={2} spacing={1}>
            <TextField
              InputProps={{ readOnly: true }}
              data-testid="Calculator.calculation"
            />
            <TextField
              InputProps={{ readOnly: true }}
              data-testid="Calculator.result"
            />
            <Stack direction={"row"} spacing={1}>
              <Button variant="text" size="large">+</Button>
              <Button variant="text" size="large">-</Button>
              <Button variant="text" size="large">×</Button>
              <Button variant="text" size="large">÷</Button>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Button variant="text" size="large">7</Button>
              <Button variant="text" size="large">8</Button>
              <Button variant="text" size="large">9</Button>
              <Button variant="text" size="large" color="warning">↩</Button>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Stack direction={"column"} spacing={1}>
                <Button variant="text" size="large">4</Button>
                <Button variant="text" size="large">1</Button>
                <Button variant="text" size="large">.</Button>
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Button variant="text" size="large">5</Button>
                <Button variant="text" size="large">2</Button>
                <Button variant="text" size="large">0</Button>
              </Stack>
              <Stack direction={"column"} spacing={1}>
                <Button variant="text" size="large">6</Button>
                <Button variant="text" size="large">3</Button>
                <Button variant="text" size="large" color="warning">C</Button>
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
