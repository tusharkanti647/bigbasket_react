

import "./BannerSlid.css"

import { color } from '@mui/system'
import Carousel from 'react-material-ui-carousel'


import baby from "../../image/bannerSlider/baby.webp"
import bakery from "../../image/bannerSlider/bakery.webp"
import protein from "../../image/bannerSlider/protein.webp"
import upTo50 from "../../image/bannerSlider/upTo50.webp"

function BannerSlid() {
    return (<>

        <Carousel className="banner-carousel"
        autoPlay={true}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        fullHeightHover={false}
        navButtonsProps={{
            style: {
                color:"#999999",
                backgroundColor: 'white',
                width: "30px",
                borderRadius: 0,
            }
        }}
        navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
            style: {
                border: "solid #DEDEDE 0.5px",
                width: "30px",
                height: "50px",
                border: "solid #DEDEDE 0.5px"
            }
        }} 
        >
            <img src={baby} alt="" className='banner-img-slide'/>
            <img src={bakery} alt="" className='banner-img-slide'/>
            <img src={protein} alt="" className='banner-img-slide' />
            <img src={upTo50} alt="" className='banner-img-slide'/>
        </Carousel>
    </>)
}

export default BannerSlid;