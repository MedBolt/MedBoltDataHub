const introText = document.querySelectorAll(".animated_text");
const medboltText = document.querySelectorAll('#products .product_name');
const rotateBtns = document.querySelectorAll('.fa-rotate');

const swiper = new Swiper('.swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    breakpoints: {
        400: {
            slidesPerView: 1,
            spaceBetween: 100,
            slidesPerGroup: 1
        },
        800: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3
        },
        1000: {
            slidesPerView: 4,
            spaceBetween: 50,
            slidesPerGroup: 4
        }
    },
    speed: 500,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
    autoplay: {
        delay: 6000,
    },
});

const introObserver = new IntersectionObserver((items)=> {
    items.forEach((item) => {
        if(item.isIntersecting){
            item.target.classList.add("animate");
            introObserver.unobserve(item.target);
        }else{
            item.target.classList.remove('animate');
        }
    })
})

introText.forEach((text) => {introObserver.observe(text)});

const medBoltObserver = new IntersectionObserver((items)=> {
    items.forEach((item) => {
        if(item.isIntersecting){
            item.target.classList.add("animate");
        }else{
            item.target.classList.remove('animate');
        }
    })
})

medboltText.forEach((text) => {medBoltObserver.observe(text)});

function rotate(el){
    let state = el.parentElement.parentElement.classList;
    if(state == 'team-member show_back'){
        el.parentElement.parentElement.classList = 'team-member'
    }else if(state == 'team-member'){
        el.parentElement.parentElement.classList = 'team-member show_back'
    }
}

function rotateCard(el){
    let state = el.classList;
    if(state == 'team-member show_back'){
        el.classList = 'team-member'
    }else if(state == 'team-member'){
        el.classList = 'team-member show_back'
    }
}