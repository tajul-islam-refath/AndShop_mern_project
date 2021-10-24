import img1 from '../../assets/varations/v-1.png'
import img2 from '../../assets/varations/v-2.png'
import img3 from '../../assets/varations/v-3.png'
import img4 from '../../assets/varations/v-4.png'
import img5 from '../../assets/varations/v-5.png'

const Productvariation = () => {
    return (
        <section className="product_variation ">
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="product_variation__box">
                            <img src={img1} alt="product variation" />
                            <div className="product_variation__box__text--one">
                                <h4 className="text-one" >OUTERWEAR</h4>
                                <h2>NEW</h2>
                                <h4>COLLECTION</h4>
                                <button className="myBtn myBtn__type--one mt-2">
                                    SHOP NOW
                                </button>
                            </div>
                        </div>
                        <div className="product_variation__box">
                            <img src={img2} alt="product variation" />
                            <div className="product_variation__box__text--one">
                                <h4 className="text-one" >SUMMER</h4>
                                <h2>HOT</h2>
                                <h4>COLLECTION</h4>
                                <button className="myBtn myBtn__type--one mt-2">
                                    SHOP NOW
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="product_variation__box">
                            <img src={img3} alt="product variation" />
                            <div className="product_variation__box__text--two">
                                <h2 className="text-one" >10% OFFER</h2>
                                <h4>NO SELECTED MODELS</h4>
                                <button className="myBtn myBtn__type--one mt-3">
                                    SHOP NOW
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="product_variation__box">
                            <img src={img4} alt="product variation" />
                            <div className="product_variation__box__text--one">
                                <h2>NEW</h2>
                                <h4 className="text-one">ARRIVALS</h4>
                                <button className="myBtn myBtn__type--one mt-2">
                                    SHOP NOW
                                </button>
                            </div>
                        </div>
                        <div className="product_variation__box">
                            <img src={img5} alt="product variation" />
                            <div className="product_variation__box__text--one">
                                <h2>HOT</h2>
                                <h4 className="text-one">OFFER</h4>
                                <button className="myBtn myBtn__type--one mt-2">
                                    SHOP NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Productvariation;
