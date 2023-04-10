import React from 'react'
import { useForm } from "react-hook-form"
import { logup } from '../../api/signup'
import { useNavigate } from 'react-router-dom'
type Props = {

}

const Signup = (props: Props) => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onHandleSubmit = async (data: any) => {
        const { data: user } = await logup(data)
        console.log("user", user);
        localStorage.setItem('user', JSON.stringify(user))

        navigate('/signin')

        alert("Đăng kí thành công !")

    }
    return (
        <div>Signup


            {/* <form onSubmit={handleSubmit(onHandleSubmit)}>
                <input type="text"  {...register("email")} />
                <input type="text"  {...register("password")} />
                <button>Submit</button>
            </form> */}
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="mb-3">

                    <label className="form-label">Tên</label>
                    <input type="text" className="form-control"  {...register("name")} />

                </div>
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

export default Signup