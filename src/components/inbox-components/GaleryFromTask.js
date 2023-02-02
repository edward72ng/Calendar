import React from "react";

const galeryData = [
    'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1']  

function GaleryFromTask () {
    
    return <div className="galery-container">
    {
      galeryData.map((elem, i)=>{
        return (<div key={i} className="galery-item" style={{backgroundImage: "url("+elem+")"}}></div>)
      })
    }
  </div>
}

export {GaleryFromTask}