import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'


import MetaData from '../../components/layouts/MetaData'
import { register, clearErrors } from '../../store/actions/userActions'



const AuthSignup = ({ history }) => {
    const [email, setEmail] = useState("")
    const [fName, setFname] = useState("")
    const [lName, setLname] = useState("")
    const [password, setPassword] = useState("")
    const [year, setYear] = useState("")
    const [month, setMonth] = useState("")
    const [day, setDay] = useState()
    const [gender, setGender] = useState("")
    const [errors, setErrors] = useState({})


    const alert = useAlert()
    const dispatch = useDispatch()
    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const submitHandler = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("email", email)
        formdata.append("firstName", fName)
        formdata.append("lastName", lName)
        formdata.append("password", password)
        formdata.append("year", year)
        formdata.append("month", month)
        formdata.append("day", day)
        formdata.append("gender", gender)

        dispatch(register(formdata))
    }

    useEffect(() => {
        if (error) {
            if (error === "string") {
                alert.error(error)
            } else {
                setErrors(error)
            }
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            history.push("/")
            alert.success('User Register successfully.')
        }
    }, [isAuthenticated, error, alert, dispatch])

    return (
        <section className="signup">
            <MetaData title="Create And Shop Account " />
            <div className="signup__form">
                <div className="d-flex justify-content-between" >
                    <h4 className="signup__form--title">
                        Create Your And Shop Account
                    </h4>
                    <p>
                        Already member ?
                        <Link to="/auth/login" className="mx-2 text-primary" >Login </Link>
                        here
                    </p>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group signup__form__email">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Input your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group signup__form__fname ">
                                <label htmlFor="fname">First name *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fname"
                                    placeholder="Input your first name"
                                    value={fName}
                                    onChange={(e) => setFname(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group signup__form__lname">
                                <label htmlFor="lname">Last name *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lname"
                                    placeholder="Input your last name"
                                    value={lName}
                                    onChange={(e) => setLname(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group signup__form__password">
                                <label htmlFor="password">Password *</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="**********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="signup__form__birthday__inpute">
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        id="exampleSelect"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        required
                                    >
                                        <option hidden="" selected="">Year </option>
                                        <option value="2020">2020</option>
                                        <option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select
                                        className={year ? "form-control" : "form-control text-secondary "}
                                        id="exampleSelect"
                                        value={month}
                                        onChange={(e) => setMonth(e.target.value)}
                                        disabled={year ? false : true}
                                        required
                                    >
                                        <option hidden="true">Month</option>
                                        <option value="January">January</option>
                                        <option value="Febuary">Febuary</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select
                                        className={month ? "form-control" : "form-control text-secondary "}
                                        id="exampleSelect"
                                        value={day}
                                        onChange={(e) => setDay(e.target.value)}
                                        disabled={month ? false : true}
                                        required
                                    >
                                        <option hidden="" class="signup___StyledOption-sc-1mr0t92-1 bzUbtB">Day</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="gender">Gender</label>
                                <select
                                    className={day ? "form-control" : "form-control text-secondary "}
                                    id="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    disabled={day ? false : true}
                                    required
                                >
                                    <option hidden="" selected="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
                                </select>
                            </div>
                            <button
                                className="myBtn myBtn__type--one signup__form--btn"
                                disabled={loading ? true : false}
                            >
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AuthSignup
