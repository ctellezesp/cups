import React, { Component } from 'react';

export default function Frame(props){
    return(
        <div className="video-container">
            <iframe src={props.render} width="100%" height="auto" allowFullScreen></iframe>
            <a style={{position: 'absolute', top: 0, left: 0}} href={props.render} target="_blank">&#128279;</a>
        </div>
    );
}
