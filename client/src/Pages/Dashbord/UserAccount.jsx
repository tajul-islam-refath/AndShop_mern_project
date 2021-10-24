import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

import UserInfoEditForm from '../../components/Forms/UserInfoEditForm';
import MetaData from '../../components/layouts/MetaData'
import { getUserIfno, dashbordClearError } from '../../store/actions/userDashbordActions'

const UserAccount = () => {

    const [isEdit, setIsEdit] = useState(false)

    const date = new Date()
    const dispatch = useDispatch()
    const { userInfo, error, loading } = useSelector(state => state.dashbord)


    useEffect(() => {
        dispatch(getUserIfno())
    }, [])

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(dashbordClearError())
        }
    }, [error])


    return (
        <>
            {userInfo &&
                <section className="account">
                    <MetaData title="User Account" />
                    <div className="account__top mt-2">
                        <h6 className="account__top--title">
                            <strong>Basic Information</strong> Enter your basic information for ensuring security and recovery of your account.
                        </h6>
                    </div>
                    <hr />
                    <div className="d-flex  account__body mt-5" >
                        <div className="col-md-1 mt-2">
                            <a href="#" className="account__body--icon" >
                                <StickyNote2Icon />
                            </a>
                        </div>
                        <div className="col-md-10">
                            <div className="account__info">
                                <div className="d-flex justify-content-between align-items-center " >
                                    <h6 className="account__info--text" >Personal Information</h6>
                                    <button
                                        className="myBtn myBtn__type--one account__info--btn "
                                        onClick={() => setIsEdit(!isEdit)}
                                    >
                                        {isEdit ? "Cancle" : " Edit"}
                                    </button>
                                </div>
                                <hr />
                                {
                                    isEdit ? <UserInfoEditForm user={userInfo} /> :
                                        <div className="account__info__details">
                                            <div className=" d-flex my-3" >
                                                <div className="col-md-4">
                                                    <h6 className="account__info__details--text" >
                                                        User Email
                                                    </h6>
                                                </div>
                                                <div className="col-md-4">
                                                    <p
                                                        className="account__info__details--value"
                                                    >
                                                        {userInfo.email ? userInfo.email : " "}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" d-flex my-3" >
                                                <div className="col-md-4">
                                                    <h6 className="account__info__details--text" >
                                                        First Name
                                                    </h6>
                                                </div>
                                                <div className="col-md-4">
                                                    <p
                                                        className="account__info__details--value"
                                                    >
                                                        {userInfo.name ? userInfo.name.firstName : " "}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" d-flex my-3" >
                                                <div className="col-md-4">
                                                    <h6 className="account__info__details--text" >
                                                        Last Name
                                                    </h6>
                                                </div>
                                                <div className="col-md-4">
                                                    <p
                                                        className="account__info__details--value"
                                                    >
                                                        {userInfo.name ? userInfo.name.lastName : " "}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" d-flex my-3" >
                                                <div className="col-md-4">
                                                    <h6 className="account__info__details--text" >
                                                        Mobile
                                                    </h6>
                                                </div>
                                                <div className="col-md-4">
                                                    <p
                                                        className="account__info__details--value"
                                                    >
                                                        {userInfo.mobile ? userInfo.mobile : "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" d-flex my-3" >
                                                <div className="col-md-4">
                                                    <h6 className="account__info__details--text" >
                                                        Gender
                                                    </h6>
                                                </div>
                                                <div className="col-md-4">
                                                    <p
                                                        className="account__info__details--value"
                                                    >
                                                        {userInfo.gender ? userInfo.gender : "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" d-flex my-3" >
                                                <div className="col-md-4">
                                                    <h6 className="account__info__details--text" >
                                                        Birth Date
                                                    </h6>
                                                </div>
                                                <div className="col-md-4">
                                                    <p
                                                        className="account__info__details--value"
                                                    >
                                                        {`${userInfo.birthDate ? userInfo.birthDate.month : "N/A"}
                                                 ${userInfo.birthDate ? userInfo.birthDate.day : "N/A"}
                                                 ${userInfo.birthDate ? userInfo.birthDate.year : "N/A"}`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" d-flex my-3" >
                                                <div className="col-md-4">
                                                    <h6 className="account__info__details--text" >
                                                        Member Since
                                                    </h6>
                                                </div>
                                                <div className="col-md-4">
                                                    <p
                                                        className="account__info__details--value"
                                                    >
                                                        {date.toDateString(userInfo.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" d-flex my-3" >
                                                <div className="col-md-4">
                                                    <h6 className="account__info__details--text" >
                                                        Last Update
                                                    </h6>
                                                </div>
                                                <div className="col-md-4">
                                                    <p
                                                        className="account__info__details--value"
                                                    >
                                                        {date.toDateString(userInfo.updatedAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    );
}

export default UserAccount;
