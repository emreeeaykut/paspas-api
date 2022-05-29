import env from '@src/config/env'
import { MiddlewareFn } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import { AuthContext } from '@src/contexts/auth.context'

export const isAuth: MiddlewareFn<AuthContext> = ({ context }, next) => {
  const auth = context.req.headers['authorization']

  if (!auth) {
    throw new Error('Not authenticated!')
  }

  try {
    const token = auth.split(' ')[1]

    const payload = verify(token, env.accessTokenSecret!)

    context.payload = payload as any
  } catch (err: any) {
    throw new Error(err)
  }

  return next()
}
