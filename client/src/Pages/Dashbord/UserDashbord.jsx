import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
// import './userDashbord.css'

import DashbordSideNav from './DashbordSideNav';
import Dashboard from './Dashbord';
import UserAccount from './UserAccount';

const UserDashbord = (props) => {
    const { tab } = props.match.params

    return (
        <section id="userDashbord" className="userDashbord" >
            <div className="container d-flex p-0" >
                <div className="card card-body userDashbord_sidenav-card">
                    <DashbordSideNav tab={tab} />
                </div>
                <div className="userDashbord_container">
                    <div className="card card-body dashbord-card">
                        {
                            tab === "profile" ? <Dashboard /> :
                                tab === "account" ? <UserAccount /> :
                                    <>
                                        <h1>Not Found</h1>
                                    </>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserDashbord;
