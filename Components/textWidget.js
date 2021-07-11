import React from 'react'

function textWidget(props) {
    return (
        <div className="widgetWrap">
            <div className="widgetTitle">
                {props.title}
            </div>
            <div className="widgetValue">
                <div className="Value">{props.value}</div>
                <div className="Description">{props.description}</div>
            </div>
        </div>
    )
}

export default textWidget;

