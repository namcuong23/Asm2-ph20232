import React from 'react'
import { useForm } from "react-hook-form"
import { login } from '../../api/signin'
import { useNavigate } from 'react-router-dom'
type Props = {

}

const Signin = (props: Props) => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onHandleSubmit = async (data: any) => {
        const { data: user } = await login(data)
        console.log("user", user);
        localStorage.setItem('user', JSON.stringify(user))

        navigate('/')

        alert("Đăng nhập thành công !")

    }
    return (
        <div>Signin


            {/* <form onSubmit={handleSubmit(onHandleSubmit)}>
                <input type="text"  {...register("email")} />
                <input type="text"  {...register("password")} />
                <button>Submit</button>
            </form> */}
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control"  {...register("email")} />

                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="text" className="form-control" {...register("password")} />
                </div>

                <button className="btn btn-primary">Submit</button>
            </form>
        </div >
    )
}

export default Signin