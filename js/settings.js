// 필요한 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

// 섹션 색상 설정
// const sectionColors = ['#f2eee5', '#e5c1c5', '#c3e2dd', '#6eceda'];
// gsap.set('.section', {backgroundColor: gsap.utils.wrap(sectionColors)});

// 스크롤바 설정을 위한 컨테이너 요소 선택
const container = document.querySelector('.sc');

// Smooth Scrollbar 옵션
const options = {
  damping: 0.1,
  // alwaysShowTracks: true,
}

// Smooth Scrollbar 초기화
const scrollbar = Scrollbar.init(container, {
  ...options

  
});

ScrollTrigger.scrollerProxy(container, {
scrollTop(value) {
  if (arguments.length) {
    scrollbar.scrollTop = value; // setter
  }
  return scrollbar.scrollTop; // getter
},
getBoundingClientRect() {
  return {
    top:0,
    left:0,
    width: window.innerWidth,
    height: window.innerHeight
  }
}
});

// ScrollTrigger 업데이트
scrollbar.addListener(ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: container });



// header 스크롤 효과
// scrollbar.addListener(function(status) {
//   const curr = status.offset.y;
  
//   // Apply the same header logic using the scrollbar position
//   (curr > 0) ? $('header').addClass('--fixed') : $('header').removeClass('--fixed');

//   if (curr > lastScroll) { // 내릴때
//     $('.header').addClass('--hide');
//   } else {
//     $('.header').removeClass('--hide');
//   }
//   lastScroll = curr;
// });

// Initialize lastScroll at the top of your script
let lastScroll = 0;


// Smooth Scrollbar에 영향을 받지 않는 요소들을 위한 설정
ScrollTrigger.addEventListener("refresh", () => scrollbar.update());
ScrollTrigger.refresh();

