import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin";
import MotionPathPlugin from "gsap/MotionPathPlugin";


export default function SiteLoad() {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(TextPlugin)
  gsap.registerPlugin(MotionPathPlugin)

  useGSAP(() => {
    // gsap code here
    gsap.timeline()
      .fromTo('#progressBar', {opacity:0}, {duration:2, delay:0, opacity:100})
      .to("#textToAnimate", {duration:0.92, delay:1, text:"Beginning Initialization Sequence", ease:'none'})
      .to("#textToAnimate", {duration:0, delay:1, text:"n", ease:'none'})
      .to('#textToAnimate', {duration:1.92, delay:0, text:"npx create-next-app@latest --ts --tailwind --app", ease:'none'})
      .to('#textToAnimate', {duration:0, delay:1, text:"n", ease:'none'})
      .to('#textToAnimate', {duration:2.04, delay:0, text:'npm i framer-motion clsx tailwind-merge @gsap/react', ease:'none'})
      .to('#textToAnimate', {duration:0, delay:1, text:'I', ease:'none'})
      .to("#textToAnimate", {duration:0.92, delay:0, text:'Initialization Completed Successfully', ease:'none'})
  })

  return(
    <>
      <div className='flex flex-col w-screen h-screen justify-center items-center relative'>
        {/*<div id="progressBar" className="inset-x-20 bg-white w-1/2 h-1"></div>*/}
        <div className="pt-4">
          <p className="text-xl" id="textToAnimate"></p>
        </div>
      </div>
    </>
  )
}