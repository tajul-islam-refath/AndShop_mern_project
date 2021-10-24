import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

import { login, clearErrors } from '../../store/actions/userActions'

const Headerlogincard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {

            alert.success('User LogIn successfully.')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error])

    // submit user login form
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }
    return (
        <>
            <div className="card crad-body">
                <div className="login-title">
                    <h4>Login</h4>
                </div>
                <div className="login-form">
                    <form onSubmit={submitHandler} >
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <div className="d-flex align-items-center" >
                                <PersonIcon />
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <div className="d-flex align-items-center">
                                <LockIcon />
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading ? true : false} >LogIn</button>
                    </form>
                    <p>
                        Don't have an account?
                        <Link to="/signup" > Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Headerlogincard;
