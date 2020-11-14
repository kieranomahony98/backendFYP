import React, { Component } from "react";
import { SectionProps } from '../../utils/SectionProps'
import {CheckboxButtonCarousel} from '../elements/carousel'
import classNames from "classnames";
import "pure-react-carousel/dist/react-carousel.es.css";
const propTypes = {
    ...SectionProps.types
  }
  
const defaultProps = {
    ...SectionProps.defaults
}

export const MovieGeneration = ({
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    ...props
  }) => {

    const outerClasses = classNames(
        "hero section center-content",
        topOuterDivider && "has-top-divider",
        bottomOuterDivider && "has-bottom-divider",
        hasBgColor && "has-bg-color",
        invertColor && "invert-color",
        className
      );

  return (
    <>
      <section {...props} className={outerClasses}>
        <div className="container" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
          <div className="container-lg" style = {{height:"100vh"}}>
            <CheckboxButtonCarousel/>
          </div>
        </div>
      </section>
    </>
  );
}

MovieGeneration.propTypes = propTypes;
MovieGeneration.defaultProps = defaultProps;
export default MovieGeneration;
