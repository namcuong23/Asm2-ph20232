import react, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IProduct } from '../../interface/products'

interface IProps {
    products: IProduct[]
}

const DetailPro = (props: IProps) => {
    const { _id } = useParams()
    const [product, setProduct] = useState<IProduct>()
    useEffect(() => {
        const currentProduct = props.products.find(item => item?._id === _id)
        setProduct(currentProduct)
    })
    return (
        <div className="container text-center" style={{ float: 'left', margin: '20px 10px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '5px 5px 5px gray,-5px -5px 5px gray' }}>
            <h1>{product?.name}</h1>
            <p>{product?.price}</p>
            <img style={{ width: '400px', height: '300px', objectFit: 'cover' }} src={product?.image} alt="" />
            <p>{product?.desc}</p>
        </div>
    )
}

export default DetailPro