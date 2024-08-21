const form = document.querySelector('#registerForm');
const myBtn = document.getElementById('myBtn')
const timerText = document.getElementsByClassName('timer-text')
const text1=document.getElementById('texttoFade')

function submitForm(formValue) {
    const url = "http://localhost:5000/register";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formValue),
    })
    .then(response => { return response.json();
    })
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

const getFormValues = (formData) => {
     return {
        fullName: form.fullName.value.trim(),
        userName: form.username.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        password: form.password.value.trim(),
        gender: form.gender.value.trim(),  
        programmingLanguages: Array.from(form.programmingLanguages)
                                    .filter(checkbox => checkbox.checked)
                                    .map(checkbox => checkbox.value) 
    };
}

const handleForm = function(event) {
    event.preventDefault();
    console.log('hi');
    const errors = {};
    const form = event.target;

    const formValue = getFormValues();

    console.log(formValue.fullName); 

    document.querySelectorAll('.error').forEach(span => span.textContent = '');

    if (!form.fullName.value.trim()) {
        errors.fullName = "Full Name is required";
    }

    if (!form.username.value.trim()) {
        errors.username = "Username is required";
    }

    if (!form.email.value.trim() || !form.email.value.includes('@')) {
        errors.email = "A valid Email is required";
    }

    if (!form.phone.value.trim() || !/^\d{10}$/.test(form.phone.value.trim())) {
        errors.phone = "Phone number must be 10 digits";
    }

    if (!form.password.value.trim()) {
        errors.password = "Password is required";
    } else if (form.password.value !== form.confirmPassword.value) {
        errors.confirmPassword = "Passwords do not match";
    }

    if (!form.gender.value) {
        errors.gender = "Gender is required";
    }

    if (formValue.programmingLanguages.length === 0) {
        errors.programmingLanguages = "At least one programming language is required";
    }


    if (Object.keys(errors).length > 0) {
        for (let key in errors) {
            let errorSpan = document.getElementById(`${key}Error`);
            if (errorSpan) {
                errorSpan.textContent = errors[key];
            }
        }
    } else {
        submitForm(formValue);
    }
}

/*function handleBtnClick(e) {
    e.target.style.backgroundColor = 'red'
    let counter = 0
    setInterval(() => {
        console.log(timerText[0])
        counter++
        timerText[0].innerHTML = counter
    }, 1000)
    setTimeout(() => {
        location.href = 'https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_innerhtml'
    }, 3000)

    
}
function handleBtnClick2(e) {

    console.log('button is clicked inside 2nd function')
}


myBtn.addEventListener('click', handleBtnClick)*/

myBtn.addEventListener('click', function()
{
    document.body.classList.toggle('dark-mode');
})

form.addEventListener('submit', handleForm);

text1.addEventListener('click',function()
{
    const text=document.getElementById('texttoFade');
    text.style.transition = 'opacity 1s';
    text.style.opacity = text.style.opacity === '0' ? '1' : '0';
})
