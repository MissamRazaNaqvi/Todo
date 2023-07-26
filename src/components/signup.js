import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import style from '../assets/css/login.module.css'
import { setlogin } from '../store/slices/todoSlice';
import { getUserData } from '../store/actions/todoAction';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function userLogin({ firstname, username, password }) {
        if (isLogin) {
            let { data } = await axios.post(`${process.env.REACT_APP_BASEURL}/login`, { username, password })
            // console.log('full data of user specific ', data)
            if (data[0].credential === 'success') {
                localStorage.setItem('usertoken', data[1].token);
                toast.success('login successfully');
                dispatch(setlogin(true))
                dispatch(getUserData(data[1].token))
                navigate('/')
            }
            else if (data[0].credential === 'failed') {
                toast.error('please enter valid username and password');
            }
        }
        else {
            setIsLogin(!isLogin)
            await axios.post(`${process.env.REACT_APP_BASEURL}/register`, { firstname, username, password })
        }
    }
    return (
        <div className={style.wrapper}>
            <form onSubmit={handleSubmit(userLogin)} className={style.login}>
                <div className={style.formContent}>
                    {!isLogin ?
                        <input type='text' placeholder='firstname' className={style.firstname} {...register('firstname', { required: true })} aria-invalid={errors.firstname ? "true" : "false"} /> : ''
                    }
                    {errors.firstname?.type === 'required' && <div className={style.err} role="alert">Name is required</div>}
                    <input type='text' placeholder='username' className={style.loginUser} {...register('username', { required: true })} aria-invalid={errors.username ? "true" : "false"} />
                    {errors.username?.type === 'required' && <div className={style.err} role="alert">username is required</div>}
                    <input type='password' placeholder='password' className={style.loginPass} {...register('password', { required: true })} aria-invalid={errors.password ? "true" : "false"} />
                    {errors.password?.type === 'required' && <div className={style.err} role="alert">password is required</div>}
                    <div className={style.registrationBtn}>
                        {isLogin ?
                            <input type="submit" value='Login' className={style.loginBtn} />
                            :
                            <input type="submit" value='SignUp' className={style.loginBtn} />
                        }
                        <input type="submit" value='cancel' className={style.cancelBtn} onClick={() => { }} />
                    </div>
                    {isLogin ?
                        <p>Create Account<span className={style.linkStyle} onClick={() => { setIsLogin(!isLogin) }}>signup</span></p> :
                        <p>Already have an Account ? <span className={style.linkStyle} onClick={() => { setIsLogin(!isLogin) }} >login</span></p>
                    }
                </div>
            </form>
        </div>
    )
}
