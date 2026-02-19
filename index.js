
//  Javascript code which 1. gets data about length of password 2. gets data about use of special symbols or numbers 
// 3. generates 2 passwords by using Random function 4. loads 2 passwords to HTML


const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let password1 = document.getElementById('password-1')
let password2 = document.getElementById('password-2')
const passwordLengthInput = document.getElementById("password-length-input");
const lenSpan = document.getElementById("len-span");
let passwordLength = Number(passwordLengthInput.value)
const generateButtonEl = document.getElementById('generate-button')


//  gets input data about length of password
//  set variable passworLength used futher in the code
passwordLengthInput.addEventListener("input", function updatePasswordLength() {
  lenSpan.textContent = passwordLengthInput.value
  passwordLength = Number(passwordLengthInput.value)
})


// Elemnents and its functions to get data about use of special symbols or numbers.
// Returns  TRUE / FALSE
const useSymbols = document.getElementById("use-symbols");
const useNumbers = document.getElementById("use-numbers");
function shouldUseSymbols() {
  return useSymbols.checked
  }
function shouldUseNumbers() {
  return useNumbers.checked
  }


// slicing of the array (characters) into letters, numbers, symbols 
// and determining the character pool based on checked / unchecked use-symbols, use-numbers in HTML
// Returns pool of characters of which password should be generated
function determinePoolOfCharacters() {
    const letters = characters.slice(0, 52)
    const numbers = characters.slice(53, 61)
    const symbols = characters.slice(62, 91)
    let pool = ""
    if (shouldUseNumbers() && shouldUseSymbols()) {
        pool = [...letters, ...numbers, ...symbols]
        } else if (shouldUseNumbers() && shouldUseSymbols() === false) {
        pool = [...letters, ...numbers]
        } else if (shouldUseNumbers() === false && shouldUseSymbols()) {
        pool = [...letters, ...symbols]
        } else {pool = [ ...letters]}
    return pool  
}
  

// generate one random character from the pool of characters
// Args  pool of characters
// Returns one random character
function getRandomCharacter(poolChar) {
    let randomIndex = Math.floor(Math.random()*poolChar.length)
    let randomNumber = poolChar[randomIndex]
    return randomNumber  
}

// Generates Password by use of subfunction getRandomCharcter()
// Args pool of characters, passwordLength
// Returns generated password
function generatePassword(poolChar,passwordLength) {
    let password = ""
    for (i = 0; i < passwordLength; i++) {
        let randomCharacter = getRandomCharacter(poolChar)
        password += randomCharacter   
    }
    return password 
}


// Main function  
// is called by <button onclick="renderPassword()">Generate password</button>
// calls functions to determine pool of characters and to generate passwords
// passwords are rendered to two HTML elements

function renderPassword() {
    let poolChar = determinePoolOfCharacters()
    password1.textContent = generatePassword(poolChar, passwordLength)
    password2.textContent = generatePassword(poolChar, passwordLength)
    generateButtonEl.classList.add("copied");
    setTimeout(() => generateButtonEl.classList.remove("copied"), 400);
    
}


// COPY PASSWORD TO CLIPBOARD FUNCTIONALITY


// auxiliary function - copies argument to clipboard
async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

}

function isPlaceholder(text) {
  return text === "Click on password to copy!";
}


// take text content of element and handle it to function copyTextToClipboard(text)
async function handleCopy(element) {   
  const text = element.textContent.trim();
  if (!text || 
    isPlaceholder(text)) return;

  try {
    await copyTextToClipboard(text);
    
    // This part of handleCopy(el) effect CSS - visual. It adds and remove .class from element after 0.4 sec. 
    element.classList.add("copied");
    setTimeout(() => element.classList.remove("copied"), 400);
  } catch (err) {
    console.error("Copy failed:", err);
  }
}

password1.addEventListener("click", () => handleCopy(password1));
password2.addEventListener("click", () => handleCopy(password2));



window.increment = increment
window.save = save
window.reset = reset