import React, { Component } from 'react';
import "./dashboard.css";
import TextWidget from './textWidget';
import BarWidget from './barWidget';
import DoughnutWidget from "./doughnutWidget";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Container,Row,Col } from "react-bootstrap";


const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class dashboard extends Component {

    constructor() {
        super();
        this.state = {
            items: [],
            dropdownOptions: [],
            selectedValue: null,
            organicSource: null,
            directSource: null,
            referralSource: null,
            pageViews: null,
            users: null,
            newUsers: null,
            sourceArray: [],
            usersArray: [],
        };
    }

    getData = arg => {
        const array = this.state.items;
        const arrayLength = array.length;
        let organicSource = 0;
        let directSource = 0;
        let referralSource = 0;
        let pageViews = 0;
        let users = 0;
        let newUsers = 0;
        let selectedValue = null;
        let sourceArray = [];
        let usersArray = [];

        for (let i=0; i < arrayLength; i++) {
            if (arg == array[i]["month"]) {
                organicSource = array[i].organic_source;
                directSource = array[i].direct_source;
                referralSource = array[i].referral_source;
                pageViews = array[i].page_views;
                users = array[i].users;
                newUsers = array[i].new_users;
                sourceArray.push(
                    {
                        label: "Organic Source",
                        value: array[i].organic_source
                    },
                    {
                        label: "Direct Source",
                        value: array[i].direct_source
                    },
                    {
                        label: "Referral Source",
                        value: array[i].referral_source
                    },
                )
                usersArray.push(
                    {
                        label: "Users",
                        value: array[i].users
                    },
                    {
                        label: "New Users",
                        value: array[i].new_users
                    },
                )
            }
        }
        selectedValue = arg;

        this.setState ({
            organicSource: organicSource,
            directSource: directSource,
            referralSource: referralSource,
            pageViews: pageViews,
            users: users,
            newUsers: newUsers,
            sourceArray: sourceArray,
            usersArray: usersArray,
        })
    }

    updateDashboard = event => {
        this.getData(event.value)
        this.setState({
            selectedValue: event.value
        });
    }

    componentDidMount() {
        fetch(url)
            .then(response => response.json())
            .then(data => {

                let batchRowValues = data.valueRanges[0].values;

                const rows = [];

                for (let i = 1; i < batchRowValues.length; i++) {
                    let rowObject = {};
                    for (let j = 0; j < batchRowValues[i].length; j++) {
                        rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                    }
                    rows.push(rowObject);
                }
                
                // dropdown options
                let dropdownOptions = [];

                for (let i = 0; i < rows.length; i++) {
                    dropdownOptions.push(rows[i].month);
                }

                dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
                this.setState(
                    {
                        items: rows,
                        dropdownOptions: dropdownOptions,
                        selectedValue: "Jan 2018"
                    },
                    () => this.getData("Jan 2018")
                );
            });
    }

    render() {

        // Preparing the chart data
        const chartData = [
            
            
        ];

        return (
            <div>
                <Container fluid>
                    <Row className="topHeader">
                        <Col>
                        Dashboard
                        </Col>
                        <Col>
                            <Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />
                        </Col>
                    </Row>
                </Container>
                <Container className="mainDashboard">
                    <Row>
                        <Col>
                            <TextWidget title="Organic Source" value={this.state.organicSource}/>
                        </Col>
                        <Col>
                            <TextWidget title="Direct Source" value={this.state.directSource}/>
                        </Col>
                        <Col>
                            <TextWidget title="Referral Source" value={this.state.referralSource}/>
                        </Col>
                        <Col>
                            <TextWidget title="Page Views" value={this.state.pageViews}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <BarWidget title="Source Comparison" data={this.state.sourceArray}/>
                        </Col>
                        <Col>
                            <DoughnutWidget title="Users Comparison" data={this.state.usersArray}/>
                        </Col>
                        {/* <Col>
                            <TextWidget title="Users" value={this.state.users}/>
                        </Col>
                        <Col>
                            <TextWidget title="New Users" value={this.state.newUsers}/>
                        </Col> */}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default dashboard;
