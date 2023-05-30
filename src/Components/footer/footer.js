import "./footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { blue } from "@mui/material/colors";
import { border } from "@mui/system";

const Footer = () => {

    // const year = new Date().getFullYear();
    // console.log(year);

    return (
        <footer>
            <div className="footer_container">
                <div className="footr_details_one">
                    <h3>Bigbasket</h3>
                    <p>About Us</p>
                    <p>In News</p>
                    <p>Green bigbasket</p>
                    <p>Privacy Policy</p>
                    <p>Affiliate</p>
                    <p>Terms and Conditions</p>
                    <p>Careers At bigbasket</p>
                </div>
                <div className="footr_details_one">
                    <h3>Help</h3>
                    <p>FAQs</p>
                    <p>Contact Us</p>
                    <p>bb Wallet FAQs</p>
                    <p>bb Wallet T&Cs</p>
                    <p>Vendor Connect</p>
                </div>
                <div className="footr_details_one forres">
                    <h3>Download Our App</h3>
                    <img src="https://www.bbassets.com/static/v2643/custPage/build/content/img/Google-App-store-icon.png" alt="google play store" />
                    <img src="https://www.bbassets.com/static/v2643/custPage/build/content/img/Apple-App-store-icon.png" alt="apple play store" />
                </div>
                <div className="footr_details_one forres">
                    <h3>Get Social With Us</h3>
                    <div className="icon-wrapper">

                    <div id="facbook">
                        <FacebookIcon className="icon"  />
                    </div>
                    <div id="pinterest">
                        <PinterestIcon className="icon"  />
                    </div>
                    <div id="twitter">
                        <TwitterIcon className="icon"  />
                    </div>
                    <div id="instagram">
                        <InstagramIcon className="icon"  />
                    </div>
                    </div>
                </div>
            </div>
            <div className="lastdetails">
                <p>Copyright © 2022-2024 Supermarket Grocery Supplies Pvt Ltd</p>
            </div>
        </footer>
    )
}

export default Footer