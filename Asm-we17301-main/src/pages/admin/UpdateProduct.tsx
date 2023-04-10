import { Form, Input } from 'antd';
import { useEffect, useState } from 'react';
// import { UploadOutlined } from '@ant-design/icons';
// import type { UploadProps } from 'antd';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '../../interface/products';
import { ICategory } from '../../interface/category';
import { getOneProduct } from '../../api/products';
// import { getOneProduct } from '../../api/products';
type TProps = {
    products: IProduct[]
    onUpdate: (product: IProduct[]) => void
    category: ICategory[];
}


const UpdateProduct = (props: TProps) => {

    const { _id } = useParams()

    const navigate = useNavigate()
    const [product, setProduct] = useState<IProduct>()
    useEffect(() => {
        getOneProduct(_id).then(({ data }) => setProduct(data)
        )
    }, [])

    const [form] = Form.useForm();
    form.setFieldsValue({
        _id: product?._id,
        name: product?.name,
        price: product?.price,
        image: product?.image,
        desc: product?.desc,
        categoryId: product?.categoryId
    })
    const onFinish = (values: any) => {
        props.onUpdate(values)
        navigate('/admin/products')
        alert(" Update thành công")
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <h1>Product Update</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }
                }
                form={form}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label=""
                    name="_id"
                    style={{ display: 'none' }}
                    rules={[{ required: true, message: 'Nhập tên vàooooooo' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Nhập tên vàooooooo' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Nhập giá vàooooooooooo' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Thêm ảnh vàooooooooooo' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Desc"
                    name="desc"
                    rules={[{ required: true, message: 'Nhập giá vàooooooooooo' }]}
                >
                    <Input />
                </Form.Item>
                {/* <Form.Item
                    label="id"
                    name="_id"
                    rules={[{ required: true, message: 'Nhập giá vàooooooooooo' }]}
                >
                    <Input />
                </Form.Item> */}
                {/* <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[{ required: true, message: 'Nhập danh mục vào' }]}
                >
                    <select name="" id="">
                        ${props.category.map((item: any) => {
                            return <option value={item._id}  >{item.name}</option>

                        })}

                    </select>

                </Form.Item> */}


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form >
        </div>
    )
}

export default UpdateProduct