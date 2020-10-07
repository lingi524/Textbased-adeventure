const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")
var characterName = ""
const inputTextElement = document.getElementById("input")

let state  = {} //Empty objects. Keeps track of what our character has on them//

//function for start screen
function startScreen() {
    textElement.innerText = "Welcome, to the land of Wisteria. Who is this brave adventurer?"
    removeButtons ()
  //Add confirm button
    const button = document.createElement('button')
    button.innerText = "Confirm name"
    button.classList.add('btn')
    button.addEventListener('click', () => confirmText()) //call on confirmText
    optionButtonsElement.appendChild(button)

    //Start game button
    const button2 = document.createElement("button")
    button2.innerText ="Start game"
    button2.classList.add("btn")
    button2.addEventListener("click", () => startGame()) 
    optionButtonsElement.appendChild(button2)
}

//Removes buttons
function removeButtons () {
    while (optionButtonsElement.firstChild) {
        console.log("Removing stuff")
        optionButtonsElement.removeChild(optionButtonsElement.firstChild) /*removoes all options when options element has a first child*/
    }
}
//Removes the input box
function removeInput () {
    while (inputTextElement.firstChild) {
        console.log("Removing input box")
        inputTextElement.removeChild(inputTextElement.firstChild)
    }
}

//Save character name
function confirmText () { //when the confirm button is clicked, save the characters name and start the game
    characterName = document.getElementById("your-name").value;
    console.log(characterName)
    textElement.innerText = "Nice to meet you " + characterName +". Be careful.";
}

//starts the game
function startGame() { 
    state = {}
    removeInput () //removes the input box so it doesent show when the game starts
    console.log(typeof(characterName))
    showTextNode(2)
    console.log(characterName)
    //textNodes = createTextNode

}

//Display whichever option we're on//
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text //Makes descriptive text show?//
    removeButtons ()

    //textNode.forEach(element => console.log(element));
    textNode.options.forEach(option => {
         if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text 
            button.classList.add('btn') /*styles it properly css*/
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state) //check if we have required state obejct = no required state
}

/*Take whatever option we select*/
function selectOption(option) {
    
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
      }
    state = Object.assign(state, option.setState) //take state we have currently add everything from option setstate to it, ovverride anything thats already there.
    showTextNode(nextTextNodeId)
}

var textNodes = [
    {
        id: 1,
        text: "Welcome, to the land of Wisteria. Who is this brave adventurer?",
        options: [
           {
               text: "Confirm.",
               nextText: 2
           }
        ]
    },
    {
        id: 2,
        text: "On a bright moonlight night you're wandering thorugh an old forrest. Low hanging Wisterias brush agaisnt your face. Down the road you can see a strange stone glistering.",
        options: [
            {
                text: "Pick up the strange stone.", 
                setState: {strangeStone: true},
                nextText: 3
            },
            {
                text: "Keep walking.",
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text:"You venture forth and soon appears a small village. The village seems to be holding a celebration. By the side of the road, you see a merchant.",
        options: [
            {
                text: "Trade the stone for a sword.",
                requiredState: (currentState) => currentState.strangeStone,
                setState: { strangeStone: false, sword: true },
                nextText: 4
            },
            {
                text: "Trade the stone for some money.",
                requiredState: (currentState) => (currentState.strangeStone) ,
                setState: { strangeStone: false, someMoney: true },
                nextText: 4
            },
            {
                text: "Ignore the merchant.",
                requiredState: (currentState) => (currentState.strangeStone || currentState.someMoney), 
                nextText: 4
            },
            {
               text: "You don't seem to have anything of value on you. The merchant ignores you. Keep walking.",
                requiredState: (currentState) => !(currentState.strangeStone || currentState.someMoney), 
                nextText: 4
            }
           
        ]
    },
    {
        id: 4,
        text: "You eventually reach the town where the celebrations is in full bloom. There's music comming from an beat up looking tavern to your left. To your right, a quite Inn glows calmly.",
        options: [
          {
            text: 'Party at the tavern',
            nextText: 5
          },
          {
            text: 'Ask for a room at the quite Inn',
            nextText: 6
          },
          {
            text: 'Find some hay in a stable to sleep in',
            nextText: 7
          }
        ]
      },

      {
          id: 5,
          text: "You decide that it's good idea to knock back a few shots with the locals. On your way back to your table you bump into a very scary looking dragonborn. The bar brawl does not end well for you.",
          options: [
              {
                text: "Game over " + characterName + ". Restart?",
                nextText: -1
            }
          ]
      }
]

// function gameOverText (){
//     return "Game over " + characterName + ". Restart?"
// }
//Calls function startScreen
startScreen()

if (textNodes[5]) {
    //gameOverText()
    const button3 = document.createElement('button')
    button.innerText = "Game over" + characterName + ". Try again?"
    button.classList.add('btn')
    button.addEventListener('click', () => nextText()) //call on confirmText
    optionButtonsElement.appendChild(button)
}



//be den manuellt leta efter id 5 och be den då skita i att hämta sina alternativ från textnodes utan från något annat ställe ???? hej jag heter mattias och jag är en rackare på att programmera