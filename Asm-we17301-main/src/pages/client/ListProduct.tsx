import React, { useEffect, useState } from 'react'
import { IProduct } from '../../interface/products'
import "bootstrap/dist/css/bootstrap.min.css"
interface IProps { // định nghĩa kiểu dữ liệu cho props truyền vào component
    products: IProduct[], // định nghĩa kiểu dữ liệu cho mảng products 
    // onRemove: (id: number) => void // định nghĩa kiểu dữ liệu cho hàm onRemove
}



const ListProduct = (props: IProps) => {
    const [data, setData] = useState<IProduct[]>([])
    useEffect(() => {
        setData(props.products)
    }, [props])
    return (
        <div style={{
            display: 'flex',

            justifyContent: 'center'
        }} className="container  text-center">

            <div>{data.map((item: any) => {

                return <div key={item._id} style={{ float: 'left', margin: '20px 10px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '5px 5px 5px gray,-5px -5px 5px gray', padding: '10px' }}>
                    <a className="text-decoration-none text-dark  " href={`/${item._id}/detail`}>
                        <h3>{item.name}</h3>
                        <img style={{ width: '200px', height: '180px', objectFit: 'cover' }} src={item.image} alt="" />
                        <p>Giá:{item.price}$</p>

                    </a>
                </div>
            })}</div>

        </div >
    )


}

export default ListProduct