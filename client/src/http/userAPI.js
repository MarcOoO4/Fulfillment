import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (FIO, phone, email, password) => {
    const {data} = await $host.post('api/user/registration', {FIO, phone, email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const fetchUsers = async () => {
    const {data} = await $authHost.get('api/user', )
    return data
}

export const fetchUser = async (id) => {
    const {data} = await $authHost.get(`api/user/${id}` )
    return data
}

