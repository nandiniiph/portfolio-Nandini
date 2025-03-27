document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio Loaded");

    const sidebarItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".section");

    sidebarItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

                sidebarItems.forEach(li => li.classList.remove("active"));
                this.classList.add("active");

                sections.forEach(section => section.classList.remove("active"));
                targetSection.classList.add("active");

                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    function handleHashNavigation() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetSection = document.getElementById(hash);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

                sidebarItems.forEach(li => li.classList.remove("active"));
                sections.forEach(section => section.classList.remove("active"));

                const activeItem = document.querySelector(`.nav-item[data-target="${hash}"]`);
                if (activeItem) {
                    activeItem.classList.add("active");
                }
                targetSection.classList.add("active");
            }
        }
    }

    window.addEventListener("hashchange", handleHashNavigation);
    handleHashNavigation();

    // Inisialisasi Swiper untuk Experience Section
    function initSwiper(className) {
        return new Swiper(className, {
            slidesPerView: 3,
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            }
        });
    }

    initSwiper(".himaSwiper");
    initSwiper(".aiesecSwiper");
    initSwiper(".easeSwiper");
    initSwiper(".awardSwiper");

    // Inisialisasi Swiper untuk Experience Sliders dengan class "experience-slider"
    document.querySelectorAll(".experience-slider").forEach(slider => {
        new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: slider.querySelector(".swiper-button-next"),
                prevEl: slider.querySelector(".swiper-button-prev"),
            },
            pagination: {
                el: slider.querySelector(".swiper-pagination"),
                clickable: true,
            },
        });
    });

    // Slider Functionality untuk elemen dengan class "slider"
    document.querySelectorAll(".slider").forEach(slider => {
        let images = slider.querySelectorAll(".slide");
        let currentIndex = 0;

        const prevBtn = slider.querySelector(".prev");
        const nextBtn = slider.querySelector(".next");

        function updateSlider() {
            images.forEach((img, i) => {
                img.style.display = i === currentIndex ? "block" : "none";
            });
        }

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlider();
        });

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        });

        updateSlider();
    });

    // **Formulir Pesan**
    const form = document.getElementById("contact-form");
    const message = document.getElementById("message-success");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            message.textContent = "Pesan sudah terkirim.";
            message.style.display = "block";

            form.reset();

            setTimeout(() => {
                message.style.display = "none";
            }, 3000);
        });
    }
});
