import { Cache } from 'aws-amplify'

export const getToken = () => {
  const tokenId = JSON.parse(Cache.getItem('mobile-app-user')).idToken
  return `Bearer ${tokenId.jwtToken}`
}

export const saveProfile = profile => {
  return Cache.setItem('mobile-app-profile', JSON.stringify(profile))
}

export const getProfile = () => {
  const profile = JSON.parse(Cache.getItem('mobile-app-profile')).idToken
  return profile
}
