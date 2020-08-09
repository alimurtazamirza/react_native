import React from 'react';
import About from "./About";
import Photos from "./Photos";
import Friends from "./Friends";
import Posts from "./Posts";



const Switch = (props) => {
        let returnValue;
        if(props.currentState ==="About"){
            returnValue = <About />;
        }else if(props.currentState === "Images"){
            returnValue =<Photos />;
        }else if(props.currentState === "Post"){
            returnValue = <Posts />;
        }else if(props.currentState === "Friends"){
            returnValue =<Friends />;
        }else{
            returnValue = <About />;
        }
    return returnValue;
};


export default Switch;