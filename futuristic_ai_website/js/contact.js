const introText = document.querySelectorAll("#intro .animated_text");
const contactDetails = document.querySelectorAll('.contact-detail, form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email')
const messageInput = document.querySelector('#message')
const phoneNumInput = document.querySelector("#phone");
const phoneNumErrorMsg = document.querySelector("#error-msg");
const phoneNumValidMsg = document.querySelector("#valid-msg");
const contactForm = document.getElementById("contact_form");

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

const contactsObserver = new IntersectionObserver((items)=> {
    items.forEach((item) => {
        if(item.isIntersecting){
            item.target.classList.add("animate");
            contactsObserver.unobserve(item.target);
        }else{
            item.target.classList.remove('animate');
        }
    })
})

contactDetails.forEach((contactDetail) => {contactsObserver.observe(contactDetail)});

// here, the index maps to the error code returned from getValidationError - see readme
const errorMap = ["Invalid phone number", "Invalid country code", "Phone number is too short", "Phone number is too long", "Invalid phone number"];

// initialise plugin
const iti = window.intlTelInput(phoneNumInput, {
    utilsScript: "/intl-tel-input/js/utils.js?1687509211722",
    initialCountry: "auto",
    geoIpLookup: callback => {
        fetch("https://ipapi.co/json")
        .then(res => res.json())
        .then(data => callback(data.country_code))
        .catch(() => callback("us"));
    }
});

const reset = () => {
  phoneNumInput.classList.remove("error");
  phoneNumErrorMsg.innerHTML = "";
  phoneNumErrorMsg.classList.add("hide");
  phoneNumValidMsg.classList.add("hide");
};


phoneNumInput.addEventListener('blur', () => {
  reset();
  if (phoneNumInput.value.trim()) {
    if (iti.isValidNumber()) {
      phoneNumValidMsg.classList.remove("hide");
    } else {
      phoneNumInput.classList.add("error");
      const errorCode = iti.getValidationError();
      phoneNumErrorMsg.innerHTML = errorMap[errorCode];
      phoneNumErrorMsg.classList.remove("hide");
    }
  }
});

// on keyup / change flag: reset
phoneNumInput.addEventListener('change', reset);
phoneNumInput.addEventListener('keyup', reset);

emailInput.addEventListener('input', () => {
    if(emailInput.checkValidity() && isValidEmail(emailInput.value)){
        emailInput.classList.remove('error')
        emailInput.parentElement.querySelector('.error-msg').innerHTML = ''
    }
})

nameInput.addEventListener('input', () => {
    if(nameInput.checkValidity()){
        nameInput.classList.remove('error')
        nameInput.parentElement.querySelector('.error-msg').innerHTML = ''
    }
})

messageInput.addEventListener('input', () => {
    if(messageInput.checkValidity()){
        messageInput.classList.remove('error')
        messageInput.parentElement.querySelector('.error-msg').innerHTML = ''
    }
})

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

contactForm.addEventListener('submit', (e) => {
  if(!emailInput.checkValidity()){
    e.preventDefault()
    let container = email.parentElement
    emailInput.classList.add('error')
    let errorMessage = container.querySelector('.error-msg')
    errorMessage.innerHTML = emailInput.validationMessage
  }else if(!isValidEmail(emailInput.value)){
    e.preventDefault()
    incorrectInputResponse(emailInput, 'Invalid Email Address, Check if theres a \'.\' in the address')
  }

  if(!nameInput.checkValidity()){
    e.preventDefault()
    incorrectInputResponse(nameInput, nameInput.validationMessage)
  }

  if(!messageInput.checkValidity()){
    e.preventDefault()
    incorrectInputResponse(messageInput, messageInput.validationMessage)
  }

  if(phoneNumInput.value == ''){
    e.preventDefault()
    phoneNumInput.classList.add('error')
    phoneNumErrorMsg.classList.remove('hide')
    phoneNumErrorMsg.innerHTML = 'Please enter a phone number'
  }else if(!iti.isValidNumber()){
    e.preventDefault()
    phoneNumInput.classList.add('error')
    phoneNumErrorMsg.classList.remove('hide')
    phoneNumErrorMsg.innerHTML = 'Invalid Phone Number'
  }

})

function incorrectInputResponse (inputEl, message){
    let container = inputEl.parentElement
    inputEl.classList.add('error')
    let errorMessage = container.querySelector('.error-msg')
    errorMessage.innerHTML = message
}