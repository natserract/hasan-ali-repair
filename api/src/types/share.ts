export type InputOptions = {
  sort: string
  filter: string
  start: number
  limit: number
}

export type InputList = {
  input: Partial<InputOptions>
}
