import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './auth.css'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
// Internal exports
import Loader from '../../components/layouts/Loader'
import MetaData from '../../components/layouts/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../store/actions/userActions'


const Login = ({ history, location }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if (isAuthenticated) {
            history.push(redirect)
            alert.success('User LogIn successfully.')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))

    }

    return (
        <section id="login">
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />
                    <div className="login-card">
                        <div className="login-form">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <div className="d-flex align-items-center">
                                        <PersonIcon />
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="user@gmail.com"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <div className="d-flex align-items-center">
                                        <LockIcon />
                                        <input
                                            type="password"
                                            id="password_field"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="**********"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                >
                                    LOGIN
                                </button>
                                <p>
                                    Don't have an account?
                                    <Link to="/signup" > Sign Up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </section>
    );
}

export default Login;
