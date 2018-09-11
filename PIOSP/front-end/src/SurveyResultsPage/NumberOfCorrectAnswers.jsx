import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../components/stylesheets/menuStyle.css';
import 'react-tabs/style/react-tabs.css';
import "react-table/react-table.css";

import {Bar} from 'react-chartjs-2';

//Bar chart base on correct and incorrect answers per category
class NumberOfCorrectAnswers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          category:[],
          correct:[],
          chartData1: {},
        }; 
      }

    componentDidMount() {

       fetch('/totalCorrectAnswers')
       .then(data => data.json())
       .then((data =>{ 
        const chartData1 = {
            datasets: [
              {
                label: 'Correct Answers',
                data: data.map(d => d.correct),
                backgroundColor: [
                    'green',
               ],
              },
              {
                label: 'InCorrect Answers',
                data: data.map(d => d.inCorrect),
                backgroundColor: [
                    'red',
               ],
              }
            ]
          };
  
          this.setState({ chartData1 });
       }))
       .catch(err => console.log(err));

    }
  
    render() {
        const {chartData1} = this.state;

        return (
            <div >
                <Bar data={chartData1}/>
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

const connectedHomePage = connect(mapStateToProps)(NumberOfCorrectAnswers);
export { connectedHomePage as NumberOfCorrectAnswers };

NumberOfCorrectAnswers.defaultProps = {
    chartData1: {}
}

NumberOfCorrectAnswers.propTypes = {
    chartData1: PropTypes.object.isRequired,
}