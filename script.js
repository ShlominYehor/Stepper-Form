const form = document.querySelector('form');
const steps = document.querySelectorAll('.step');
const indicators = document.querySelectorAll('.indicator');
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector('#prevBtn');
const inputFields = form.getElementsByClassName('form-control');

let currentStep = 0;

    const move = (n) => {
    if (n === 1 && !validateForm()) {
        return false;
        }

        steps[currentStep].style.display = 'none';
        currentStep = currentStep + n;

        if (currentStep >= steps.length) {
            form.submit();
            return false;
        }

        showStep(currentStep);
    };

    const validateForm = () => {
    let inputs = steps[currentStep].querySelectorAll('input');
    let valid = true;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
                valid = false;
            } 
        }

        if (valid) {
                indicators[currentStep].classList.add('finish');
            }        

            return valid;
        };

        const showStep = (n) => {
    steps[n].style.display = 'block';
    if (n === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    if (n === (steps.length - 1)) {
        nextBtn.innerHTML = "Submit";
    } else {
        nextBtn.innerHTML = "Next";
    }    

        stepIndicator(n);
    };

    const stepIndicator = (n) => {
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove("active");
        }

        indicators[n].classList.add('active');
    };

showStep(currentStep);

    for (const item of inputFields) {
        item.addEventListener("blur", (event) => {
            validateField(event.target);
        });
    }

    const inValid = (element, message) => {
        const errorSection = element.parentElement.querySelector(".error");
        errorSection.innerText = message;
        element.classList.add("invalid");
        element.classList.remove("valid");
    };        

    const valid = (element) => {
        const errorSection = element.parentElement.querySelector(".error");
        errorSection.innerText = "";
        element.classList.remove("invalid");
        element.classList.add("valid");
    };

    const validateField = (element) => {
        switch (element.id) {
            case "email":
                validationEmail(element);
                break;
            case "password":
                validationPassword(element);
                break;
            case "phone":
                validatePhone(element);
                break;
            default:
                validateInput(element);
        }
    };

    const validationEmail = (email) => {
        const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

        if (email.value === '') {
            inValid(email, "Заповніть поле");
        } else if (regex.test(email.value)) {
            valid(email);
        } else {
            inValid(email, 'Введіть коректний Email');
        }
    };

    const validationPassword = (password) => {
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (password.value === '') {
            inValid(password, "Заповніть поле");
        } else if (regex.test(password.value)) {
            valid(password);
        } else {
            inValid(password, 'Пароль має вміщувати мінімум 8 символів та 1 спеціальний символ');
        }
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]*$/;

        if (phone.value === '') {
            inValid(phone, "Заповніть поле");
        } else if (regex.test(phone.value)) {
            valid(phone);
        } else {
            inValid(phone, 'Введіть тільки цифри');
        }
    };

    const validateInput = (input) => {
        if (input.value === '') {
            inValid(input, "Заповніть поле");
        } else {
            valid(input);
        }
    };