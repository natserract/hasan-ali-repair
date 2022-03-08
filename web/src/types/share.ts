export type Access = {
  admin: any[]
  client: string[]
}

export type CurrentUser = {
  id: number
  name: string
  password?: string
  address: string
  email: string
  phone_number: string
  user_type: 'admin' | 'customer'
  exp?: number
  iat?: number
}

export type ScheduleStatus =
  | 'pending'
  | 'approved'
  | 'unapproved'
  | 'on review'
  | 'on progress'
  | 'cancelled'
  | 'complete'
