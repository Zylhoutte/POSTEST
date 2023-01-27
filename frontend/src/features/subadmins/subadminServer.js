import axios from 'axios'
const API_URL = '/api/subadmins/'




//login user

const login = async (subadminData) => {
    const response = await axios.post(API_URL +'subadmin', subadminData)

    if(response.data) {
        localStorage.setItem('subadmin', JSON.stringify(response.data))
    }


    return response.data
}


//logout
const logout = () => {
    localStorage.removeItem('subadmin')
  }
  


const authService = {
    logout,
    login,

}

export default authService 