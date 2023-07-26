import style from '../assets/css/todo.module.css'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getUserData } from '../store/actions/todoAction';
export default function Todos({ userNotes }) {
    const { register, handleSubmit, setValue } = useForm();
    const dispatch = useDispatch()
    const [isUpdate, setIsUpdate] = useState(0);
    const [btnToggle, setBtnToggle] = useState(false);
    const [ticked, setTicked] = useState(false)
    let token = localStorage.getItem('usertoken')
    async function updateRecord({ titleUpdate, DescriptionUpdate }) {
        await axios.post(`${process.env.REACT_APP_BASEURL}/update`, { isUpdate, titleUpdate, DescriptionUpdate })
        dispatch(getUserData(token))
        toast.success('update  Record successfully');
        setIsUpdate(0)
        setBtnToggle(false)
    }
    function setRacord(id) {
        // console.log('id from setrecord function : ', id);
        const filter_data = userNotes.filter(item => item.id === id);
        setIsUpdate(filter_data[0].id);
        setValue('titleUpdate', filter_data[0].title)
        setValue('DescriptionUpdate', filter_data[0].description)
        setBtnToggle(id);
    }
    async function deleteData(id) {
        await axios.delete(`${process.env.REACT_APP_BASEURL}/${id}`)
        dispatch(getUserData(token))
        toast.error('delete  Record successfully');
    }
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                {userNotes && userNotes.map((todo, index) => {
                    return (
                        <div key={index} className={style.card}>
                            <div className={style.noteContent} >
                                {btnToggle === todo.id ?
                                    <form onSubmit={handleSubmit(updateRecord)} className={style.UpdateForm}>
                                        <input placeholder='Take A note' className={style.updateInput} {...register('titleUpdate', { required: true })} />
                                        <input placeholder='Add Description' className={style.updateInput} {...register('DescriptionUpdate', { required: true })} />
                                        <div>
                                            <input type="submit" value='update' className={style.updateBtn} />
                                            <input type="submit" value='cancel' className={style.cancelBtn} onClick={() => { setBtnToggle(false) }} />
                                        </div>
                                    </form> :
                                    <div onClick={() => { setRacord(todo.id); }}>
                                        <div className={`${ticked === todo.id ? style.checked : ''} ${style.titleNote}`}>{todo.title}</div>
                                        <div className={`${ticked === todo.id ? style.checked : ''} ${style.descNote}`}>{todo.description}</div>
                                    </div>
                                }
                                {/* <input type='checkbox' className={style.tick} onClick={() => { setTicked(todo.id) }}></input> */}
                            </div>
                            <div className={style.Btns}>
                                <button onClick={() => { deleteData(todo.id) }} className={style.deleteBtn}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15">
                                        <g id="trash-2" transform="translate(-29 4.998)">
                                            <path id="Union_10" data-name="Union 10" d="M3.407,15a1.95,1.95,0,0,1-1.972-1.92V3.84H.541a.543.543,0,0,1-.381-.154A.507.507,0,0,1,0,3.314a.532.532,0,0,1,.539-.521H3.588V1.92A1.952,1.952,0,0,1,5.563,0H8.437a1.949,1.949,0,0,1,1.972,1.92v.873h3.053A.533.533,0,0,1,14,3.314V3.32a.53.53,0,0,1-.539.52h-.9v9.24A1.95,1.95,0,0,1,10.588,15Zm-.892-1.92a.884.884,0,0,0,.892.875h7.181a.888.888,0,0,0,.9-.875V3.84H9.872a.583.583,0,0,1-.06,0H4.186c-.021,0-.039,0-.06,0H2.514ZM9.333,2.793V1.92a.885.885,0,0,0-.9-.871H5.563a.889.889,0,0,0-.9.871v.873ZM7.9,10.988V6.8a.538.538,0,0,1,1.075,0v4.184a.538.538,0,0,1-1.075,0Zm-2.872,0V6.8A.539.539,0,0,1,6.1,6.8v4.184a.539.539,0,0,1-1.077,0Z" transform="translate(29 -4.998)" fill="grey" />
                                        </g>
                                    </svg>
                                </button>
                                {/* {btnToggle === todo.id ? ''
                                    : <button onClick={() => { }} className={style.editBtn}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13.997" height="14" viewBox="0 0 13.997 14">
                                            <path id="edit" d="M173.467,4.743l-8.837,8.837-3.042.337a1.39,1.39,0,0,1-1.535-1.534l.337-3.042L169.227.5a1.964,1.964,0,0,1,2.783,0l1.454,1.454a1.971,1.971,0,0,1,0,2.786Zm-3.325,1.04-1.955-1.955-6.252,6.256-.246,2.2,2.2-.246ZM172.323,3.1,170.87,1.647a.351.351,0,0,0-.5,0l-1.04,1.04,1.955,1.955,1.04-1.04A.359.359,0,0,0,172.323,3.1Z" transform="translate(-160.045 0.075)" fill="grey" />
                                        </svg>
                                    </button>} */}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
