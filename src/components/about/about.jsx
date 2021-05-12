import { render } from '@testing-library/react';
import React from 'react';
import './about.css';
import image from '../../assets/images/paris.jpg'

function About(){

    return(
        <div className="Div">
            <div className="EspacioI">
                <img src={image} className="Img" alt="" />
            </div>
            <div className="EspacioP">
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, culpa ad! Pariatur cum maiores quod quaerat odio qui est at? Nobis ut quae commodi ipsam, pariatur et quia odit soluta!
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, culpa ad! Pariatur cum maiores quod quaerat odio qui est at? Nobis ut quae commodi ipsam, pariatur et quia odit soluta!
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, culpa ad! Pariatur cum maiores quod quaerat odio qui est at? Nobis ut quae commodi ipsam, pariatur et quia odit soluta!
                </p>
            </div>
        </div>
    );            
    
}

export default About;