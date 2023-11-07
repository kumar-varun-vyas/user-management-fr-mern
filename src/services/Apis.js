import { commonrequest } from "./ApiCall";
import { BASE_URL } from "./helper";

export const registerApi = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/user/register`, data, header)
}

export const getUsersApi = async (search, gender, status, sort, page) => {
    return await commonrequest("GET", `${BASE_URL}/user/getUsers?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`, '')
}
export const getSingleUser = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/user/${id}`, '')
}
export const updateUserApi = async (id, data, header) => {
    return await commonrequest("PUT", `${BASE_URL}/user/update/${id}`, data, header)
}
export const deleteUserApi = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/user/delete/${id}`, {})
}
export const statusUpdateApi = async (id, data) => {
    return await commonrequest("PUT", `${BASE_URL}/user/status/${id}`, { data })
}

export const exporttocsvApi = async () => {
    console.log("get export")
    return await commonrequest("GET", `${BASE_URL}/user/userexport`, '') //`${BASE_URL}/user/userexport`
}