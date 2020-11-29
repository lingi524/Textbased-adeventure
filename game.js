const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")
var characterName = ""
const inputTextElement = document.getElementById("input")
var myMusic;
let textNodes = []

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
    console.log("Oh, hi there "+characterName)
    textElement.innerText = "Nice to meet you " + characterName +". Be careful.";
    removeInput () //removes the input box so it doesent show when the game starts
    removeButtons ()
    
    //Start game button
    const button2 = document.createElement("button")
    button2.innerText ="Start game"
    button2.classList.add("btn")
    button2.addEventListener("click", () => startGame()) 
    optionButtonsElement.appendChild(button2)

}


//music
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
}

//starts the game
function startGame() { 
    state = {}
    money = 0
    populateList()
    showTextNode(1)
    myMusic = new sound("love-from-afar.mp3");
    myMusic.play()
}

function getMoney(coins){
    money += coins
}

//Display whichever option we're on//
function showTextNode(textNodeIndex) {
    console.log(textNodeIndex)
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    console.log(textNode)
    textElement.innerText = textNode.text //Makes descriptive text show?//
    removeButtons ()

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
    if (state.someMoney){
        getMoney(15) // give the player 15 coins
    }
    showTextNode(nextTextNodeId)
}

function populateList() 

    {
        textNodes.push({ id: 1, text: "On a bright moonlight night you're wandering thorugh an old forrest. Low hanging Wisterias brush agaisnt your face. Down the road you can see a strange stone glistering.",
         options: [ 
            {
                text: "Pick up the strange stone.", 
                setState: {strangeStone: true},
                nextText: 2
            },
            {
                text: "Keep walking.",
                nextText: 2
            }

        ]
        }
        );

        textNodes.push(
            {  
            id: 2,
            text:"You venture forth and soon appears a small village. The village seems to be holding a celebration. By the side of the road, you see a merchant.",
            options: [
            {
                text: "Trade the stone for a sword.",
                requiredState: (currentState) => currentState.strangeStone,
                setState: { strangeStone: false, sword: true },
                nextText: 3
            },
            {
                text: "Trade the stone for some money.",
                requiredState: (currentState) => (currentState.strangeStone) ,
                setState: { strangeStone: false, someMoney: true },
                nextText: 3
            },
            {
                text: "Ignore the merchant.",
                requiredState: (currentState) => (currentState.strangeStone || currentState.someMoney), 
                nextText: 3
            },
            {
               text: "You don't seem to have anything of value on you. The merchant ignores you. Keep walking.",
                requiredState: (currentState) => !(currentState.strangeStone || currentState.someMoney), 
                nextText: 3
            }
           
        ]
    },
        );
        textNodes.push(
                    {  id: 3,
                    text: "You eventually reach the town where the celebrations is in full bloom. There's music comming from a beat up looking tavern to your left. To your right, a quiet Inn glows calmly.",
                    options: [
                      {
                        text: 'Party at the tavern',
                        nextText: 4
                      },
                      {
                        text: 'Ask for a room at the quiet Inn',
                        nextText: 5
                      },
                      {
                        text: 'Find some hay in a stable to sleep in',
                        nextText: 6
                      }
                    ]
        }
        );
        
        textNodes.push(
                     {
                     id: 4,
                      text: "You decide that it's good idea to knock back a few shots with the locals. On your way back to your table you bump into a very scary looking dragonborn. The bar brawl does not end well for you.",
                      options: [
                          {
                            text: "Game over " + characterName + ". Restart?",
                            nextText: -1
                        }
                      ]
        })

        textNodes.push(
            {
            id: 5,
             text: "As soon as you walk in through the door at the inn, you feel like you made the right choice. There's a fire crackling in the fireplace, and the owner, a very kind looking dwarf gives you a smile.",
             options: [
                 {
                   text: "Ask her about the celebrations",
                   nextText: 7
               },
               {
                text: "Ask for a room for the night",
                nextText: 8
            }
             ]
})

        textNodes.push(
            {
            id: 7,
            text: "'Oh, you don't know? Our princess is getting married! It's odd to see a stranger who's not here explicitly for the wedding'",
            options: [
                {
                text: "Thank her for the information and ask for a room",
                nextText: 8
            }
            ]
        })

        let id_8_text
        if (money > 0) {
            id_8_text =  "You have money"
        }
        else{
            id_8_text = "You have no money"
        }
        textNodes.push(
            {
            id: 8,
            text: id_8_text,
            options: [
            {
            text: id_8_text,
            nextText: 7
            }
            ]
            
        })
    
    }


startScreen()




