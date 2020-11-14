import React from "react";
import {Cards} from '../elements/Card'
import classNames from "classnames";

const MovieGeneration = ({
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
            <Cards/>
          </div>
        </div>
      </section>
    </>
  );
}