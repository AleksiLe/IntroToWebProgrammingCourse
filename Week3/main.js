const tableBody = document.getElementById("table-body")

async function fetchResponse() {
    const response = await fetch("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff")
    return response.json()
}

const onLoad = () => {
    fetchResponse().then((data) => {
        let arr = []
        for (let value of Object.values(data.dataset.dimension.Alue.category.label)) {
            arr.push(value)
        }
        
        for (i = 0; i < data.dataset.value.length;i++) {
            const tr = document.createElement("tr")
            const municipality = document.createElement("td")
            const population = document.createElement("td")
            municipality.innerHTML = arr[i]
            population.innerHTML = data.dataset.value[i]
            tr.appendChild(municipality)
            tr.appendChild(population)
            tableBody.appendChild(tr)
        }
        console.log(data.dataset.value)
        console.log(data.dataset.dimension.Alue.category.label)
        

    })
}
