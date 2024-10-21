function loadSVG() {
    fetch("city.svg")
        .then(res => res.text())
        .then(svg => {
            document.getElementById("bg_city").innerHTML = svg;
            document.querySelector("#bg_city svg").setAttribute("preserveAspectRatio", "xMidyMid slice");
            setAnimationScroll()
        })
}

loadSVG()

function setAnimationScroll() {
    gsap.registerPlugin(ScrollTrigger);
    let runAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#bg_city",
            start: "top top",
            end: "+=1000",
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });

    runAnimation
        .add([
            gsap.to("#bg_city svg", 2, {
                scale: 2
            }),
            gsap.to("#full_city", 2, {
                opacity: 0
            })
        ])
        .add([
            gsap.to("#building_top", 2, {
                y: -200,
                opacity: 0
            }),
            gsap.to("#wall_side", 2, {
                x: -200,
                opacity: 0
            }),
            gsap.to("#wall_front", 2, {
                x: 200, y: 200,
                opacity: 0
            })
        ])
        .add([
            gsap.to("#interior_wall_side", 2, {
                x: -200,
                opacity: 0
            }),
            gsap.to("#interior_wall_top", 2, {
                y: -200,
                opacity: 0
            }),
            gsap.to("#interior_wall_side_2", 2, {
                opacity: 0
            }),
            gsap.to("#interior_wall_front", 2, {
                opacity: 0
            })
        ]);

    // Function to handle smooth scrolling with requestAnimationFrame
    function handleSmoothScroll() {
        // Tính toán tiến trình cuộn
        const scrollY = window.scrollY;
        const progress = Math.min(Math.max((scrollY - runAnimation.scrollTrigger.start) / (runAnimation.scrollTrigger.end - runAnimation.scrollTrigger.start), 0), 1);

        // Cập nhật các thuộc tính động dựa trên tiến trình cuộn
        gsap.to(runAnimation, { progress: progress });

        // Lặp lại để cập nhật tiếp khi cuộn
        requestAnimationFrame(handleSmoothScroll);
    }

    // Khởi chạy theo dõi cuộn
    requestAnimationFrame(handleSmoothScroll);
}