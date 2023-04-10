import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { useEffect, useRef, useState } from 'react';
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { getAllProducts } from '../../api/products';
import { IProduct } from '../../interface/products';

interface DataType {
    _id: string | number,
    key: number;
    name: string;
    price: number,
    image: string,
    desc: string
    categoryId: string | number
}


type IProps = {
    products: IProduct[],
    setProducts: IProduct[]
    onRemove: (_id: string | number) => void
}

const Productadmin = (props: IProps) => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): ColumnType<DataType> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys as string[], confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="default"
                        onClick={() =>
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });
    // console.log(props.products);
    useEffect(() => {
        getAllProducts().then(({ data }) => props.setProducts(data.data)
        );
    }, [props]);


    const removeProduct = (_id: string | number) => {
        if (confirm("Có chắc muốn xóa ?") == true) {
            props.onRemove(_id)
        } else {
            alert("Đã hủy xóa")
        }

    }
    const columns: ColumnsType<IProduct> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <p>{text}</p>,
            ...getColumnSearchProps("name"),
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <p>{text}</p>,
            ...getColumnSearchProps("price"),
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img width={200} src={text} />,
        },
        {
            title: 'Desc',
            dataIndex: 'desc',
            key: 'desc',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => removeProduct(record._id)}>Xóa</Button>
                    <Button type="primary"><Link to={`/admin/products/${record._id}/update`}>UpDate</Link></Button>
                </Space >
            ),
        },
    ];
    // const data: DataType[] = props.products.map((item: any) => {
    //     return ({
    //         key: item.id,
    //         ...item,
    //     }
    //     )
    // })

    return (<div>
        <Table columns={columns} dataSource={props.products} pagination={{ pageSize: 4 }} />
        <Button type="primary"><a href="/admin/products/add">Thêm </a></Button>
    </div>

    )
}

export default Productadmin