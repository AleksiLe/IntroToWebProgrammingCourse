const inputShow = document.getElementById("input-show")
const submitData = document.getElementById("submit-data")
const showContainer = document.getElementById("show-container")

async function fetchResponse(url, query) {
    const response = await fetch(url + query)
    return response.json()
}

const stringToNode = (html) => {
    const p = document.createElement("p")
    p.innerHTML = html.trim()
    return p.childNodes[0]
}

const createContainer = (image,title,summary) => {
    const container = document.createElement("div")
    const infoContainer = document.createElement("div")
    container.classList.add("show-data")
    infoContainer.classList.add("show-info")
    const img = document.createElement("img")
    img.src = image 
    container.appendChild(img)
    const h1 = document.createElement("h1")
    h1.innerText = title
    p = stringToNode(summary)
    infoContainer.appendChild(h1)
    infoContainer.appendChild(p)
    container.appendChild(infoContainer)
    showContainer.appendChild(container)
}

submitData.addEventListener("click", (event) => {
    event.preventDefault()
    fetchResponse("https://api.tvmaze.com/search/shows?q=", inputShow.value)
    .then(response => {
        showContainer.innerHTML = "" //Clears showContainer div before appending new data
        for (i = 0; i < response.length; i++) {
            try {
                createContainer(response[i].show.image.medium, response[i].show.name, response[i].show.summary)
            } catch (error) {
                console.log(error)
            }
        }
       


    })
})
