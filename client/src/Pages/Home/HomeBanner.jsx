import headerImg from '../../assets/headerWoman.png'
const HomeBanner = () => {
    return (
        <section id="banner" className="banner">
            <div className="container-fluid d-flex" >
                <div className="col-md-6 banner__left">
                    <div className="banner__left__text">
                        <h1 className="banner__left__text--one">
                            LIVE FOR
                            <br />
                            <span>
                                FASHION
                            </span>
                        </h1>
                        <h3 className="banner__left__text--two">
                            Save Up To 50%
                        </h3>
                        <button className="myBtn banner__left__text--btn">
                            SHOP NOW
                        </button>
                    </div>
                </div>
                <div className="col-md-6 banner__right">
                    <div className="banner__right__hero">
                        <img src={headerImg} alt="" className="banner__right__hero--Img" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeBanner;
