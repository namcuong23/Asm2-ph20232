import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom"
import './App.css'
// import { getCategories } from './api/category'
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "./api/products"
import { IProduct } from "./interface/products"
import Dasbroad from './pages/admin/Dasbroad'
import ProductAdd from './pages/admin/ProductAdd'
import UpdateProduct from './pages/admin/UpdateProduct'
import Productadmin from './pages/admin/products'
import DetailPro from './pages/client/DetailPro'
import HomePage from './pages/client/HomePage'
import ListProduct from './pages/client/ListProduct'
import Signin from './pages/client/Signin'
import { addCategory, deleteCategory, getAllCategories, updateCategory } from './api/category'
import { ICategory } from './interface/category'
import Category from './pages/admin/Category'
import axios from 'axios'
import AddCategory from './pages/admin/AddCategory'
import UpdateCategory from './pages/admin/UpdateCategory'
import Signup from './pages/client/SignUp'
import LogoutButton from './pages/client/SignOut'
import Statistics from './pages/admin/thongke'
import Thongke from './pages/admin/thongke'



function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await getAllProducts();
      setProducts(data.data);
    })();

  }, [])

  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await getAllCategories();
      setCategories(data);
    })();

  }, [])

  const onHandleRemove = (_id: string | number) => {
    deleteProduct(_id).then(() => setProducts(products.filter((items: IProduct) => items._id !== _id)))
  }
  const onHandleAdd = (product: IProduct) => {
    addProduct(product)
    // .then(() => getAllProducts().then(({ data }) => setProducts(data)))
  }
  const onHandleUpdate = (product: IProduct) => {
    // axios.put(`localhost:8080/api/products/${product._id}`, product)
    updateProduct(product)
    // .then(() => getAllProducts().then(({ data }) => setProducts(data)))
  }

  const onHandleAddCate = (category: ICategory) => {
    addCategory(category)
  }
  const onHandleRemoveCate = (_id: string | number) => {
    deleteCategory(_id).then(() => setCategories(categories.filter((items: ICategory) => items._id !== _id)))
  }
  const onHandleUpdateCate = (category: ICategory) => {
    // axios.put(`localhost:8080/api/products/${product._id}`, product)
    updateCategory(category)
    // .then(() => getAllProducts().then(({ data }) => setProducts(data)))
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<Dasbroad />} >
          <Route index element={<Thongke />} />
          <Route path="products">
            <Route index element={<Productadmin products={products} setProducts={setProducts} onRemove={onHandleRemove} />} />
            <Route path="add" element={<ProductAdd onAdd={onHandleAdd} categories={categories} />} />
            <Route path=":_id/update" element={<UpdateProduct products={products} onUpdate={onHandleUpdate} category={categories} />} />
          </Route>
          <Route path="category">
            <Route index element={<Category categories={categories} setCategories={setCategories} onRemoveCate={onHandleRemoveCate} />} />
            <Route path="add" element={<AddCategory onAddCate={onHandleAddCate} />} />
            <Route path=":_id/update" element={<UpdateCategory categories={categories} onUpdateCate={onHandleUpdateCate} />} />
          </Route>
        </Route>

        <Route path='/' element={<HomePage />}>
          <Route index element={<ListProduct products={products} />} />
          <Route path=":_id/detail" element={<DetailPro products={products} />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="logout" element={<LogoutButton />} />
        </Route>

      </Routes >
    </div >
  )
}

export default App
