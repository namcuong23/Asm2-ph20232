import { Form, Input } from 'antd';
import { useEffect, useState } from 'react';
// import { UploadOutlined } from '@ant-design/icons';
// import type { UploadProps } from 'antd';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { ICategory } from '../../interface/category';
import { getOneCategory } from '../../api/category';

// import { getOneProduct } from '../../api/products';
type TProps = {

    onUpdateCate: (category: ICategory[]) => void
    category: ICategory[];
}


const UpdateCategory = (props: TProps) => {

    const { _id } = useParams()

    const navigate = useNavigate()
    const [category, setCategory] = useState<ICategory>()
    useEffect(() => {
        getOneCategory(_id).then(({ data }) => setCategory(data)
        )
    }, [])

    const [form] = Form.useForm();
    form.setFieldsValue({
        _id: category?._id,
        name: category?.name,
    })
    const onFinish = (values: any) => {
        props.onUpdateCate(values)
        navigate('/admin/category')
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



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form >
        </div>
    )
}

export default UpdateCategory