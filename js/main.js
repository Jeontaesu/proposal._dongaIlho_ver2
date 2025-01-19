$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: false,
        center: true,
        items: 3.6,
        margin: 150,
        dots: false,
    });
});

window.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const initialAnimation = gsap.timeline();

    initialAnimation.from(".sc__ilho .ilhoFoundation", {
        opacity: 0,
        duration: 1,
        yPercent: 30,
        stagger: true,
        ease: "power2.out",
    });

    // 스크롤 트리거 애니메이션들
    const scrollAnimations = [
        {
            trigger: ".sc__start .sc__area-title > *",
            start: "top 70%",
            end: "bottom 20%",
            yPercent: 100,
            markerId: "start-animation",
        },
        {
            trigger: ".sc__business .sc__area-title",
            start: "600% 600%",
            end: "100% 100%",
            yPercent: 100,
            markerId: "business-animation",
        },
        // {
        //     trigger: ".sc__backup .backup__item",
        //     start: "-50% 50%",
        //     end: "0% 0%",
        //     yPercent: 100,
        //     markerId: "backup-animation",
        // },
        {
            trigger: ".sc__news .sc__area > *",
            start: "-50% 50%",
            end: "100% 50%",
            yPercent: 100,
            markerId: "news-animation",
        },
        // {
        //     trigger: ".sc__partner .inner > *",
        //     start: "50% 50%",
        //     end: "50% 100%",
        //     yPercent: 100,
        //     markerId: "partner-animation",
        // },
    ];

    scrollAnimations.forEach(({ trigger, start, end, yPercent, markerId }) => {
        gsap.from(trigger, {
            scrollTrigger: {
                trigger,
                start,
                end,
                scrub: 2,
                toggleActions: "play none none reverse",
                id: markerId, // 마커 식별을 위한 ID
                // 마커 커스텀
                markerStart: "Start " + markerId,
                markerEnd: "End " + markerId,
                markerSnapRatio: 0.5,
            },
            opacity: 0,
            stagger: 0.2,
            yPercent,
            duration: 1.5,
            ease: "power2.out",
        });
    });

    // 슬라이드업 애니메이션
    const slideUpElements = document.querySelectorAll('[data-js="slideup"]');
    slideUpElements.forEach((element) => {
        const trigger = ScrollTrigger.create({
            trigger: element,
            start: "top 60%",
            end: "bottom 20%",
            onEnter: () => toggleClass(element, true),
            onLeaveBack: () => toggleClass(element, false),
        });
    });

    function toggleClass(element, add) {
        if (add) {
            if (!element.classList.contains("act")) {
                element.classList.add("act");
            }
        } else {
            if (element.classList.contains("act")) {
                element.classList.remove("act");
            }
        }
    }

    function toggleClass(element, add) {
        if (add) {
            if (!element.classList.contains("act")) {
                element.classList.add("act");
            }
        } else {
            if (element.classList.contains("act")) {
                element.classList.remove("act");
            }
        }
    }
    // 오브젝트 애니메이션 설정
    const objects = document.querySelectorAll(".sc__start .obj");
    const animations = [
        { x: -200, y: 200 },
        { x: 200, y: 200 },
        { x: -200, y: 200 },
        { x: -100, y: 200 },
    ];

    objects.forEach((obj, index) => {
        const { x, y } = animations[index];

        gsap.set(obj, {
            opacity: 1,
            x,
            y,
            force3D: true,
        });

        ScrollTrigger.create({
            trigger: obj,
            start: "top 80%",
            end: "0 30%",
            toggleActions: "play none none reverse",
            onEnter: () => {
                // 메인 애니메이션
                gsap.to(obj, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "power2.out",
                    onComplete: () => {
                        // 마지막 요소의 애니메이션이 완료된 후에만 데코 애니메이션 추가
                        if (index === objects.length - 1) {
                            objects.forEach((element, i) => {
                                element.classList.add("animate-deco");
                                element.classList.add(`obj-deco${(i % 4) + 1}`);
                            });
                        }
                    },
                });
            },
            onLeaveBack: () => {
                // 스크롤 되돌아갈 때
                gsap.to(obj, {
                    opacity: 1,
                    x,
                    y,
                    duration: 0.8,
                    ease: "power2.in",
                    onComplete: () => {
                        // 데코 애니메이션 제거
                        obj.classList.remove("animate-deco");
                        obj.classList.remove("deco1", "deco2", "deco3");
                    },
                });
            },
        });
    });
});
