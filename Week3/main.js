const tableBody = document.getElementById("table-body")

async function fetchResponse(url) {
    const response = await fetch(url)
    return response.json()
}

function calculateEmploymentRate(population, employed) {
    return (employed/population)*100
}

const onLoad = async() => {
    const arrLocation = []
    const arrPopulation = new Array()
    const arrEmployedPop = []
    await fetchResponse("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff").then((response) => {
        for (let value of Object.values(response.dataset.dimension.Alue.category.label)) {
            console.log(value)
            arrLocation.push(value)
        }
        for (let value of response.dataset.value) {
            arrPopulation.push(value)
        } 
    })
    await fetchResponse("https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065").then((response) => {
        for (let value of response.dataset.value) {
            arrEmployedPop.push(value)
        }})
    // onLoad needs to be async so it awaits the fetchResponse functions to finish before populating table
    for (i = 0; i < 10;i++) {
        console.log(arrLocation[i])
        const tr = document.createElement("tr")
        const municipality = document.createElement("td")
        const population = document.createElement("td")
        const employment = document.createElement("td")
        const employmentRate = document.createElement("td")
        municipality.innerHTML = arrLocation[i]
        population.innerHTML = arrPopulation[i]
        employment.innerHTML = arrEmployedPop[i]
        employmentRate.innerHTML = calculateEmploymentRate(arrPopulation[i], arrEmployedPop[i]).toFixed(2)
        tr.appendChild(municipality)
        tr.appendChild(population)
        tr.appendChild(employment)
        tr.appendChild(employmentRate)
        // Change background color based on employment rate
        if (employmentRate.innerHTML > 45) {
            tr.style.backgroundColor = "#abffbd"
        } else if (employmentRate.innerHTML < 25) {
            tr.style.backgroundColor = "#ff9e9e"
        }
        tableBody.appendChild(tr)
    }
}

document.addEventListener("DOMContentLoaded", onLoad)
