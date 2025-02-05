"use strict";

// bouncy header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});



function toggleNav() {
    const sidepanel = document.querySelector(".menu");
    const overlay = document.querySelector(".menu_overlay");

    sidepanel.classList.toggle("navmenu");
    overlay.classList.toggle("active_overlay");
}


// menu js
const dropdowns = document.querySelectorAll('.dropdown');

function toggleDropdown(e) {
    const svgIcon = e.target.closest('svg');
    if (!svgIcon) return;

    const parentOfTarget = svgIcon.closest('.dropdown'); // Ensure it's the direct parent

    dropdowns.forEach((dropdown) => {
        if (dropdown !== parentOfTarget && !dropdown.contains(parentOfTarget)) {
            dropdown.classList.remove('mobile_dropdown');
        }
    });

    if (parentOfTarget) {
        parentOfTarget.classList.toggle('mobile_dropdown');
    }
}

dropdowns.forEach((dropdown) => {
    dropdown.querySelector('svg').addEventListener("click", toggleDropdown);
});

// counter js 
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.counter-num').forEach(counter => {
        const target = +counter.dataset.count;
        const suffix = counter.dataset.suffix || '';
        let count = 0;

        const increment = setInterval(() => {
            count++;
            counter.textContent = count + suffix;

            if (count >= target) clearInterval(increment);
        }, 50); // Adjust speed here
    });
});

// testimonial
$('.testimonial_slider').slick({
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    dots: true,
});

// projects
$('.projects_slider').slick({
    infinite: true,
    slidesToShow: 4,
    spaceBetween: 30,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 3,
    prevArrow: false,
    nextArrow: false,
    dots: true,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
});

// testimonial
$('.video_slider').slick({
    infinite: true,
    slidesToShow: 2,
    prevArrow: false,
    nextArrow: false,
    dots: true,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
        }
    }]
});

// awards slider
$('.awards-slider').slick({
    infinite: true,
    slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 2,
    prevArrow: false,
    nextArrow: false,
    dots: true,
    responsive: [{
        breakpoint: 992,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});

// back to top
const calcScrollValue = () => {
    const scrollProgress = document.getElementById("btt-btn");
    const progressValue = document.getElementById("progress-value");
    const pos = document.documentElement.scrollTop;
    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = Math.round((pos * 100) / calcHeight);

    // Toggle the visibility of the scroll progress button
    if (pos > 100) {
        scrollProgress.style.display = "grid";
        scrollProgress.classList.add("back");
    } else {
        scrollProgress.classList.remove("back");
    }

    // Add event listener for the click event
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });

    // Update the background gradient based on scroll value
    scrollProgress.style.background = `conic-gradient(var(--light) ${scrollValue}%, var(--black) ${scrollValue}%)`;
};

// Attach event listeners
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// tabs 
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Run only if the .portfolio parent element exists
const portfolio = document.querySelector(".portfolio");
if (portfolio) {
    const firstTab = document.getElementsByClassName("tablinks")[0];
    const firstContent = document.querySelector(".tabcontent");

    if (firstTab && firstContent) {
        firstTab.classList.add("active");
        firstContent.style.display = "block";
    }
}

// faqs
const detailsElements = document.querySelectorAll("details");
const summaryElements = document.querySelectorAll("summary");
summaryElements.forEach((summary, index) => {
    summary.addEventListener("click", () => {
        detailsElements.forEach((details, i) => {
            if (i !== index) {
                details.open = false;
            }
        });
        summaryElements.forEach((s, i) => {
            if (i !== index) {
                s.classList.remove("actives");
            }
        });
        summary.classList.toggle("actives");
    });
});

// show more toggle button
document.querySelectorAll('.view_all').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetDiv = document.querySelector(`.viewall[data-id="${targetId}"]`);
        if (targetDiv) {
            targetDiv.classList.toggle('look_out');
        }
    });
});

// setup of lightbx gallery js
const lightboxContainer = document.querySelector('.lightbox-container');

if (lightboxContainer) {
    const lightboxEnabled = document.querySelectorAll('.lightbox_img_wrap');
    const lightboxArray = Array.from(lightboxEnabled);
    const lastImage = lightboxArray.length - 1;
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-image-wrapper .lightbx_title');
    const lightboxBtnRight = document.querySelector('#right');
    const lightboxBtnLeft = document.querySelector('#left');
    const closeBtn = document.querySelector('#close');
    let activeImage;

    // Functions
    const showLightBox = () => lightboxContainer.classList.add('active');
    const hideLightBox = () => lightboxContainer.classList.remove('active');

    const setActiveImage = (imageWrap) => {
        const image = imageWrap.querySelector('img');
        const title = imageWrap.querySelector('.lightbx_title').textContent;
        lightboxImage.src = image.src;
        lightboxImage.title = title;
        lightboxTitle.textContent = title;
        activeImage = lightboxArray.indexOf(imageWrap);
    };

    const transitionSlides = (direction) => {
        const slideClass = direction === 'left' ? 'slideright' : 'slideleft';
        lightboxImage.classList.add(slideClass);

        setTimeout(() => {
            activeImage = direction === 'left' ?
                (activeImage === 0 ? lastImage : activeImage - 1) :
                (activeImage === lastImage ? 0 : activeImage + 1);
            setActiveImage(lightboxArray[activeImage]);
        }, 250);

        setTimeout(() => lightboxImage.classList.remove(slideClass), 500);
    };

    // Event Listeners
    lightboxEnabled.forEach(imageWrap => {
        imageWrap.addEventListener('click', () => {
            showLightBox();
            setActiveImage(imageWrap);
        });
    });

    lightboxContainer.addEventListener('click', hideLightBox);
    closeBtn.addEventListener('click', hideLightBox);

    [lightboxBtnLeft, lightboxBtnRight].forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            transitionSlides(e.currentTarget.id === 'left' ? 'left' : 'right');
        });
    });

    lightboxImage.addEventListener('click', (e) => e.stopPropagation());

    // Optional: Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightboxContainer.classList.contains('active')) {
            switch (e.key) {
                case 'ArrowLeft':
                    transitionSlides('left');
                    break;
                case 'ArrowRight':
                    transitionSlides('right');
                    break;
                case 'Escape':
                    hideLightBox();
                    break;
            }
        }
    });
}

// table of content

var body = document.body;
if (body.getAttribute('data-run-toc') === 'true') {

    function addStylesOnClick() {
        // Select the table of contents header and body
        var tocHeader = document.querySelector('.toc-header');
        var tocBody = document.querySelector('.toc-body');
        var toc = document.querySelector('.toc');

        tocHeader.addEventListener('click', function () {
            if (toc.classList.contains('toc-mobile')) {
                if (!toc.classList.contains('styles-added')) {
                    // Add styles
                    tocBody.style.height = '250px';
                    tocBody.style.padding = '15px 10px 15px 40px';
                    tocBody.style.display = 'block';
                    toc.classList.add('styles-added');
                } else {
                    toc.style.transform = '';
                    tocBody.style.height = '';
                    tocBody.style.width = '';
                    tocBody.style.display = '';
                    tocBody.style.padding = '0';
                    toc.classList.remove('styles-added');
                }
            }
        });
    }

    var headerClicked = false;
    var tocHeader = document.querySelector('.toc-header');
    var tocBody = document.querySelector('.toc-body');
    var svgElement = document.querySelector('.cut');

    tocHeader.addEventListener('click', function () {
        if (!headerClicked) {
            tocBody.style.transform = 'translateY(0)';
            tocBody.style.opacity = '1';
            tocBody.style.visibility = 'visible';
            tocBody.style.transition = 'all 0.5s';
            svgElement.style.display = 'block';
            headerClicked = true;
        } else {
            tocBody.style.transform = 'translateY(100%)';
            tocBody.style.opacity = '0';
            tocBody.style.visibility = 'hidden';
            tocHeader.style.width = 'unset';
            svgElement.style.display = 'none';
            tocBody.style.transition = 'all 0.5s';
            headerClicked = false;
        }
    });

    function addClassOnResize() {
        var toc = document.querySelector('.toc');
        if (window.innerWidth <= 1024) {
            toc.classList.add('toc-mobile');
            toc.classList.remove('toc');
        } else {
            toc.classList.remove('toc-mobile');
        }
    }

    // Call the function to add styles on click
    addStylesOnClick();

    // Call the function on document ready
    addClassOnResize();

    // Call the function on window resize
    window.addEventListener('resize', function () {
        addClassOnResize();
    });
}



// Add optimise file
window.onload=function(){let e=document.createElement("div");e.className="preloader",e.innerHTML='<img src="images/creative-loading.gif" alt="">',document.body.prepend(e);let t=document.getElementById("flexslider"),l=t?t.querySelector("ul"):null;l&&(l.style.opacity="0"),setTimeout((()=>{e.remove(),l&&(l.style.opacity="1")}),111111)};