import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../components/stylesheets/menuStyle.css';
import 'react-tabs/style/react-tabs.css';
import "react-table/react-table.css";

import { Dropdown } from 'semantic-ui-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer} from 'recharts';

import {Doughnut, Pie} from 'react-chartjs-2';

// we have a dropdown list to show number of correct and incorrect answers base on category
// to visualize we have options between doughnut chart, bar chart , line chart ,and pie chart 
const tagOptionsMenu = [
    {
      text: 'Doughnut Chart ',
      value: 'Doughnut Chart',
      icon: {name:'table', color:'black'}
    },
    {
      text: 'Pie Chart',
      value: 'Pie Chart',
      icon: {name:'table', color:'black'},
    },
    {
      text: 'Bar Chart',
      value: 'Bar Chart',
      icon: {name:'table', color:'black'},
    },
    {
      text: 'Line Chart',
      value: 'Line Chart',
      icon: {name:'table', color:'black'},
    },
  ];

  const option1 = {
    title: {
      display: true,
      text: 'Outer chart: Total number of answer per category, Inner Chart: Number of correct answer per categoey'
  },
  legend:{
    display: true,
      text: 'ETL Load Chart'
  }
  };

class NumberOfCorrectAnswersCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          expanded: false,
          photo:'',
          answers:[],
          category:[],
          correct:[],
          chartData1: {},
          chartData2: {},
          activeItem: 'home',
          visible: false,
          option:'',
        }; 
      }

    componentDidMount() {
        
      fetch('/notEqual')
        .then(data => data.json())
        .then((data) => { this.setState({ correct: data});
      }).catch(err => console.log(err));

       fetch('/equal')
       .then(data => data.json())
       .then((data =>{ 
        const chartData1 = {
            labels: data.map(k => k.category),
            datasets: [
              {
                label: 'Number of Answerrs',
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
              {
                label: 'Correct Answers',
                data: data.map(d => d.correct),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF4136',
                    '#3D9970',
                    '#85144b',
               ],
              }
            ]
          }
          const chartData2 = {
            labels: data.map(k => k.category),
            datasets: [
              {
                label: 'Number of Correct Answers Base on Category',
                data: data.map(d => d.correct),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF4136',
                    '#3D9970',
                    '#85144b',
               ],
              }
            ]
          };
  
          this.setState({ chartData1 , chartData2 });
       }))
       .catch(err => console.log(err));

    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })
  
    handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name });
    }
  
  
    handleChange = (e, { name, value }) => 
    {
      this.setState({ [name]: value , option: value});
      if (value === 'Profile')
          alert("Profile");
      if (value === 'SignOut')
          alert('SignOut');
    }
  
    render() {
        const { correct, chartData1, chartData2, option} = this.state;

        return (
            <div >
              <Dropdown
                selection
                name='default'
                options={tagOptionsMenu}
                placeholder='Choose the Graph'
                onChange={this.handleChange.bind(this)}
                onClick={this.handleItemClick.bind(this)}
                fluid
              />
              {option ==='Doughnut Chart'?
                <Doughnut data={chartData1} options={option1}/>:
                <span></span> 
                }
                
                {option ==='Pie Chart'?
                <Pie data={chartData2}/>:
                <span></span> 
                }

                {option ==='Bar Chart'?
                <ResponsiveContainer width='100%' aspect={5.5/2.5}>
                    <BarChart width={600} height={300} data={correct}
                            margin={{top: 5, right: 30, left: 20, bottom: 5, color:"brown"}}>
                            <XAxis dataKey="category"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="correct"  fill="#8884d8" />
                            <Bar dataKey="inCorrect"  fill="#82ca9d" />
                    </BarChart>
                    </ResponsiveContainer>:
                <span></span> 
                }

                {option ==='Line Chart'?
                  <ResponsiveContainer width='100%' aspect={5.5/2.5}>
                    <LineChart width={600} height={600} data={correct} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey='category'/>
                        <YAxis/>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" datakey="count" stroke="#8884d8" activeDot={{r: 8}}/>
                        <Line type="monotone" dataKey="correct" stroke="#82ca9d"/>
                        <Line type="monotone" dataKey="Wasp" stroke="darkcyan" />
                        <Line type="monotone" dataKey="Fly" stroke="coral" />
                        <Line type="monotone" dataKey="Moth" stroke="crimson" />
                        <Line type="monotone" dataKey="DKnow" stroke="darkred" />
                    </LineChart>
                  </ResponsiveContainer>:
                <span></span> 
                }
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

const connectedHomePage = connect(mapStateToProps)(NumberOfCorrectAnswersCategory);
export { connectedHomePage as NumberOfCorrectAnswersCategory };

NumberOfCorrectAnswersCategory.defaultProps = {
    chartData1: {},
    chartData2: {},
    handleItemClick: () => {},
    handleChange: () => {}
}

NumberOfCorrectAnswersCategory.propTypes = {
    chartData1: PropTypes.object.isRequired,
    chartData2: PropTypes.object.isRequired,
    handleItemClick: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
}