// Elements
const result = document.querySelector('#result');
const copyBtn = document.querySelector('.btn-copy');
const passwordLength = document.querySelector('#characterLength');
const lowercaseCheck = document.querySelector('#lowercaseCharacter');
const uppercaseCheck = document.querySelector('#uppercaseCharacter');
const numberCheck = document.querySelector('#numberCharacter');
const symbolCheck = document.querySelector('#symbolCharacter');
const generateBtn = document.querySelector('.btn-generate');
const successMsg = document.querySelector('.success-msg');

// Getting Charactes
const getLowerCharacters = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
const getUpperCharacters = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
const getNumberCharacters = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
const getSymbolCharacters = () => {
  const symbols = '!@#$%^&*()_+{}:"<>?';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
const getRandomCharacter = {
  lowercase: getLowerCharacters,
  uppercase: getUpperCharacters,
  number: getNumberCharacters,
  symbol: getSymbolCharacters
}

// Generating Password
const generatePassword = (
  length,
  lowercase,
  uppercase,
  number,
  symbol
) => {
  // Setting Initial Values
  let generatedPassword = '';
  const checkCount = lowercase + uppercase + number + symbol;

  // Getting Checks
  const checks = [{ lowercase } , { uppercase }, { number }, { symbol }]
    .filter(item => Object.values(item)[0]);

  // Not Generating Password as There is No Enough Data Selected
  if (checkCount === 0) {
    return '';
  }

  // Generating Characters
  for(let i = 0; i < length; i+= checkCount) {
    checks.forEach(check => {
      // Getting Function that Will Generate Character
      const randomCharacterFunction = Object.keys(check)[0];

      // Appending Value to Generated Password
      generatedPassword += getRandomCharacter[randomCharacterFunction]();
    });
  }

  result.value = generatedPassword;
}

// Copy Password to Clipboard
const copyPassword = () => {
  // Copy
  result.select();
  document.execCommand('copy');

  // Showing Success Message
  successMsg.style.opacity = '1';

  // Removing Success Message
  setTimeout(() => {
    successMsg.style.opacity = '0';
  }, 1000);
}

// Events
generateBtn.addEventListener('click', () => {
  // Getting Values
  const length = +passwordLength.value;
  const lowercase = lowercaseCheck.checked;
  const uppercase = uppercaseCheck.checked;
  const number = numberCheck.checked;
  const symbol = symbolCheck.checked;

  generatePassword(
    length,
    lowercase, 
    uppercase,
    number,
    symbol
  );
});
copyBtn.addEventListener('click', copyPassword);
