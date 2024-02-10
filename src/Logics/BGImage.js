import React from "react";
const BgImage = (props) => {
    const {children} = props
    return (
        <>
            <div className="Ctn" onClick={props.onClick}>
                {/**BG image */}
                <div className="BG" style={{
                    backgroundColor:props.backgroundColor,
                    backgroundSize:props.backgroundSize ? props.backgroundSize:'100% 100%',
                    backgroundImage: "url('" + props.url + "')",
                   ...props.style

                }}>

                    {children}
                </div>


            </div>
        </>
    );

}

export default BgImage;