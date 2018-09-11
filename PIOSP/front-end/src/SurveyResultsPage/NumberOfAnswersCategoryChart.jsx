import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../components/stylesheets/menuStyle.css';
import 'react-tabs/style/react-tabs.css';
import "react-table/react-table.css";

import {Pie} from 'react-chartjs-2';

// Pie chart base on total answers per category
class NumberOfAnswersCategoryChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          category:[],
          chartData1: {},
        }; 
      }

    componentDidMount() {

       fetch('/equal')
       .then(data => data.json())
       .then((data =>{ 
        const chartData1 = {
            labels: data.map(k => k.category),
            datasets: [
              {
                label: 'Number of Answes',
                data: data.map(d => d.count),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF4136',
                    '#3D9970',
                    '#85144b',
               ],
              },
            ]
          };
  
          this.setState({ chartData1 });
       }))
       .catch(err => console.log(err));

    }
  
    render() {
        const { chartData1} = this.state;

        return (
            <div >
                <Pie data={chartData1}/>
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

const connectedHomePage = connect(mapStateToProps)(NumberOfAnswersCategoryChart);
export { connectedHomePage as NumberOfAnswersCategoryChart };

NumberOfAnswersCategoryChart.defaultProps = {
    chartData1: {}
}

NumberOfAnswersCategoryChart.propTypes = {
    chartData1: PropTypes.object.isRequired,
}