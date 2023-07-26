import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
// fetch data from redux store 
import { getUserData } from '../store/actions/todoAction'
// internal file for css and contant path
import { toast } from "react-hot-toast";
import Todos from "./todos";
import style from '../assets/css/todo.module.css'
import { RotatingLines } from "react-loader-spinner";

export default function MainCmp() {
    const { userNotes, loading } = useSelector((state) => state.todoList)
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm();
    const [showForm, setShowForm] = useState(false);

    let token = localStorage.getItem('usertoken');
    async function addTodo({ titleAdd, DescriptionAdd }) {
        await axios.post(process.env.REACT_APP_BASEURL, { titleAdd, DescriptionAdd, token })
        toast.success('Record Added successfully');
        setShowForm(false)
        dispatch(getUserData(token))
        reset()
    }
    useEffect(() => {
        dispatch(getUserData(token))
    }, []);
    return (
        <div className={style.noteCard}>
            {loading ? <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            /> : null}
            {showForm ?
                <form onSubmit={handleSubmit(addTodo)} className={style.form}>
                    <input className={style.titleInput} placeholder='Take A note' {...register('titleAdd')} />
                    <input className={style.descInput} placeholder='Add Description' {...register('DescriptionAdd')} />
                    <input type="submit" value='Add' className={style.add} />
                </form> : ''
            }
            <Todos userNotes={userNotes} />
            <footer className={style.plusBtn} onClick={() => { setShowForm(!showForm) }}>+</footer>
        </div >
    )
}
