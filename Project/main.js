//saves chart here always when changed and loads it when reguested
let chart = null
//Variable to know are we adding and showing or showing values on chart
let sumValues = false
//Saves the chart dataset here for sum function
let chartDataset = null
//Chart type variable
let chartType = 'bar'
//Variable for old layer
let oldLayer = null

//Fetches geojson data and adds the data from the queryMap to the geojson
const fetchMapData = async () => {
    const url = 'https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326'
    const res = await fetch(url)
    const datageo = await res.json()
    const data = await postData(queryMap)
    
    const geoData = JSON.parse(JSON.stringify(datageo))
    for (i = 0; i < data.value.length-1; i++) {
        geoData.features[i].properties.variable = data.value[i+1]
    }  
    return geoData
}


//Initializes the map and adds the geojson data
const initMap = (data) => {
    const map = L.map('map').setView([64.5599, 26.8409], 5);

    let geoJson = L.geoJSON(data, {
        weight: 1,
        onEachFeature: GetFeature,
        }).addTo(map)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 5,
    maxZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

    map.fitBounds(geoJson.getBounds())
}

//Adds the tooltip and the click event to the map
const GetFeature = (feature, layer) => {
    if (!feature.properties.name) return
    const id = 'KU' + feature.properties.kunta
    layer.bindTooltip("<a>"+feature.properties.name+"</a><br><a>"+feature.properties.variable+"</a>")
    layer.on('click', () => {
        query.query[1].selection.values = [id]
        if (oldLayer !== null) {
            oldLayer.setStyle({fillColor: '#3388ff'})
        }
        oldLayer = layer
        layer.setStyle({fillColor: '#96ead0'})

        updateChart()

    })
}

//Builds the chart from the data
const buildChart = (data) => {
    const years = Object.values(data.dimension.Vuosi.category.label)
    const names = Object.values(data.dimension.Tiedot.category.label)
    let dataset = []

    for  (j = 0; j < names.length; j++) {
        const emptyArray = []
        for (i = j; i < data.value.length; i = i + names.length) {
            emptyArray.push(data.value[i])
        }
        dataset.push({
            name: names[j],
            values: emptyArray
        })
    }
    
    const chart = new frappe.Chart("#chart", {
        title: Object.values(data.dimension.Alue.category.label),
        data: 
        {
            labels: years,
            datasets: dataset
        },
        type: chartType,  
        height: 450,
        colors: [ '#63d0ff', '#363636'],
    })
    return chart
}

//Sum different zones
const sumChart = (data, chartData) => {
    const years = Object.values(data.dimension.Vuosi.category.label)
    const names = Object.values(data.dimension.Tiedot.category.label)
    let dataset = []
    if (chartData === null) {
        for  (j = 0; j < names.length; j++) {
            const emptyArray = []
            for (i = j; i < data.value.length; i = i + names.length) {
                emptyArray.push(data.value[i])
            }
            dataset.push({
                name: names[j],
                values: emptyArray
            })
        }
    }
    else {
        for  (j = 0; j < names.length; j++) {
            for (i = j; i < chartData[j].values.length; i ++) {
                chartData[j].values[i] += data.value[i*names.length+j]
            }
        }
        dataset = chartData
    }
    
    const chart = new frappe.Chart("#chart", {
        title: Object.values(data.dimension.Alue.category.label),
        data: 
        {
            labels: years,
            datasets: dataset
        },
        type: chartType,
        height: 450,
        colors: [ '#63d0ff', '#363636','#63d0ff','#363636','#63d0ff','#363636','#63d0ff'],
    })
    return chart, dataset
}

//Posts the query to the api and returns the data
const postData = async (query) => {
    const res = await fetch('https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/muutl/statfin_muutl_pxt_11ae.px', {
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

//Updates the chart
const updateChart = () => {
    if (sumValues === true) {
        postData(query).then((data) => {
            console.log("Chart Sum Updated")
            chart, chartDataset = sumChart(data, chartDataset)
        }) 
    }
    else if (sumValues === false) {
        postData(query).then((data) => {
            chart = buildChart(data)
            console.log("Chart Updated")
        }) 
    }
}

//Updates the map
const updateMap = () => {
    map.remove()
    const div = document.createElement('div')
    div.id = 'map'
    document.getElementById('map-con').appendChild(div)
    fetchMapData().then((data) => {
        initMap(data)
        console.log("Map Updated")
    })
}

//Initializes the map and the chart on page load
const onInit = () => {
    fetchMapData().then((data) => {
        initMap(data)
        console.log("Map Initialized")
    postData(query).then((data) => {
        chart = buildChart(data)
        console.log("Chart Initialized")
    })
    })
}

//Functions of buttons under chart
const dataSwap = document.getElementById('dataSwap')
dataSwap.addEventListener('click', (event) => {
    event.preventDefault()
    dataSwap.innerText === 'Sum together different zones' ? dataSwap.innerText = 'Only show single zone' : dataSwap.innerText = 'Sum together different zones'
    sumValues === false ? sumValues = true : sumValues = false
    //deactivate changing chart type
    if (sumValues === true) {
        console.log("Chart Sum Initialized")
        
    }
    else if (sumValues === false) {
        chartDataset = null
        postData(query).then((data) => {
            chart = buildChart(data)
            console.log("Chart Sum Reset")
        })
    }
})



const dataInfo = document.getElementById('dataInfo')
dataInfo.addEventListener('click', (event) => {
    event.preventDefault()
    alert('Data is summed after clicking "Sum together different zones" button. Clicking it again will reset the mode. Clicking again on the map will reset the chart.')
}) 
onInit() 


