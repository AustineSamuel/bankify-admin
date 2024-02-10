import React,{useEffect} from 'react';
import { useInView } from 'react-intersection-observer';


interface ContainerProps {
children:any,
style?:any
}

const FadeIn:React.FC<ContainerProps>=({children,style})=>{

    const [ref,inView,entries]=useInView({

    })
const otherStyles={
    transition:"0.6 ease",
    transitionDuration:"700ms",
    marginLeft:15,
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
});//[inView]






    return (
        <>
<div ref={ref}
style={!inView ? {...otherStyles,marginTop:otherStyles.marginTop}: {
    transition:"0.6 ease",
    transitionDuration:"700ms",
    opacity:1,
    marginLeft:undefined,
    ...style
}}>
{children}
</div>
        </>
    )
}

export default FadeIn;