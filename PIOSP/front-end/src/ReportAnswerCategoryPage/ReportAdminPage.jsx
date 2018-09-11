import React from "react";
import PropTypes from 'prop-types';
import SelectedAdmin from "./SelectedAdmin";
import {AdminListSearch} from './AdminListSearch';
import { Segment } from "semantic-ui-react";


// includes selected admin class and admin list search component for create report(.csv)
class ReportAdminPage extends React.Component {
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
          <SelectedAdmin
            answers={selectedAnswers}
            onAnswerClick={this.removeAnswerItem}
          />
          <AdminListSearch onAnswerClick={this.addAnswer} />
        </Segment>
      </div>
    );
  }
}

// export default ReportAnswerCategoryPage;
export {  ReportAdminPage };

ReportAdminPage.defaultProps = {
  removeAnswerItem: () => {},
  addAnswer: () => {}
}

ReportAdminPage.propTypes = {
  removeAnswerItem: PropTypes.func.isRequired,
  addAnswer: PropTypes.func.isRequired,
}
