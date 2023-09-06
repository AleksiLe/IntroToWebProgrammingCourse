const myButton = document.getElementById("my-button")
const headLine = document.getElementById('headline')
const addButton = document.getElementById('add-data')
const list = document.getElementById('list')
const textArea = document.getElementById('textarea')

myButton.addEventListener('click', () => {
    console.log("hello world")
    headline.innerHTML = 'Moi maailma'
})

addButton.addEventListener('click', () => {
    var li = document.createElement("li")
    li.innerHTML = textArea.value
    list.appendChild(li)
})
