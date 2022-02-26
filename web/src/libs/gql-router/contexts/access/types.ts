// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IAccessControlContext<T = any> {
  access: IGenericAccessControl<T>
  currentRole: string
}

export type IGenericAccessControl<T = string[]> = {
  [Property in keyof T]: string[]
}
