const startingButtons = document.querySelector(".easy")
const headDisplay = document.querySelector(".startingbuttons") //headsection
const bodyDisplay = document.querySelector(".bodysection")  // bodysection
const footerDisplay = document.querySelector(".operatorbuttons") // footersection
const bodyButtonsDisplay = document.querySelector(".bodyButtons")
const finish = document.querySelector(".finish")
const home = document.querySelector(".Home")
let globalArray = [] // empty array for container to the numbers
let allReduceArray = [] // empty array for finish button for all reduce number
let total = [] // This container contains all the total numbers of each problem in the DOM
let finalResult = [] // This container contains all the result of the problem if it was true of false
let arrayedItems;
let localName = localStorage.getItem("value")
let classNum1 = -1
let classNum2 = 0

if(!localName) { // starting button
startingButtons.addEventListener("click", () => {
    displayBody() // display the body section
    easyMode()
    easyModeProcess()
})
}
const displayBody = () => {
    headDisplay.classList.add("styleStartingButtons")
    bodyDisplay.classList.add("bodyStyle")
    footerDisplay.classList.add("styleOperatorButtons")
    
}
if(localName) {
    displayBody()
}
const easyMode = () => { // whole process for easyMode 
    let localArray = []
    const random1 = Math.floor(Math.random() * 12) + 1
    const random2 = Math.floor(Math.random() * 12) + 1
    classNum1 += 2
    classNum2 += 2
    localArray.push(random1,random2,classNum1,classNum2)
    globalArray.push(localArray)
    while(globalArray.length < 10) { // while statement to repeat the code 10 times
        easyMode()
    }
    localStorage.setItem("value",JSON.stringify(globalArray)) // store the globalarray to local storage
}

const easyModeProcess = () => { // this arrow function is use to iterate the localstorage value into the DOM
    const getLocalStorage = JSON.parse(localStorage.getItem("value"))
    arrayedItems = getLocalStorage
    arrayedItems.forEach( e => {
       document.querySelector(`.span${e[2]}`).innerText = e[0]
       document.querySelector(`.span${e[3]}`).innerText = e[1]
    })
    console.log(globalArray)
}
if(localName) { // dont forget to call the arrow function so even the page was refresh it will always run its block of code
    easyModeProcess()
    displayBodyButtons()
}
finish.addEventListener("click",() => { // reduce all the value of the localstorage 
    let finishArrayedItem = []
    const getLocalItems = JSON.parse(localStorage.getItem("value"))
    getLocalItems.forEach( // iterate all the localstorage value
        x => {
            finishArrayedItem.push([x[0],x[1]])
        }
    )
    finishArrayedItem.forEach(e => {
        total.push(e.reduce(
            (x,y) => {return x / y}
        ))
    })
    scorring()
    displayBodyButtons()
})
const displayBodyButtons = () => { // display bodybuttons when finish is click
    footerDisplay.classList.remove("styleOperatorButtons")
    bodyButtonsDisplay.classList.add("stylebodyButtons")
}
const scorring = () => { // This scorring arrow function is use to get all the value from the input field and stored it on new variable
    let scorringArray = [] // This container contains all the inputs of the user
    let userTotal = 0
    for(i = 1; i < 11; i++){
        scorringArray.push(document.querySelector(`.id${i}`).value)
        document.querySelector(`.id${i}`).value = ''
        document.querySelector(`.id${i}`).style.display = 'none'
    }
    localStorage.setItem("userInput",JSON.stringify(scorringArray))
    let twoArray = [[...scorringArray],[...total]]
    for(i = 0; i < 10; i++) {
        if(twoArray[0][`${i}`] == twoArray[1][`${i}`]) { // This if statement use to compare if the two dimensional array and its value it equal to each other 
            finalResult.push('Correct')
            userTotal++
        }else {
            finalResult.push('Wrong')
        }
    }
    localStorage.setItem("userTotal",JSON.stringify(userTotal))
    displayNumberInput()
    displayResult()
    
}
const displayNumberInput = () => { // This function use to display all the userInput and userTotal to the DOM 
    let count = 1
    const getlocalUserInput = JSON.parse(localStorage.getItem("userInput"))
    const getlocalUserTotal = JSON.parse(localStorage.getItem("userTotal"))
    getlocalUserInput.forEach(e => { // for userInput
        document.querySelector(`.unserAnswer${count++}`).innerText = e
    })
    document.querySelector(".score").innerText = `${getlocalUserTotal}/10`
}
const displayResult = () => { // This function used to iterate and display all the finalResult to the DOM
    let countup = 1
    finalResult.forEach(x => { 
        document.querySelector(`.final${countup++}`).innerText = x
    })
}
home.addEventListener("click", () => {  // used to clear the
    localStorage.clear()
})

// end process for easyMode

