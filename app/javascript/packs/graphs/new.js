
createChart = (data) => {
    const chart = new Chart(document.getElementById('graph-canvas'), {
        type: 'line',
        data: data
    })
}

monthLabel = (date_arr) => {
    if(date_arr[0] == '1') return "Jan-" + date_arr[2]
    if(date_arr[0] == '2') return "Feb-" + date_arr[2]
    if(date_arr[0] == '3') return "Mar-" + date_arr[2]
    if(date_arr[0] == '4') return "Apr-" + date_arr[2]
    if(date_arr[0] == '5') return "May-" + date_arr[2]
    if(date_arr[0] == '6') return "Jun-" + date_arr[2]
    if(date_arr[0] == '7') return "Jul-" + date_arr[2]
    if(date_arr[0] == '8') return "Aug-" + date_arr[2]
    if(date_arr[0] == '9') return "Sep-" + date_arr[2]
    if(date_arr[0] == '10') return "Oct-" + date_arr[2]
    if(date_arr[0] == '11') return "Nov-" + date_arr[2]
    if(date_arr[0] == '12') return "Dec-" + date_arr[2]
}

mapByMonth = (result, content) => {
    split_date = content.transaction_date.split('/')
    month_label = monthLabel(split_date)
    date_index = result.labels.indexOf(month_label)
    if(date_index < 0) {
        result.labels.push(month_label)
        result.data.push([parseFloat(content['price (USD)'])])
    } else {
        result.data[date_index].push(parseFloat(content['price (USD)']))
    }
    return result
}

parseCSV = () => {
    data = d3.csvParse(reader.result)
    mapped_data = data.reduce(mapByMonth, {
        labels: [],
        data: []
    })

    prices_data= mapped_data.data.map((x) => x.reduce((p, c) => p + c, 0) / x.length )
    if(data) {
        _data = {
            labels: mapped_data.labels,
            datasets: [
                {
                    label: 'Average Price per Month in USD',
                    data: prices_data,
                    borderColor: 'rgb(75, 192, 192)'
                }
            ]
        }
        createChart(_data)
    }
}

const reader = new FileReader()
reader.addEventListener('load', parseCSV, false)

startListeners = () => {
    document.getElementById('submit-cvs').addEventListener('click', function(ev) {
        const file = document.getElementById('csv-input').files[0]
        if(!file) return
        this.disabled = true

        reader.readAsText(file)
    })
}

document.addEventListener('turbolinks:load', () => {
    startListeners()
})