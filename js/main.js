/**
 * @GSAP
 */
import {markers} from './markers.js';

const sections = gsap.utils.toArray('.sc__wrapper .section');

sections.forEach((item, index) => {
  ScrollTrigger.create({
    trigger: item,
    scroller: '.sc',
    start: 'top top',
    end: index === sections.length - 1 ? '+=0%' : '+=100%',
    pin:true,
    pinSpacing:false, 
    // snap: {
    //   // snapTo: true,
    //   duration:0.3,
    //   ease: "power1.inOut"
    // },
    // markers:true,
  })
})

// const wrapper = document.querySelector('.sc__wrapper')
// wrapper.computedStyleMap.height = `${window.innerHeight + sections.length}px`;

markers()

