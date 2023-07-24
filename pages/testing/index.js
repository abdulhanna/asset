import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Lottie from "lottie-react";
import groovyWalkAnimation from '../../components/animation/anni.json'
import robo from '../../components/animation/robo.json'

const Testing = () => {
    const router = useRouter()
    const [isActive,setIsActive] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{
            setIsActive(true)
        },5000)
    },[])
    // console.log(router,'r');
    const style = {
        height: 300,
      };
  return (
    <div>
     {!isActive
      ? <div>
      <Lottie animationData={groovyWalkAnimation} style={style} loop={true} />
      <Lottie animationData={robo} style={style} loop={true} />
      </div>:"done"}
    </div>
  )
}

export default Testing
