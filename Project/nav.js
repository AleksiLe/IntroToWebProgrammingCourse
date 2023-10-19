//Map

const changeYearActiveClass = (ele) => {
    let element = document.getElementsByClassName('year active')
    element[0].classList.remove('active')
    let activeElement = document.getElementById(ele.id)
    activeElement.classList.add('active')
}

const changeDataActiveClass = (ele) => {
    let element = document.getElementsByClassName('data active')
    element[0].classList.remove('active')
    let activeElement = document.getElementById(ele.id)
    activeElement.classList.add('active')
}

const yearClicked = (ele) => {
    queryMap.query[0].selection.values = [ele.id]
    changeYearActiveClass(ele)
    updateMap()
}

const dataClicked = (ele) => {
    queryMap.query[2].selection.values = [ele.id]
    changeDataActiveClass(ele)
    updateMap()
}

//Chart

const submitData = document.getElementById('modalSendButton')
const dataForm = document.getElementById('formchart-form')
submitData.addEventListener('click', (event) => {
    event.preventDefault()
    query.query[2].selection.values = []
    for (i = 0; i < dataForm.selectedOptions.length; i++) {
        query.query[2].selection.values.push(dataForm.selectedOptions[i].value)
    }

    const line = document.getElementById('line')
    const bar = document.getElementById('bar')
    if (line.checked) {
        chartType = 'line'
    }
    else if (bar.checked) {
        chartType = 'bar'
    }
    updateChart()
}) 

const exportData = document.getElementById('exportChartButton')

exportData.addEventListener('click', (event) => {
    event.preventDefault()
    chart.export()
})





            