import ColorUtils from "utils/ColorUtils"

const PieOptions = (labels, colors) => {

    return {
        "labels": labels,
        "colors": colors,
        "chart": {
            "width": "50px"
        },
        "states": {
            "hover": {
                "filter": {
                    "type": "none"
                }
            }
        },
        "legend": {
            "show": false
        },
        "dataLabels": {
            "enabled": false,
            'textAnchor': 'start'
        },
        "hover": {
            "mode": null
        },
        "plotOptions": {
            "pie": {
                "states": {
                    "hover": {
                        brightness: 0,
                        halo: {
                            opacity: 1
                        }
                    }
                }
            }
        },
        "fill": {
            "colors": colors
        },
        "tooltip": {
            "enabled": true,
            "theme": "dark",
            "style": {
                "fontSize": "12px",
                "backgroundColor": "#000000"
            }
        }
    }
}
export default PieOptions;