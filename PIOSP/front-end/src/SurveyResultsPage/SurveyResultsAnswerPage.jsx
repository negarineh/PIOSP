import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { resultActions } from '../_actions';

import '../components/stylesheets/menuStyle.css';
import 'react-tabs/style/react-tabs.css';
import '../components/stylesheets/MainPage.css';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import matchSorter from 'match-sorter';

import { Confirm, Button, Segment} from 'semantic-ui-react';
import {CSVLink} from 'react-csv';

// all answers for submit page in a table by query options like name, id, date,.etc
class SurveyResultsAnswerPage extends React.Component {

    constructor() {
        super();
        this.state = {
        //   datas: resultActions.getAllSurveyExperienceResults(),
          open: false,
          result: '',
          id1:'',
          answers:[],
        };
        this.show = this.show.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
      }
    
    componentDidMount() {

        fetch('/reportExperienceAnswers')
        .then(data => data.json())
        .then((data) => { this.setState({ answers: data });
      }).catch(err => console.log(err));
         
        this.props.dispatch(resultActions.getAllSurveyExperienceResults());
    }

    changeID(){
        var num =0;
        var newResults = this.state.answers;
        for (var i=0; i<= this.state.answers.length; i++)
            if(this.state.answers._id[i] === this.state.answers._id[i+1] )
                newResults._id[i] = num;
            else
            num = num+1;
        console.log(newResults)   ;      
    }

    show = (id) => this.setState({ open: true, id1: id });
    handleConfirm = () => this.setState({ result: 'confirmed', open: false });
    handleCancel = () => this.setState({ result: 'cancelled', open: false });

  
    render() {
        const { results  } = this.props;
        const { answers, open } = this.state;

        return (
            <div>
                <Segment style={{height: '638.5px'}}>
                    <h3>All answers:</h3>
                    {results.items &&
                        <div className="wrapper" >
                            <ReactTable style={{backgroundColor:"beige", maxHeight:'450px'}}
                                data={results.items}
                                    filterable
                                    defaultFilterMethod={(filter, row) =>
                                    String(row[filter.id]) === filter.value}
                            
                                columns={[
                                    {
                                        columns: [
                                            {
                                            Header: "ID",
                                            id: "_id",
                                            accessor: d => d._id,
                                                filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["_id"] }),
                                                filterAll: true
                                            },
                                            {
                                            Header: "Experience Rate",
                                            id: "experience",
                                            accessor: d => d.experience,
                                                filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["experience"] }),
                                                filterAll: true
                                            }
                                                ]
                                    }
                                    ,
                                    {
                                        columns: [
                                                {
                                                Header: "Participation",
                                                id: "participation",
                                                accessor: d => d.participation,
                                                filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["participation"] }),
                                                filterAll: true,
                                                },
                                                {
                                                Header: "Description",
                                                accessor: "description",
                                                id: "description",
                                                filterMethod: (filter, rows) =>
                                                matchSorter(rows, filter.value, { keys: ["description"] }),
                                                filterAll: true,
                                                },
                                        ]
                                    },
                                    {
                                    Header: "Created Date",
                                    id: "created_date",
                                    accessor: d => d.created_date.toString().slice(0,10),
                                    filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["created_date"] }),
                                    filterAll: true
                                    },
                                ]}
                                defaultPageSize={10}
                                className="-striped -highlight"
                            />
                        <Confirm 
                        open={open}
                        onCancel={this.handleCancel}
                        onConfirm={this.handleConfirm}/>

                    </div>        
                }
                    <Button style={{margin:'20px'}}>
                        <CSVLink data={answers} >Download Survey Results CSV file</CSVLink>
                    </Button>
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { answers, authentication, results } = state;
    const { user } = authentication;
    return {
        user,
        answers,
        results
    };
}

const connectedHomePage = connect(mapStateToProps)(SurveyResultsAnswerPage);
export { connectedHomePage as SurveyResultsAnswerPage };

SurveyResultsAnswerPage.defaultProps = {
    results: {},
    show: () => {},
    handleConfirm: () => {},
    handleCancel: () => {},
    dispatch: () => {}
}

SurveyResultsAnswerPage.propTypes = {
    handleConfirm: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    results: PropTypes.object.isRequired,
    show: PropTypes.func.isRequired,
}


