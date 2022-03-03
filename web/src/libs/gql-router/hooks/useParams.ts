import { useParams as useRouterParams } from 'react-router-dom'

type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined
}

type UseParamsReturn<
  ParamsOrKey extends string | Record<string, string | undefined> = string
> = Readonly<
  [ParamsOrKey] extends [string] ? Params<ParamsOrKey> : Partial<ParamsOrKey>
>

const useParams = (): UseParamsReturn => {
  const params = useRouterParams()

  return params
}

export { useParams }
