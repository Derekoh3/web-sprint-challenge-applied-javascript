import axios from "axios"

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  // destructure object
  const { headline, authorPhoto, authorName} = article

  // create elements
  const cardContainer = document.createElement('div')
  const headlineDiv = document.createElement('div')
  const authorDiv = document.createElement('div')
  const imgContainer = document.createElement('div')
  const img = document.createElement('img')
  const name = document.createElement('span')

  // structure elements
  cardContainer.append(headlineDiv, authorDiv)
  authorDiv.append(imgContainer, name)
  imgContainer.appendChild(img)

  // add necessary content, attributes, and classes
  cardContainer.classList.add('card')
  headlineDiv.classList.add('headline')
  headlineDiv.textContent = headline
  authorDiv.classList.add('author')
  imgContainer.classList.add('img-container')
  img.setAttribute('src', authorPhoto)
  name.textContent = 'By: ' + authorName

  //add click event listener. When user clicks on a card, headline is logged to console
  const eventHandler = (event) => {
    console.log(headline)
  }

  cardContainer.addEventListener('click', eventHandler)

  return cardContainer
}


const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  axios.get('https://lambda-times-api.herokuapp.com/articles')
  .then(res => {
    //console.log(res)
    const selection = document.querySelector(selector)
    const cardObj = res.data.articles
    console.log(cardObj)

    for (const property in cardObj) {
      cardObj[property].forEach(item => {
        selection.append(Card(item))
      })
    }

  })

  .catch(err => {
    console.log(err)
  })
  
}

export { Card, cardAppender }