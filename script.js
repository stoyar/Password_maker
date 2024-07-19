const characterCategories = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+[]{}|;:,.<>?/~`"
};

const passwordLength = document.querySelector('.pass-length input');
const passwordLengthIndicator = document.querySelector('.pass-length .details span');
const passwordIndicator = document.querySelector('.pass-indicator');
const passwordInput = document.querySelector('.input-box .password-input');
const generateButton = document.querySelector('.generate-btn');
const copyButton = document.querySelector(".input-box span");

const updatePasswordIndicator = (length) => {
    passwordLengthIndicator.textContent = length;
    passwordIndicator.classList.remove('strong', 'medium');

    if (length >= 16) {
        passwordIndicator.classList.add('strong');
    } else if (length >= 8) {
        passwordIndicator.classList.add('medium');
    } else
        passwordIndicator.classList.add('weak');
}

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyButton.innerText = "check";
    copyButton.style.color = "#4285f4";
    setTimeout(() => {
        copyButton.innerText = "copy_all";
        copyButton.style.color = "#707070";
    }, 2000);
}

const restorePasswordOptions = () => {
    if (!localStorage.getItem('passwordOptions')) return;

    const passwordOptions = JSON.parse(localStorage.getItem('passwordOptions'));

    uppercase.checked = passwordOptions.uppercase;
    numbers.checked = passwordOptions.numbers;
    symbols.checked = passwordOptions.symbols;
    passwordLength.value = passwordOptions.length;
}

const savePasswordOptions = () => {
    const passwordOptions = {};

    passwordOptions.length = +passwordLength.value;
    passwordOptions.uppercase = uppercase.checked;
    passwordOptions.numbers = numbers.checked;
    passwordOptions.symbols = symbols.checked;

    localStorage.setItem('passwordOptions', JSON.stringify(passwordOptions));
}

const shuffleString = (rawString) => {
    return rawString
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');
};

const createCharString = () => {
    const selectedChars = Object.keys(characterCategories)
        .reduce((prev, current) => {
            const paramCheckbox = document.querySelector('#' + current);

            if (paramCheckbox.checked) return prev + characterCategories[current];

            return prev;
        }, '');

    return shuffleString(selectedChars);
}

const generatePassword = (length) => {
    const chars = shuffleString(createCharString());

    return [...Array(length)]
        .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
        .join('');
}

const handleGeneratePress = () => {
    savePasswordOptions();
    const length = +passwordLength.value;
    updatePasswordIndicator(length);

    let randomPassword = shuffleString(generatePassword(length));

    passwordInput.value = randomPassword;
}

restorePasswordOptions();
handleGeneratePress();

passwordLength.oninput = handleGeneratePress;
uppercase.onchange = handleGeneratePress;
numbers.onchange = handleGeneratePress;
symbols.onchange = handleGeneratePress;
generateButton.onclick = handleGeneratePress;
copyButton.onclick = copyPassword;
