//redirect to home if login
window.onload = () => {
    if (sessionStorage.user) {
        user = JSON.parse(sessionStorage.user);
        if (compareToken(user.authToken, user.email)) {
            location.replace('/');
        }
    }
}

const loader = document.querySelector('.loader');
//sellect inputs
const submitBtn = document.querySelector('.submit-btn');
const name = document.querySelector('#name') || null;
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const number = document.querySelector("#number") || null;
const tac = document.querySelector("#terms-and-cond") || null;
const notification = document.querySelector("#notification") || null;

submitBtn.addEventListener('click', () => {
    if (name != null) { //signup page
        if (name.value.length < 3) {
            showAlert('name must be 3 letters long');
        } else if (!email.value.length) {
            showAlert('enter your email');
        } else if (password.value.length < 8) {
            showAlert('password should be 8 letters long');
        } else if (!number.value.length) {
            showAlert('enter your phone number');
        } else if (!Number(number.value) || number.value.length < 10) {
            showAlert('invalid phone number');
        } else if (!tac.checked) {
            showAlert('please check our terms and conditions');
        } else {
            //submit form
            loader.style.display = 'block';
            sendData('/signup', {
                name: name.value,
                email: email.value,
                password: password.value,
                number: number.value,
                tac: tac.checked,
                notification: notification.checked,
                seller: false
            })
        }
    } else {
        //login page
        if (!email.value.length || !password.value.length) {
            showAlert('fill all the input');
        } else {
            loader.style.display = 'block';
            sendData('/login', {
                email: email.value,
                password: password.value
            })
        }
    }
})

//send data func
// const sendData = (path, data) => {
//     fetch(path, {
//         method: 'post',
//         headers: new Headers({ 'Content-Type': 'application/json' }),
//         body: JSON.stringify(data)
//     }).then((res) => res.json())
//         .then(response => {
//             processData(response);
//         })
// }

// const processData = (data) => {
//     loader.style.display = null;
//     if (data.alert) {
//         showAlert(data.alert);
//     } else if (data.name) {
//         //create authtoken
//         data.authToken = generateToken(data.email);
//         sessionStorage.user = JSON.stringify(data);
//         location.replace('/');
//     }
// }

// //alert func
// const showAlert = (msg) => {
//     let alertBox = document.querySelector('.alert-box');
//     let alertMsg = document.querySelector('.alert-msg');
//     alertMsg.innerHTML = msg;
//     alertBox.classList.add('show');
//     setTimeout(() => {
//         alertBox.classList.remove('show');
//     }, 3000)
// }