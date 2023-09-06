const usernameField = document.getElementById('input-username')
const emailField = document.getElementById('input-email')
const adminField = document.getElementById('input-admin')
const submitButtton = document.getElementById('submit-data')
const clearButton = document.getElementById('empty-table')
const image = document.getElementById('input-image')

const table = document.getElementById('table')
const tableHeader = document.getElementById('table-header')

submitButtton.addEventListener('click', (event) => {
    event.preventDefault()
    let rows = table.getElementsByTagName('tr')
    //Create img element
    let img = document.createElement('img')
    img.width = 64
    img.height = 64
    img.src = URL.createObjectURL(image.files[0])
    //Check if name exist
    for (i = 1; i < rows.length; i++) { //Iterator is 1 because then it skips tableHeader
        let row = rows[i].getElementsByTagName('td')
        if (usernameField.value === row[0].innerText) {
            row[1].innerHTML = emailField.value
            row[2].innerHTML = adminField.checked ? 'X' : '-'
            row[3].appendChild(img)
            return
        }
    }
    //Insert if name didnt exist
    let tr = table.insertRow(-1);
    tr.insertCell(0).innerHTML = usernameField.value
    tr.insertCell(1).innerHTML = emailField.value
    tr.insertCell(2).innerHTML = adminField.checked ? 'X' : '-'
    tr.insertCell(3).appendChild(img)
}, false)

clearButton.addEventListener('click', (event) => {
    event.preventDefault()
    table.replaceChildren(tableHeader)
}, false)
