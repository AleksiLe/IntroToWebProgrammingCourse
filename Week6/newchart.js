    //Assignment needs to have 3 post request and cant have 2 in same one so we need to split these
const jsonQuery1 = {
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
                    "vm01"
                ]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}
const jsonQuery2 = {
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
                    "vm11"
                ]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}

const navigation = document.getElementById('navigation')

navigation.addEventListener('click', async (event) => {
    event.preventDefault()
    window.location.href = "index.html"
})

const postData = async (query) => {
    const res = await fetch('https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(query)
    })

    
    if (!res.ok) {
        return;
    }
    const data = await res.json();
    return data
}

const buildChart = async () => {
    const data1 = await postData(jsonQuery1)
    const data2 = await postData(jsonQuery2)
    const years = Object.values(data1.dimension.Vuosi.category.label)
    
    const chart = new frappe.Chart("#chart", {
        title: "Birth and Death chart",
        data: 
        {
            labels: years,
            datasets: [
                {
                    name: "Births",
                    values: data1.value
                },
                {
                    name: "Deaths",
                    values: data2.value
                }
            ]
        },
        type: 'bar',
        height: 450,
        colors: [ '#63d0ff', '#363636'],
        
    })
}

buildChart()