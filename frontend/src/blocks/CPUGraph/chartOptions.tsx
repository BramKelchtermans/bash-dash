const CPUChartOptions = {
    "legend": {
        "show": false
    },
    chart: {
        id: 'realtime',
        height: 500,
        type: 'line',
        animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
                speed: 1000
            }
        },
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    "theme": {
        "mode": "light"
    },
    "dataLabels": {
        "enabled": false
    },
    "stroke": {
        "curve": "smooth"
    },
    "tooltip": {
        "style": {
            "fontSize": "12px",
            "backgroundColor": "#000000"
        },
        "theme": "dark",
        "x": {
            "format": "dd/MM/yy HH:mm"
        }
    },
    "grid": {
        "show": false
    },
    "xaxis": {
        type: 'datetime',
        "show": false
    },
    "yaxis": {
        "max": 100,
        "show": false
    }
}
export default CPUChartOptions;