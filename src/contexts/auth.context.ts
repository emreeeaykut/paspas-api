import { User } from '@src/modules/user/user.entity'
import { Request, Response } from 'express'

export interface AuthContext {
  req: Request
  res: Response
  payload?: { user: Partial<User> }
}
