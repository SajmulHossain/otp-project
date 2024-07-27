let opt;
let intervalID;
let timeoutID;

function init() {
    generateOTP();
    tackleBox();
}

function generateOTP() {
    otp = Math.floor(10000 + Math.random() * 90000);
    const otpBox = document.getElementById('otp-code');

    setInterval(() => {
        otpBox.innerText = otp;
    }, 1000);

    count();
}

function tackleBox() {
    const box = document.getElementById('otp-box');
    box.addEventListener('input', function(e) {
        const target = e.target;

        if(isNaN(target.value)) {
            target.value = '';
            return;
        } 

        const nextElement = e.target.nextElementSibling;
        if (nextElement) {
            nextElement.focus();
        }

        validate();
    })
}

function validate() {
    let value = '';
    const box = document.getElementById('otp-box');
    
    [...box.children].forEach((elem) => {
        value = value + elem.value;
    })
    console.log(value);

    const result = document.getElementById('result');

    let validateMsg = otp === parseInt(value,10)

    const countDown = document.getElementById('countdown');

    if (validateMsg) {
        result.style.color = 'green';
        result.innerText = `Your OTP validated successfully`;
        clearInterval(intervalID);
        clearTimeout(timeoutID);
        countDown.style.display = 'none';
    } else {
        result.style.color = 'red';
        result.innerText = `Failed to validate OTP`;
    }
}

function count() {
    let fullTime = 15000;
    let interval = 1000;
    let slice = fullTime/interval;

    const countDown = document.getElementById('countdown');

    intervalID = setInterval(() => {
      countDown.innerText = `OTP will expires in ${slice}`;
      slice -= 1;
    },interval)

    timeoutID = setTimeout(() => {
        countDown.innerText = `OTP has expired`;
        clearInterval(intervalID);
        generateOTP();
    }, fullTime);
}

init();
