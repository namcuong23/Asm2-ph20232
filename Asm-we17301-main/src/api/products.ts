
import { IProduct } from "../interface/products"
import instance from "./instance"





export const getAllProducts = () => {

    return instance.get('/products')
}

export const deleteProduct = (_id: string | number) => {
    const accessToken = JSON.parse(localStorage.getItem('user')!)

    return instance.delete(`/products/${_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
        }
    })
}
export const getOneProduct = (_id: string | number) => {
    return instance.get(`/products/${_id}`)
}
export const addProduct = (products: IProduct) => {

    const accessToken = JSON.parse(localStorage.getItem('user')!)

    return instance.post('/products', products, {
        headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
        }
    })
}

export const updateProduct = (product: IProduct) => {
    const accessToken = JSON.parse(localStorage.getItem('user')!)
    return instance.put(`/products/${product._id}`, product, {
        headers: {
            Authorization: `Bearer ${accessToken.accessToken}`
        }
    })
}

