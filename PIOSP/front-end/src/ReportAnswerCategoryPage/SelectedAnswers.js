import React from "react";
import PropTypes from 'prop-types';
import {Button, Segment } from 'semantic-ui-react';

import {CSVLink} from 'react-csv';

// table of selected anwers that we can have a report of these(.csv)
export default function SelectedAnswers(props) {
  const { answers } = props;

  const answerRows = answers.map((answer, idx) => (
    <tr key={idx} >
      <td> 
        <input 
            type="checkbox"
            name="checkbox" 
            className="form-control-12"
            onClick={() => props.onAnswerClick(idx)} 
          />
      </td>
      <td className="left aligned" >{answer.photo}</td>
      <td className="left aligned" >{answer.answer}</td>
    </tr>
  ));

  return (
    <Segment>
      <table className="ui selectable structured table" style={{maxHeight:'244px'}}>
        <thead>
          <tr>
            <th colSpan="5">
              <h3>Selected Answers</h3>
                <Button style={{float:'right', margin:'10px'}}>
                  <CSVLink data={answers} >Download this report</CSVLink>
                </Button>
          </th>
          </tr>
          <tr>
            <th>DeSelect</th>
            <th>Photo</th>
            <th>Answer</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {answerRows}
        </tbody>
      </table>
    </Segment>
  );
}

SelectedAnswers.defaultProps = {
  answers: {},
}
SelectedAnswers.propTypes = {
  answers: PropTypes.object.isRequired,
}