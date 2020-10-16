//Declarations
const requestUrl = "https://www.reddit.com/search.json?q=";
const input = document.querySelector('#input')

let submission = document.querySelector('#submission')
let searchbox = document.querySelector('.searchbox')
let main = document.querySelector('main')
let body = document.querySelector('body')

let stop = document.createElement('button')
stop.innerText = 'Stop Slideshow'

//Function to fetch request
function getPics(request) {
    let pictures = [];
    
    fetch(request)

    .then((responseData)=> {
        return responseData.json()
    })

    .then((jsonData)=> {
        pictures = jsonData.data.children.map(child => child.data.thumbnail).filter(urls => urls[0] === 'h')
        slideshow(pictures)
    })

    .catch((error)=> {
        console.log("Error!", error)
    })

}

//Function for slideshow of pictures
function slideshow(pictures) {
    searchbox.parentNode.removeChild(searchbox)
    //Calls pitures for the slideshow
    print(pictures)
    interval = setInterval(print, 2000, pictures)
    body.appendChild(stop)
}

//Function to call pictures
function print(pictures) {
    let img = document.createElement('img')
    let counter = 0
    let pic = pictures[counter]
    let removeImage = document.querySelector('img')
    
    if(main.firstElementChild) {
        main.removeChild(removeImage)
    }
    
    img.setAttribute('src', pic)
    main.appendChild(img)
    counter ++

    if(counter === pictures.length) {
        counter = 0
    }
}

//Restart function
function restart() {
    let interval
    clearInterval(interval)

    while(main.firstChild) {
        main.removeChild(main.firstChild)
    }

    main.appendChild(searchbox)
    body.removeChild(stop)
    input.value = ''
}   


document.addEventListener('DOMContentLoaded', ()=> {
    submission.addEventListener('submit', (event)=> {
        event.preventDefault()
        getPics(requestUrl + input.value)
    })

    stop.addEventListener('click',(event)=>{
        event.preventDefault()
        restart()
    })
})
