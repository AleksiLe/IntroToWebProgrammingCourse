const jsonQuery = {
        "query": [
            {
                "code": "Vuosi",
                "selection": {
                    "filter": "item",
                    "values": [
                        "2000",
                        "2001",
                        "2002",
                        "2003",
                        "2004",
                        "2005",
                        "2006",
                        "2007",
                        "2008",
                        "2009",
                        "2010",
                        "2011",
                        "2012",
                        "2013",
                        "2014",
                        "2015",
                        "2016",
                        "2017",
                        "2018",
                        "2019",
                        "2020",
                        "2021"
                    ]
                }
            },
            {
                "code": "Alue",
                "selection": {
                    "filter": "item",
                    "values": [
                        "SSS"
                    ]
                }
            },
            {
                "code": "Tiedot",
                "selection": {
                    "filter": "item",
                    "values": [
                        "vaesto"
                    ]
                }
            }
        ],
        "response": {
            "format": "json-stat2"
        }
}
const submitButton = document.getElementById('submit-data')
const addButton = document.getElementById('add-data')
const navigation = document.getElementById('navigation')
const input = document.getElementById('input-area')

const postData = async () => {
    const res = await fetch('https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(jsonQuery)
    })
    if (!res.ok) {
        return;
    }
    const data = await res.json();
    return data
}

const getData = async () => {
    const res = await fetch("https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px")
    return await res.json()
}

const buildChart = async () => {
    await postData().then((data) => {
        const years = Object.values(data.dimension.Vuosi.category.label)
        const area = Object.values(data.dimension.Alue.category.label)
        const population = data.value
        console.log(years, area)
        let chart = new frappe.Chart("#chart", {
            data: {
                labels: years,
                datasets: [
                    {
                        name: area[0],
                        values: population
                    }
                ]
            },
            title: "My Awesome Chart",
            type: 'line',
            height: 450,
            colors: ['#eb5146']
        })
    })
    
}
const updateChart = async () => {
    const data = await postData()
    const years = Object.values(data.dimension.Vuosi.category.label)
    const area = Object.values(data.dimension.Alue.category.label)
    const population = data.value
    years.push(parseInt(years[years.length - 1]) + 1)
    let calc = 0
    for (let i = 1; i < population.length; i++) {
        calc += population[i]-population[i-1]
    }
    calc = (calc / (population.length-1)) + population[population.length - 1]
    population.push(calc)
    console.log(population)
    const dataset = {
        labels: years,
        datasets: [
            {
                name: area[0],
                values: population
            }
        ]
    }
    let chart = new frappe.Chart("#chart", {
        data: dataset,
        title: "Population",
        type: 'line',
        height: 450,
        colors: ['#eb5146']
    })
}

submitButton.addEventListener('click', async (event) => {
    event.preventDefault()
    const areaCodes = await getData()
    const areaName = input.value
    const index = areaCodes.variables[1].valueTexts.findIndex(area => area === areaName.toString())
    jsonQuery.query[1].selection.values[0] = areaCodes.variables[1].values[index]
    buildChart()
})

addButton.addEventListener('click', async (event) => {
    event.preventDefault()
    updateChart()
})

navigation.addEventListener('click', async (event) => {
    window.location.href = "newchart.html"
})


buildChart()