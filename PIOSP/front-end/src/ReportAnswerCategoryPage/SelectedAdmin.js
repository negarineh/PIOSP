import React from "react";
import PropTypes from 'prop-types';
import {Button, Segment } from 'semantic-ui-react';

import {CSVLink} from 'react-csv';


// create a table of admins who we have selected 
export default function SelectedAdmin(props) {

  const { answers } = props;
  var copyOfAnswers = answers;

  const answerRows = copyOfAnswers.map((answer, idx) => (
    <tr key={idx} >
      <td> <input 
          type="checkbox"
          name="checkbox" 
          className="form-control-12"
          onClick={() => props.onAnswerClick(idx)} /></td>
        <td className="left aligned" >{answer.name}</td>
        <td className="left aligned" >{answer.mail}</td>
        <td className="left aligned" >{answer._id}</td>
    </tr>
  ));

  return (
    <Segment>
      <table className="ui selectable structured table">
        <thead>
          <tr>
          <th colSpan="5">
              <h3>Selected Admin</h3>
                <Button style={{float:'right', margin:'10px'}}>
                  <CSVLink data={answers} >Download this report</CSVLink>
                </Button>
          </th>
          </tr>
          <tr>
            <th>DeSelect</th>
            <th>Name</th>
            <th>Email</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {answerRows}
        </tbody>
      </table>
    </Segment>
  );
}

SelectedAdmin.defaultProps = {
  answers: {},
}

SelectedAdmin.propTypes = {
  answers: PropTypes.object.isRequired,
}