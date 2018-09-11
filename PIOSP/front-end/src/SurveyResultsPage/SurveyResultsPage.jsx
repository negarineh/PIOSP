import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../components/stylesheets/menuStyle.css';
import 'react-tabs/style/react-tabs.css';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import matchSorter from 'match-sorter';
import _ from "lodash";

import { Segment, Button, Dropdown} from 'semantic-ui-react';

import {CSVLink} from 'react-csv';

  const tagOptionsMenu = [
    {
      text: 'Survey Results Based on Category',
      value: 'Survey Results Based on Category',
      icon: {name:'table', color:'black'}
    },
    {
      text: 'Survey Results',
      value: 'Survey Results',
      icon: {name:'table', color:'black'},
    },
  ];

// all answers for submit page in a table by query options like name, id, date,.etc
class SurveyResultsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          expanded: false,
          photo:'',
          answers:[],
          activeItem: 'home',
          option:'',
        }; 
      }

    componentDidMount() {
        
        fetch('/surveyResultsUpdate') // ('/reportAnswers')
        .then(data => data.json())
        .then((data) => { this.setState({ answers: data });
      }).catch(err => console.log(err));
        
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
      };
    

    population(c) { return c.population; }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    };

    handleChange = (e, { name, value }) => 
        {
            this.setState({ [name]: value , option: value});
            if (value === 'Profile')
                alert("Profile");
            if (value === 'SignOut')
                alert('SignOut');
        };
  
    render() {
        const { answers, option } = this.state;

        return (
            <div >
                <Segment style={{height: '638.5px'}}>
                    <h3>All surveys:</h3>
                    {answers &&
                    <div>
                        <label style={{textAlign:'left'}}>Select Table</label>
                        <Dropdown
                            selection
                            name='default'
                            options={tagOptionsMenu}
                            placeholder='Select Table'
                            onChange={this.handleChange.bind(this)}
                            onClick={this.handleItemClick.bind(this)}
                            fluid
                        />
                    {option ==='Survey Results Based on Category'?
                        <div className="wrapper" > 
                                <ReactTable style={{backgroundColor:"beige",maxHeight:'450px'}}
                                    data={answers}
                                    filterable
                                    defaultFilterMethod={(filter, row) =>
                                    String(row[filter.id]) === filter.value}
                                    columns={[
                                        {
                                        columns: [
                                            {
                                            Header: "ID",
                                            id: "Id",
                                            accessor: d => d.Id,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["Id"] }),
                                            filterAll: true,
                                            },
                                            {
                                            Header: "Photo",
                                            id: "photo",
                                            accessor: d => d.photo,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["photo"] }),
                                            filterAll: true,
                                            },
                                        ]
                                        },
                                            {
                                        columns: [
                                            {
                                            Header: "Answer",
                                            id: "answer",
                                            accessor: d => d.answer,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["answer"] }),
                                            filterAll: true,
                                            },
                                            {
                                            Header: "Description",
                                            id: "description",
                                            accessor: d => d.description,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["description"] }),
                                            filterAll: true,
                                            Footer: (
                                                <span>
                                                <strong>Longest:</strong>{" "}
                                                {_.reduce(
                                                    _.map(
                                                    _.groupBy(answers, d => d.description),
                                                    (d, key) => key
                                                    ),
                                                    (a, b) => (a.length > b.length ? a : b)
                                                )}
                                                </span>
                                                    )   
                                            }
                                        ]
                                        }
                                    ]}
                                    pivotBy={[ "answer"]}
                                    defaultPageSize={10}
                                    className="-striped -highlight"
                                    />
                        
                            </div>:
                        null }
                    </div>}
                            {option ==='Survey Results'?
                            <div className="wrapper" > {/*style={{paddingLeft:"40px", paddingRight:"40px"}} */}
                            <ReactTable style={{backgroundColor:"beige", maxHeight:'450px'}}
                            data={answers}
                            filterable
                            defaultFilterMethod={(filter, row) =>
                            String(row[filter.id]) === filter.value}
                            columns={[
                                {
                                columns: [
                                    {
                                    Header: "ID",
                                    id: "Id",
                                    accessor: d => d.Id,
                                    filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["Id"] }),
                                    filterAll: true
                                    },
                                    {
                                    Header: "Photo",
                                    id: "photo",
                                    accessor: d => d.photo,
                                    filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["photo"] }),
                                    filterAll: true
                                    }
                                ]
                                },
                                    {
                                columns: [
                                    {
                                    Header: "Answer",
                                    id: "answer",
                                    accessor: d => d.answer,
                                    filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["answer"] }),
                                    filterAll: true
                                    },
                                    {
                                    Header: "Description",
                                    id: "description",
                                    accessor: d => d.description,
                                    filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["description"] }),
                                    filterAll: true
                                    }
                                ]
                                }
                            ]}
                            defaultPageSize={10}
                            className="-striped -highlight"
                            showPaginationTop
                            showPaginationBottom
                            />
                            {'Tip: Hold shift when sorting to multi-sort!'}
                            </div>:
                            null }
                        <Button style={{margin:'20px'}}>
                            <CSVLink data={answers} >Download Survey Results CSV file</CSVLink>
                        </Button>
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(SurveyResultsPage);
export { connectedHomePage as SurveyResultsPage };

SurveyResultsPage.defaultProps = {
    handleItemClick: () => {},
    handleChange: () => {}
}

SurveyResultsPage.propTypes = {
    handleItemClick: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
}