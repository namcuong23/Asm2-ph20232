import { Button, Form, Input, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ICategory } from '../../interface/category';
import { IProduct } from '../../interface/products';
import axios from 'axios';
type TProps = {
    onAdd: (product: IProduct) => void
    categories: ICategory;
}

const ProductAdd = (props: TProps) => {

    const navigate = useNavigate()
    // const [data, setData] = useState<ICategory[]>([])
    // useEffect(() => {
    //     getAllCategories().then(({ data }) => setData(data))
    // }, [])

    const onFinish = (values: any) => {
        console.log(values);
        props.onAdd(values)
        navigate('/admin/products')
        alert("Thêm thành công")
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div>
            <h1>Product Add</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }
                }
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Nhập tên vàooooooo' },
                    { whitespace: true, message: "Truong nay bat buoc nhap" }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Nhập giá vàooooooooooo' }
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="image"
                    name="image"
                    rules={[{ required: true, message: 'Thêm ảnh vàooooooooooo' }, { whitespace: true, message: "Truong nay bat buoc nhap" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Desc"
                    name="desc"
                    rules={[{ required: true, message: 'Nhập giá vàooooooooooo' }, { whitespace: true, message: "Truong nay bat buoc nhap" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[{ required: true, message: 'Nhập danh mục vào' }, { whitespace: true, message: "Truong nay bat buoc nhap" }]}
                >
                    <select name="" id="">
                        ${props.categories.map((item: any) => {
                            return <option value={item._id}  >{item.name}</option>


                        })}

                    </select>

                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form >
        </div>
    )

}

export default ProductAdd