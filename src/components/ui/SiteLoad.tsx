import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin";


export default function SiteLoad() {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(TextPlugin)

  useGSAP(() => {
    // gsap code here
    gsap.timeline().from("#initializingText", {duration:0.92, delay:1, text:"", ease:'none'})
      .to("#initializingText", {duration:0, delay:1, text:"", ease:'none'})
      .from('#npxCreateNextAppText', {duration:1.92, delay:0, text:"", ease:'none'})
      .to('#npxCreateNextAppText', {duration:0, delay:1, text:"", ease:'none'})
      .from('#npmInstallsText', {duration:2.04, delay:0, text:'', ease:'none'})
      .to('#npmInstallsText', {duration:0, delay:1, text:'', ease:'none'})
      .from("#welcomeText", {duration:0.92, delay:0, text:'', ease:'none'})
  })

  return(
    <>
      <div className='flex flex-col w-screen h-screen justify-center items-center'>
        <p id="initializingText">Initializing project...</p>
        <p id="npxCreateNextAppText">npx create-next-app@latest --ts --tailwind --app</p>
        <p id="npmInstallsText">npm i framer-motion clsx tailwind-merge @gsap/react</p>
        <p id="welcomeText">Welcome to vishrut.tech</p>
      </div>
    </>
  )
}