import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import style from '../assets/css/home.module.css'
import { setLogout } from '../store/slices/todoSlice';

export default function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isSetLogin } = useSelector((state) => state.todoList)
    function logout() {
        localStorage.clear();
        navigate('/')
        dispatch(setLogout(false))
    }
    return (
        <div className={style.wrapper}>

            <div className={style.navBar}>
                <div className={style.container}>
                    <div className={style.navHead}>
                        {isSetLogin ?
                            <span onClick={() => { logout() }}>LogOut</span> :
                            <Link to='/signup' className={style.login}><span>Login/SignUp</span></Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
