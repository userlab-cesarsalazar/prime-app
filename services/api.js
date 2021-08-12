//import config from './credentials'
import axios from 'axios'
import { getToken, saveProfile } from './utils'
import { USER_PROFILE, USER_PACKAGES_1 } from '@env'

export const getUserInformation = async () => {
  const rsp = await makeRequest(`${USER_PROFILE}`, 'GET', null)
  saveProfile(rsp.data[0])
  return rsp.data[0]
}

export const getInformationPackage = async client_id => {
  const rsp = await makeRequest(`${USER_PACKAGES_1}/${client_id}/packages`, 'GET', null)
  return rsp.data.packages
}

const makeRequest = async (URL, METHOD, DATA) =>
  await axios({
    method: METHOD,
    url: URL,
    headers: {
      Authorization: await getToken(),
    },
    data: DATA ? DATA : null,
  })
