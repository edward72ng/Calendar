import React, { useState } from "react";

function SubItem() {
    const [check, setCheck] = useState(false)


    return <div className="sub-item-container">
            <div className="visual-item-container">
                {check ?
                  <i className="material-icons"
                  onClick={()=>setCheck(false)}
                  >check_circle</i>
                :
                  <i className="material-icons"
                  onClick={()=>setCheck(true)}
                  >radio_button_unchecked</i>
                }

                <div className="details-container">
                <p className="content">contenido</p>
                <p className="details">detalles</p>
                </div>
            </div>

            <div className="visual-item-container">
                {check ?
                  <i className="material-icons"
                  onClick={()=>setCheck(false)}
                  >check_circle</i>
                :
                  <i className="material-icons"
                  onClick={()=>setCheck(true)}
                  >radio_button_unchecked</i>
                }

                <div className="details-container">
                <p className="content">contenido</p>
                <p className="details">detalles</p>
                </div>
            </div>

            <div className="visual-item-container">
                {check ?
                  <i className="material-icons"
                  onClick={()=>setCheck(false)}
                  >check_circle</i>
                :
                  <i className="material-icons"
                  onClick={()=>setCheck(true)}
                  >radio_button_unchecked</i>
                }

                <div className="details-container">
                <p className="content">contenido</p>
                <p className="details">detalles</p>
                </div>
            </div>
    </div>
}

export {SubItem}