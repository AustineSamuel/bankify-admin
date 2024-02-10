import React,{useEffect,useState} from 'react';
import { useInView } from 'react-intersection-observer';


interface ContainerProps {
children:any
}

const VtuContainer:React.FC<ContainerProps>=({children})=>{
    const [containerStyle,setContainerStyle]=useState<any>({
        opacity:1,
        transform:"translate(0px,0px)"
    });

    const [ref,inView,entries]=useInView({

    })
    const [firstRun,setFirstRun]=useState(true);
useEffect(()=>{
if(inView){
const el=entries?.boundingClientRect ? entries?.boundingClientRect:{top:0,bottom:0}
console.log(inView,!firstRun);
if (el?.top <= 0) {
    setContainerStyle({
        opacity:1,
        transform:"translate(0px,0px)"
})
 
  }
  
  

}
else{
    
if(!firstRun)setContainerStyle({
    opacity:0.3,
    transform:"translate(0px,10px)"
})
}
},[inView]);

useEffect(()=>{
    setTimeout(()=>setFirstRun(false),1000);
},[])
useEffect(()=>{
//console.log(firstRun);
},[firstRun]);
    return (
        <>
<div 

ref={ref} style={{transition:"all",transitionDuration:"800ms",...containerStyle}}>
{children}
</div>
        </>
    )
}

export default VtuContainer;