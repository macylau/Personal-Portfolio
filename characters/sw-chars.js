import { people } from '../data/people.js'
import { getLastNumber, removeChildren } from '../utils/index.js'

const header = document.querySelector('header')
const main = document.querySelector('main')

const allCharsButton = document.createElement('button')
allCharsButton.textContent = 'All Characters'
allCharsButton.addEventListener('click', function () {
  populateDOM(people)
})

const maleCharacters = people.filter(person => person.gender === 'male')  // elegant filter!
const femaleCharacters = people.filter(person => person.gender === 'female') 

const otherCharacters = people.filter ((person) =>  {
  if (
    person.gender !== 'male' && person.gender !== 'female'
  ) {
    return person 
  }
})


const maleCharsButton = document.createElement('button')
maleCharsButton.setAttribute("id", "male")
maleCharsButton.textContent = 'Male Characters'
maleCharsButton.addEventListener('click', () => populateDOM(maleCharacters))

const femaleCharsButton = document.createElement('button')
femaleCharsButton.setAttribute("id", "female")
femaleCharsButton.textContent = 'Female Characters'
femaleCharsButton.addEventListener('click', () => populateDOM(femaleCharacters))

const otherCharsButton = document.createElement('button')
otherCharsButton.setAttribute("id", "others")
otherCharsButton.textContent = 'Other Characters'
otherCharsButton.addEventListener('click', () => populateDOM(otherCharacters))

// TODO: create a female characters button and add it to the DOM
// TODO: create a other characters button and add it to the DOM

header.appendChild(allCharsButton)
header.appendChild(maleCharsButton)
header.appendChild(femaleCharsButton)
header.appendChild(otherCharsButton)

function populateDOM(characters) {
  // loop through all the characters and make figure elements and insert them into DOM
  removeChildren(main)
  characters.forEach((person) => {
    const personFig = document.createElement('figure')
    const personImg = document.createElement('img')

    // Set the new image's source property to a valid URL or path
    let charNum = getLastNumber(person.url)

    personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    const personCap = document.createElement('figcaption')
    personCap.textContent = person.name

    personFig.appendChild(personImg)
    personFig.appendChild(personCap)
    main.appendChild(personFig)
  })
}

populateDOM(people)
