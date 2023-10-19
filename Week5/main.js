const fetchData = async () => {
    const url = 'https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326'
    const res = await fetch(url)
    const data = await res.json()

    const positive = await fetchMunicipalities("https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f")
    const negative = await fetchMunicipalities("https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e")
    const addedData = JSON.parse(JSON.stringify(data))
    for (i of addedData.features) {
        index = i.properties.kunta
        id = "KU"+index
        i.properties.positive = positive.dataset.value[positive.dataset.dimension.Tuloalue.category.index[id]]
        i.properties.negative = negative.dataset.value[negative.dataset.dimension.Lähtöalue.category.index[id]]
    } 
    initMap(addedData)
}
const fetchMunicipalities = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

const initMap = (data) => {
    let map = L.map('map', {
        minZoom: -3
    })
    
    let geoJson = L.geoJSON(data, {
        weight: 2,
        onEachFeature: GetFeature,
        style: getStyle
        }).addTo(map)
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    
    map.fitBounds(geoJson.getBounds())
}

const GetFeature = (feature, layer) => {
    if (!feature.properties.name) return
    layer.bindPopup("+ " + feature.properties.positive.toString() + " - " + feature.properties.negative.toString())
    layer.bindTooltip(feature.properties.name)
    
}

const getStyle = (feature) => {
    let hue = (parseInt(feature.properties.positive) / parseInt(feature.properties.negative))**3*60
    if (hue > 120) {
        hue = 120
    }
    return { 
        color: 'hsl('+hue+', 75%, 50%)'
    }
}

fetchData()
