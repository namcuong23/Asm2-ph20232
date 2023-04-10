import { ICategory } from "../interface/category";
import instance from "./instance";

export const getAllCategories = () => {

    return instance.get('/category')
}

export const deleteCategory = (_id: string | number) => {
    const accessToken = JSON.parse(localStorage.getItem('user')!)

    return instance.delete(`/category/${_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
        }
    })
}
export const getOneCategory = (_id: string | number) => {
    return instance.get(`/category/${_id}`)
}
export const addCategory = (category: ICategory) => {

    const accessToken = JSON.parse(localStorage.getItem('user')!)

    return instance.post('/category', category, {
        headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
        }
    })
}

export const updateCategory = (category: ICategory) => {
    const accessToken = JSON.parse(localStorage.getItem('user')!)
    return instance.put(`/category/${category._id}`, category, {
        headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
        }
    })
}