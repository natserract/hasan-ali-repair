import { ReactNode } from 'react'

export interface IResourceContext {
  resources: IResourceItem[]
}

export interface IResourceItem extends IResourceComponents {
  name: string
  label?: string
  route?: string
  icon?: ReactNode
  canCreate?: boolean
  canEdit?: boolean
  canShow?: boolean
  canDelete?: boolean
}

export interface IResourceComponentsProps<TCrudData = any> {
  canCreate?: boolean
  canEdit?: boolean
  canDelete?: boolean
  canShow?: boolean
  resourceName?: string
  initialData?: TCrudData
}

export interface IResourceComponents {
  list?: React.FunctionComponent<IResourceComponentsProps>
  create?: React.FunctionComponent<IResourceComponentsProps>
  edit?: React.FunctionComponent<IResourceComponentsProps>
  show?: React.FunctionComponent<IResourceComponentsProps>
  pure?: React.FunctionComponent<IResourceComponentsProps>
}
