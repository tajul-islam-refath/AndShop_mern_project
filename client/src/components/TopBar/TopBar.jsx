import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import './topbar.css'

const Topbar = () => {
    return (
        <section id="topbar" >
            <div className="container d-flex justify-content-between  ">
                <div className="topbar-info">
                    <ul>
                        <li>
                            <i class="fas fa-phone-alt"></i>
                            <p>+8801988775828</p>
                        </li>
                        <li>
                            <i class="fas fa-envelope"></i>
                            <p>support@andshop.com.bd</p>
                        </li>
                    </ul>
                </div>
                <div className="topbar-icons">
                    <ul>
                        <li>
                            <FacebookIcon />
                        </li>
                        <li>
                            <LinkedInIcon />
                        </li>
                        <li>
                            <InstagramIcon />
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Topbar;
