import ColorUtils from "utils/ColorUtils"

const PieOptions = () => {

    return {
        "labels": [
            "Your files",
            "System",
            "Empty"
        ],
        "colors": [
            "#4318FF",
            "#6AD2FF",
            "#EFF4FB"
        ],
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
            "enabled": false
        },
        "hover": {
            "mode": null
        },
        "plotOptions": {
            "donut": {
                "expandOnClick": false,
                "donut": {
                    "labels": {
                        "show": false
                    }
                }
            }
        },
        "fill": {
            "colors": [
                "#4318FF",
                "#6AD2FF",
                "#EFF4FB",
                "#33a1ff",
                "#003b8c",
            ]
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