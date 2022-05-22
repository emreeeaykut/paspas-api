import { Request, Response } from 'express'
import { sign, verify } from 'jsonwebtoken'
import common from '@config/common'
import { User } from '@entities/user.entity'
import { getRepository } from 'typeorm'

export const createAccessToken = (user: User) => {
  return sign({ user }, common.accessTokenSecret!, {
    expiresIn: common.accessTokenExpiresIn,
  })
}

export const createRefreshToken = (user: User) => {
  return sign({ user }, common.refreshTokenSecret!, {
    expiresIn: common.refreshTokenExpiresIn,
  })
}

export const setRefreshtoken = (res: Response, token: string) => {
  res.cookie('jref', token, {
    httpOnly: true,
    path: '/refresh-token',
  })
}

export const handleRefreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.jref

  if (!token) return res.json({ status: false, accessToken: '' })

  let payload = null

  try {
    payload = verify(token, common.refreshTokenSecret!) as any
  } catch (err) {
    return res.send({ status: false, accessToken: '' })
  }

  const {
    user: { id: userId },
  } = payload!

  const user = await getRepository(User).findOne({ id: userId })

  if (!user) {
    return res.send({ status: false, accessToken: '' })
  }

  setRefreshtoken(res, createRefreshToken(user))

  return res.send({ status: true, accessToken: createAccessToken(user) })
}
