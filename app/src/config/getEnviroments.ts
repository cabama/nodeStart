import * as path from 'path'

const hello = process.env.HELLO_WORLD
const session = process.env.SESSION_SECRET

const googleEnabled = process.env.GOOGLE_ENABLED
const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

export var sessionSecret = session
export var google = {
  enabled: googleEnabled,
  clientId: googleClientId,
  clientSecret: googleClientSecret
}

export const BasePath = path.dirname(path.dirname(__dirname))
export const PublicPath = path.join(BasePath, 'public')
