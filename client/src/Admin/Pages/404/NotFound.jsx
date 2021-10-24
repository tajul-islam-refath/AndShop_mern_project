import img from "../../../assets/404.svg"

const Notfound = () => {
    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center" >
            <img src={img} alt="Not found" className="w-60" />
        </div>
    );
}

export default Notfound;
