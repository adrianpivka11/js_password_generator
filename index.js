const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let password1 = document.getElementById('password-1')
let password2 = document.getElementById('password-2')
const lenEl = document.getElementById("len");
const lenSpan = document.getElementById("len-span");
const useSymbols = document.getElementById("use-symbols");
const useNumbers = document.getElementById("use-numbers");
let passwordLength = Number(lenEl.value)




//  addEventListener pridany na DOM lenEl <input id= "len"> ktorym je type="range" slider, ktory ma za ulohu update dlzky znakov
lenEl.addEventListener("input", function updatePasswordLength() {
  lenSpan.textContent = lenEl.value;
  passwordLength = Number(lenEl.value)
});

// Pomocne funkcie ktore vracaju hodnotu true / false podla toho ci use-symbols, use-numbers v HTML su checked / unchecked 
function shouldUseSymbols() {
  return useSymbols.checked
  }
function shouldUseNumbers() {
  return useNumbers.checked
  }

// robi slicing array znakov v premennej characters na pismena, cisla, symboly a urci pool znakov na zaklade checked / unchecked use-symbols, use-numbers v HTML 
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
  
  
// getRandomCharacter(poolChar) -> popis o jedno nizsie
function getRandomCharacter(poolChar) {
    let randomIndex = Math.floor(Math.random()*poolChar.length)
    let randomNumber = poolChar[randomIndex]
    return randomNumber  
}
//. Funkcia pre generovanie hesla vyuziva pre generovanie nahodneho pismena funkciu
// getRandomCharacter(poolChar). Tieto funkcie si medzi sebou odosielaju argument ktory je pool znakov z ktorych sa ma vyberat
function generatePassword(poolChar) {
    let password = ""
    for (i = 0; i < passwordLength; i++) {
        let randomCharacter = getRandomCharacter(poolChar)
        password += randomCharacter   
    }
    return password 
}


   // Hlavna funkcia celeho mini-projektu
function renderPassword() {
    // 1. urci pool znakov na zaklade checked / unchecked use-symbols, use-numbers v HTML
    let poolChar = determinePoolOfCharacters()
    // 2. urceny pool znakov odosiela do funkcie pre vygenerovanie hesla z tychto znakov
    password1.textContent = generatePassword(poolChar)
    password2.textContent = generatePassword(poolChar)
    
}





