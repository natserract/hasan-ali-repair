import { ReactNode } from "react";


export interface IResourceContext {
  resources: IResourceItem[];
}

export interface IResource extends IResourceItem {}

export interface IResourceItem extends IResourceComponents {
  name: string;
  label?: string;
  route?: string;
  icon?: ReactNode;
  canCreate?: boolean;
  canEdit?: boolean;
  canShow?: boolean;
  canDelete?: boolean;
}

export interface IResourceComponentsProps<TCrudData = any> {
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canShow?: boolean;
  name?: string;
  initialData?: TCrudData;
}

export interface IResourceComponents {
  list?: React.FunctionComponent<IResourceComponentsProps>;
  create?: React.FunctionComponent<IResourceComponentsProps>;
  edit?: React.FunctionComponent<IResourceComponentsProps>;
  show?: React.FunctionComponent<IResourceComponentsProps>;
  pure?: React.FunctionComponent<IResourceComponentsProps>;
}

export type RoutesProps = {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  [k: string]: any;
}
