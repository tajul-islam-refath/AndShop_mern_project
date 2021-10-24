import { BiDollar } from "react-icons/bi";
import Paper from '@mui/material/Paper';
import Notfound from "../404/NotFound";

const Dashbord = () => {
    return (
        <section className="admin__dashbord">
            <div className="container" >
                <div className="admin__dashbord__header">
                    <h2>Dashbord</h2>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="db_card card card-body shadow" >
                            <div className="card__text">
                                <a href="#">
                                    <BiDollar />
                                </a>
                                <h2>$3500.00</h2>
                                <p>Total Sells</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="db_card card card-body shadow" >
                            <div className="card__text">
                                <a href="#">
                                    <BiDollar />
                                </a>
                                <h2>$275.15</h2>
                                <p>Average order value</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="db_card card card-body shadow" >
                            <div className="card__text">
                                <a href="#">
                                    <BiDollar />
                                </a>
                                <h2>320</h2>
                                <p>Total orders</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dashbord;
