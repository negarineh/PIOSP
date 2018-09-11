import React from "react";
import PropTypes from 'prop-types';
import {AnswerCategorySearch} from "./AnswerCategorySearch";
import SelectedAnswers from "./SelectedAnswers";
import { Segment } from "semantic-ui-react";

// includes selected answers class and answers category search component for create report(.csv)
class ReportAnswerCategoryPage extends React.Component {
  state = {
    selectedAnswers: []
  };

  removeAnswerItem = itemIndex => {
    const filteredAnswers = this.state.selectedAnswers.filter(
      (item, idx) => itemIndex !== idx
    );
    this.setState({ selectedAnswers: filteredAnswers });
  };

  addAnswer = Answer => {
    const newAnswers = this.state.selectedAnswers.concat(Answer);
    this.setState({ selectedAnswers: newAnswers });
  };

  render() {
    const { selectedAnswers } = this.state;

    return ( 
      <div className="App">
        <Segment style={{height: '638.5px'}}>
          <SelectedAnswers
            answers={selectedAnswers}
            onAnswerClick={this.removeAnswerItem}
          />
          <AnswerCategorySearch onAnswerClick={this.addAnswer} />
        </Segment>
      </div>
    );
  }
}

export {  ReportAnswerCategoryPage };

ReportAnswerCategoryPage.defaultProps = {
  removeAnswerItem: () => {},
  addAnswer: () => {},
}

ReportAnswerCategoryPage.propTypes = {
  removeAnswerItem: PropTypes.func.isRequired,
  addAnswer: PropTypes.func.isRequired,
}
