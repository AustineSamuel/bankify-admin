import React,{useEffect,useState} from 'react';
import { useInView } from 'react-intersection-observer';


interface ContainerProps {
children:any,
style?:any
}

const CardContainer:React.FC<ContainerProps>=({children,style})=>{

    const [ref,inView,entries]=useInView({

    })
const otherStyles={
    transition:"0.6 ease",
    transitionDuration:"700ms",
    marginTop:50,
    opacity:0.3,
    ...style

}
useEffect(()=>{
if(inView){
//console.log(ref,"in screen");
const el=entries?.boundingClientRect ? entries?.boundingClientRect:{top:0,bottom:0}
if (el?.top <= 0) {
    otherStyles.marginTop=0
  }
  

}
},[inView]);






    return (
        <>
<div ref={ref}
className='cardStyle'  style={!inView ? {...otherStyles,marginTop:otherStyles.marginTop}: {
    transition:"0.6 ease",
    transitionDuration:"700ms",
   borderRadius:5,
    opacity:1,
    ...style
}}>
{children}
</div>
        </>
    )
}

export default CardContainer;