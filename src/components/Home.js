import style from '../assets/css/home.module.css'
import sideBanner from '../assets/images/todoBanner.webp'

export default function Home() {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.content}>
                    <div className={style.leftContent}>
                        <span className={style.title}>To-do List</span>
                        <span className={style.subTitle}>Task Management</span>
                        <span className={style.desc}>Make a plan and list of resolutions to achieve a goals or achieve success.</span>
                    </div>
                    <div>
                        <img src={sideBanner} className={style.sideBanner} alt='todo banner'></img>
                    </div>
                </div>
            </div>
        </div>
    )
}
