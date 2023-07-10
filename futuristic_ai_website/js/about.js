const introText = document.querySelectorAll("#intro .animated_text");


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