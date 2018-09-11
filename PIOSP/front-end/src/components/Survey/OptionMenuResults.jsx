import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/MainPage.css';
import {AdminList} from '../../AdminListPage';
import {NumberOfAnswersCategoryChart} from '../../SurveyResultsPage';
import {NumberOfCorrectAnswersCategory} from '../../SurveyResultsPage';
import {NumberOfCorrectAnswers} from '../../SurveyResultsPage';

import { Segment, Header, Dropdown } from 'semantic-ui-react';
import ErrorBoundry from '../../ErrorBoundry/ErrorBoundry';

    const tagOptionsMenu = [
      {
        text: 'Answers Based on Category',
        value: 'Answers Based on Category',
        // label: { color: 'red', empty: true, circular: true },
        icon: {name:'table', color:'black'}
      },
      {
        text: 'Correct Answers Based on Category',
        value: 'Correct Answers Based on Category',
        // label: { color: 'black', empty: true, circular: true,  },
        icon: {name:'table', color:'black'},
      },
      {
        text: 'Number of Correct and InCorrect Answers',
        value: 'Number of Correct and InCorrect Answers',
        // label: { color: 'black', empty: true, circular: true,  },
        icon: {name:'table', color:'black'},
      },
    ];


class OptionMenuResults extends Component {


  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      visible: false,
      option:'',
    };
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
    if (value === 'Table 1')
        return (<AdminList/>);
  }

  render() {

    const { option } = this.state;

    return (
      <div >
      
        <Segment style={{height: '638.5px'}}>
          <Header as='h2' textAlign='left'>
              Choose Graph
          </Header>
            <Dropdown
                selection
                name='default'
                options={tagOptionsMenu}
                placeholder='Choose the Graph'
                onChange={this.handleChange.bind(this)}
                onClick={this.handleItemClick.bind(this)}
                fluid
              />
              {option ==='Answers Based on Category'?
                <ErrorBoundry>
                  <NumberOfAnswersCategoryChart/>
                </ErrorBoundry>:
                  null }
              {option ==='Correct Answers Based on Category'?
                <ErrorBoundry>
                  <NumberOfCorrectAnswersCategory/>
                </ErrorBoundry>:
                  null }
              {option ==='Number of Correct and InCorrect Answers'?
                <ErrorBoundry>
                  <NumberOfCorrectAnswers/>
                </ErrorBoundry>:
                null }
        </Segment>
      </div>
    );
  }
} 

export default OptionMenuResults;

OptionMenuResults.defaultProps = {
  visibel: false,
  toggleVisibility: () => {},
  handleItemClick: () => {},
  handleChange: () => {}
}

// prop checks
OptionMenuResults.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}
