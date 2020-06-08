import axios from 'axios'
const baseUrl = '/api/users'

const signIn = async credentials => {
  console.log(credentials)
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { signIn }
