import { films } from '../data/films.js'
import { getLastNumber } from '../utils/index.js'

// Third, use a variable to store a 'reference' to the main element with an id attribute of 'filmList'
let filmList = document.querySelector('#filmList')

for (let i = 0; i < films.length; i++) {
  // First, create an img element

  let figure = document.createElement('figure')
  let figImage = document.createElement('img')
  let figCaption = document.createElement('figcaption')

  // Second, set the new image's source property to a valid URL or path
  let filmNum = getLastNumber(films[i].url)

  figImage.src = `https://starwars-visualguide.com/assets/img/films/${filmNum}.jpg`

  figCaption.textContent = films[i].title

  // Fourth, append the newly created img element as a child of the main element to make it appear in the DOM
  figure.appendChild(figImage)
  figure.appendChild(figCaption)

  filmList.appendChild(figure)
}