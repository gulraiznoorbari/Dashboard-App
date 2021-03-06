import React from 'react'
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function barWidget(props) {

    // Create a JSON object to store the chart configurations
    const chartConfigs = {
        type: "bar2d", // The chart type
        width: "100%", // Width of the chart
        height: "125", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
        // Chart Configuration
        chart: {
            theme: "fusion",
            bgColor: "#2a2a2a", 
            },
        // Chart Data - from step 2
        data: props.data
        }
    };

    return (
        <div className="widgetWrap">
            <div className="widgetTitle">
                {props.title}
            </div>
            <div className="widgetValue">
                <ReactFC {...chartConfigs} />
            </div>
        </div>
    )
}

export default barWidget;

