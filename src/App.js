import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userVerify } from './store/actions/todoAction';
import { setlogin } from './store/slices/todoSlice';
import MainCmp from './components/mainCmp';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Protected from './components/protected';
import SignUp from './components/signup';
import style from './assets/css/app.module.css'
function App() {
  let { isSetLogin, loading, verify } = useSelector(state => state.todoList)
  const dispatch = useDispatch()
  if (verify.success) {
    dispatch(setlogin(true))
  }
  var token = localStorage.getItem('usertoken');
  useEffect(() => {
    if (token) {
      dispatch(userVerify(token))
    }
  }, []);
  return (
    <div >
      <div className={style}>
        <BrowserRouter>
          <Header />
          <Toaster toastOptions={{ style: { borderRadius: '8px', background: '#333', color: '#fff', } }} />
          <Routes>
            <Route path='*' element={<h1>404 not found</h1>} />
            {isSetLogin ? <Route path='/' element={
              <Protected>
                <MainCmp />
              </Protected>} /> :
              <Route path='/' element={<Home />} />
            }
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>

  );
}

export default App;
