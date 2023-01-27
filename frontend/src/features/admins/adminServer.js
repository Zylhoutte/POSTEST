import axios from 'axios'
const API_URL = '/api/admins/'




//login user

const login = async (adminData) => {
    const response = await axios.post(API_URL +'admin', adminData)

    if(response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data))
    }


    return response.data
}


//logout
const logout = () => {
    localStorage.removeItem('admin')
  }
  


const authService = {
    logout,
    login,

}

export default authService 