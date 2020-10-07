const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state  = {} //Empty objects. Keeps track of what our character has on them//

function startGame() {
    state = {}
    showTextNode(1)
}

//Display whichever option we're on//
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text //Makes descriptive text show?//
    while (optionButtonsElement.firstChild) {
        console.log("Removing stuff")
        optionButtonsElement.removeChild(optionButtonsElement.firstChild) /*removoes all options when options element has a first child*/
    }
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

const textNodes = [
    {
        id: 1,
        text: "On a bright moonlight night you're wandering thorugh an old forrest. Low hanging Wisterias brush agaisnt your face. Down the road you can see a strange stone glistering.",
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
    },
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
    {
        id: 3,
        text: "You eventually reach the town where the celebrations is in full bloom. There's music comming from an beat up looking tavern to your left. To your right, a quite Inn glows calmly.",
        options: [
          {
            text: 'Party at the tavern',
            nextText: 4
          },
          {
            text: 'Ask for a room at the quite Inn',
            nextText: 5
          },
          {
            text: 'Find some hay in a stable to sleep in',
            nextText: 6
          }
        ]
      },

      {
          id: 4,
          text: "You decide that it's good idea to knock back a few shots with the locals. On your way back to your table you bump into a very scary looking dragonborn. The bar brawl does not end well for you.",
          options: [
              {
                text: "Game over. Restart?",
                nextText: -1
            }
          ]
      }
]


/*Call function start game as soon as game has loaded. Starts game*/
startGame ()