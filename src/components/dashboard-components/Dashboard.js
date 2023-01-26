import React from "react";

const today = [
{content: 'Lorem Ipsun', details: 'dolor ipsun folum', image:'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'},
{content: 'Lorem Ipsun', details: 'dolor ipsun folum', image:'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'},
{content: 'Lorem Ipsun', details: 'dolor ipsun folum', image:'https://th.bing.com/th/id/OIP.QAYBKECBqiLPuTScp3FZRwHaD4?pid=ImgDet&rs=1'}]

function Dashboard () {
    
    return <div className="dashboard-container">
        <h1 className="tittle">Hí, John Doe</h1>

        <span>Eventos del Dia</span>
        <div className="cards-container">
            {
                today.map((elem, i)=>{
                    return <div key={i} className="cards-item">
                        <p className="content">{elem.content}</p>
                        <p className="details">{elem.details}</p>
                        <div className="galery-container">
                            <div  className="galery-item" style={{backgroundImage: "url("+ elem.image +")"}}></div>
                            <div  className="galery-item" style={{backgroundImage: "url("+elem.image+")"}}></div>
                            <div  className="galery-item" style={{backgroundImage: "url("+elem.image+")"}}></div>
                        </div>
                    </div>
                })
            }
        </div>

        <span>Eventos Asignados</span>
        <div className="cards-container">
            {
                today.map((elem, i)=>{
                    return <div key={i} className="cards-item">
                        <p className="content">{elem.content}</p>
                        <p className="details">{elem.details}</p>
                        <div className="galery-container">
                            <div  className="galery-item" style={{backgroundImage: "url("+elem.image+")"}}></div>
                            <div  className="galery-item" style={{backgroundImage: "url("+elem.image+")"}}></div>
                            <div  className="galery-item" style={{backgroundImage: "url("+elem.image+")"}}></div>
                        </div>
                    </div>
                })
            }
        </div>

    </div>
}

export {Dashboard}