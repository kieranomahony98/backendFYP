import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";  
import { Carousel } from 'react-responsive-carousel';
import Checkbox from './Checkbox';

export const CheckboxButtonCarousel = () => {
        return(
            <div>
             <Carousel style={{height:"100vh"}}>
                 <div style={{height:"100vh"}}>
                     <li>
                     <h3> Select choice </h3>
                     <Checkbox name="Selected Checkbox Button" value="select" labelTxt = "Show Text"/>
                     <br/>
                     <br/>
                     <br/>

                     <Checkbox name="Selected Checkbox Button" value="select"/>
                     <br/>
                     <br/>
                     <br/>
                     <Checkbox name="Selected Checkbox Button" value="select"/>
                     <br/>
                     
                   
                     <Checkbox name="Selected Checkbox Button" value="select"/>
                     <br/>
                 
                     <Checkbox name="Selected Checkbox Button" value="select"/>
                     </li>
                 
                 </div>
                 <div>
                 <h3> Select choice </h3>
                     <label style={{padding: "10px"}}>Text</label>
                     <Checkbox name="Selected Checkbox Button" value="select"/>
                     <br/>
                     <Checkbox name="Selected Checkbox Button" value="select"/>
                     <br/>
                     <Checkbox name="Selected Checkbox Button" value="select"/>
                     <br/>
                     <Checkbox name="Selected Checkbox Button" value="select"/>
                     <br/>
                     <Checkbox name= {"Selected Checkbox Button"} value="select"/>
                 </div>
          </Carousel>
            </div>
  
        )
    
}
CheckboxButtonCarousel.prototype = carouselProps;
CheckboxButtonCarousel.defaultProps = carouselProps;


