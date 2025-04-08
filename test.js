[기본부터 시작해보죠...]
우선 구조적으로 봤을 때, `.sc__wrapper` 안의 섹션들과 그 외부의 `section4`, `section5`, `footer`는 현재 DOM 구조상 명확히 구분되어 있어요. 의도는 명확하죠: `.sc__wrapper` 내부의 섹션들에는 `ScrollTrigger` + `pin`으로 layer처럼 고정되며 순차적으로 보여지는 인터랙션을 적용하고, 그 이후의 섹션들(`section4`, `section5`, `footer`)는 부드러운 일반 스크롤로 흘러가게 하고 싶은 거예요.

문제는... 현재의 `ScrollTrigger` 설정이 `.sc__wrapper .section`에만 pin을 적용하긴 하지만, 스크롤바 자체는 `.sc` 전체에 붙어 있어서 그 바깥 영역이 예상과 다르게 작동할 가능성이 있다는 점이에요.

음... 하나하나 뜯어봅시다.

[정리하며 분석해보면...]
- `.sc`는 `.sc__wrapper`뿐 아니라 `section4`, `section5`, `footer`까지 감싸고 있음
- `gsap.utils.toArray('.sc__wrapper .section')`는 pin 대상만 `.sc__wrapper` 내부로 한정
- 하지만 `ScrollTrigger.defaults({ scroller: container })`로 스크롤 전체를 `.sc`에 위임
- 그 상태에서 `.sc__wrapper`의 section들만 pin되면... 음, pin된 상태에서 height가 줄어든다는 느낌이 드는데, 실제로 `pinSpacing: false` 때문에 다음 섹션이 제자리에 겹쳐 오버랩되며 등장하게 돼요. 이게 예상과 다르게 아래쪽 일반 스크롤 콘텐츠들과의 *공간 충돌*을 유발할 수 있어요.

[잠깐만요, 그럼... 무엇이 필요한가?]
- pin 효과를 주는 구간(`.sc__wrapper`)과 일반 스크롤 콘텐츠(`section4`, `section5`, `footer`) 사이에 **충분한 공간 분리와 컨텍스트 분리**가 필요해요.
- 단순히 pin 효과만 넣는다고 해결되지 않아요. 왜냐면 pin이 layout flow를 바꾸기 때문이에요.
- 그럼... pin 효과로 쌓이는 높이를 명시적으로 계산해서 `.sc__wrapper` 자체가 **충분한 height**를 가지도록 조치해줘야 해요.
- 또는, section 자체가 pin되면서 height를 차지하지 않게 되면 그 밑에 콘텐츠가 겹쳐 올라오게 되니까, **pinSpacing을 true로 유지하거나**, fake spacing을 따로 만들어줘야 해요.

[그렇다면 다음 전략이 필요해 보여요]

---

### ✅ 전략: `.sc__wrapper` 영역만 ScrollTrigger + pin 적용하고, 이후 콘텐츠는 자연스러운 스크롤로 분리하기

#### 1. `.sc__wrapper` 안에서만 `pinSpacing: false` 유지하며 pin 적용
#### 2. `.sc__wrapper` 자체가 전체 섹션 수 만큼의 높이를 갖도록 `height` 지정
#### 3. 이후 콘텐츠(`section4`, `section5`, `footer`)는 pin 되지 않고 일반 스크롤 영역으로 배치

---

[이 아이디어를 코드로 표현해보면...]
```js
// main.js

const sections = gsap.utils.toArray('.sc__wrapper .section');

sections.forEach((item, index) => {
  ScrollTrigger.create({
    trigger: item,
    scroller: '.sc',
    start: 'top top',
    end: '+=100%',
    pin: true,
    pinSpacing: false, // pinSpacing을 false로 하면 height가 누적되지 않음
    snap: {
      duration: 0.3,
      ease: "power1.inOut"
    },
    markers: true,
  });
});

// 💡 추가: .sc__wrapper에 전체 섹션 수 만큼의 height를 강제로 부여
// pinSpacing이 false이기 때문에 필요함
const wrapper = document.querySelector('.sc__wrapper');
wrapper.style.height = `${window.innerHeight * sections.length}px`;
