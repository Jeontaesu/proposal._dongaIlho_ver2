/**
 * @GSAP
 */
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const sections = gsap.utils.toArray(".sc__wrapper .section");

sections.forEach((item, index) => {
  ScrollTrigger.create({
    trigger: item,
    start: "top top",
    end: index === sections.length - 1 ? "+=0%" : "+=100%",
    // end:
    //   index === sections.length - 1
    //     ? "+=0%"
    //     : // : index === sections.length - 2
    //       // ? "+=50%" // 여기 원하는 값으로
    //       "+=100%",
    pin: true,
    pinSpacing: false,
    ease: "power4.inOut",
    delay: 0.5,
    snap: {
      snapTo: (value) => Math.round(value),
      duration: 0.3,
    },
    // scrub: true,
  });
});

//
// const wrapper = document.querySelector('.sc__wrapper')
// wrapper.computedStyleMap.height = `${window.innerHeight + sections.length}px`;
