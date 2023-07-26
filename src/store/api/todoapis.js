import axios from "axios"
import { path } from "../constant"

// export const fetchTodo = () => {
//     return axios.get(path.getTodo)
// }
export const fetchVerify = (token) => {
    return axios.post(path.verifyUser, { token })
}
export const fetchUserData = (token) => {
    return axios.post(path.getUserData, { token })
}