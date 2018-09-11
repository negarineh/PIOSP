import React from "react";
import PropTypes from 'prop-types';
import CategorySearch from "./CategorySearch";
import CategorySearchCount from './CategorySearchCount';
import {Button, Search, Segment, Pagination } from 'semantic-ui-react';

import {CSVLink} from 'react-csv';
import '../components/stylesheets/Page3.css';

const MATCHING_ITEM_LIMIT = 125;

// search base on pollinator category between answers
// and export as a csv file
class AnswerCategorySearch extends React.Component {
    constructor(props) {
        super(props);   
        this.state={
            answers: [],
            showRemoveIcon: false,
            searchValue: "",
            activePage: 1,
            boundaryRange: 1,
            siblingRange: 1,
            showEllipsis: true,
            showFirstAndLastNav: true,
            showPreviousAndNextNav: true,
            totalPages: 10,
            count: 1,
            report:[],
        };
        this.handleSearchCancel = this.handleSearchCancel.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        this.handleReportButton = this.handleReportButton.bind(this);
      }

  handleSearchChange (e )  {

    e.preventDefault();
    const value = e.target.value;

    this.setState({
      searchValue: value,
      isLoading: true,
    });

    if (value === "") {
      this.setState({
        answers: [],
        showRemoveIcon: false,
      });
    } else { 
      this.setState({
        showRemoveIcon: true
      });

      CategorySearch.search(value, this.state.activePage, 5, answers => {
        this.setState({
          answers: answers.slice(0, MATCHING_ITEM_LIMIT)
        });
      });
      CategorySearchCount.search(value, count => {
        this.setState({
          totalPages: count/5
        });
      });

      fetch(`/reportOnAnswersCategory`,{
        method: 'POST',
        body: JSON.stringify({
          answer: value
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(data => data.json())
      .then((data) => {this.setState({report : data});})
      .catch(err => console.error(err));
    }

    setTimeout(() => {

      this.setState({
        isLoading: false,
      })
    }, 500)
  }

  handleSearchCancel () {
    this.setState({
      answers: [],
      showRemoveIcon: false,
      searchValue: ""
    });
  }

handlePaginationChange (e, { activePage }){
   
e.preventDefault();
this.setState({ activePage: activePage });

CategorySearch.search(this.state.searchValue, activePage, 5, answers => {
  this.setState({
    answers: answers.slice(0, MATCHING_ITEM_LIMIT)
  });
});
}

handleReportButton(e){
  e.preventDefault();
  const value = e.target.value;
  fetch(`/reportOnAnswersCategory`,{
    method: 'POST',
    body: JSON.stringify({
      answer: value
    }),
    headers: {"Content-Type": "application/json"}
  })
  .then(data => data.json())
  .then((data) => {this.setState({report : data});})
  .catch(err => console.error(err));
}

  /* jshint ignore:start */
  render() {
    const { answers, isLoading } = this.state;

    const answersRows = answers.map((answer, idx) => (
      <tr key={idx}>
        <td> 
        <input 
                type="checkbox"
                name="checkbox" 
                className="form-control-12"
                ref={(a) => this.checkbox = a}
                required
                onClick={() => this.props.onAnswerClick(answer)} />
        </td>
        <td className="left aligned" >{answer.photo}</td>
        <td className="left aligned" >{answer.answer}</td>
        <td className="left aligned" >{answer.description}</td>
      </tr>
    ));
  /* jshint ignore:end */

    const {
      activePage,
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages,
    } = this.state

    return (
      <div id="search" >
        <Segment>
          <table className="ui selectable structured  table">
            <thead>
              <tr>
                <th colSpan="5">
                  <label style={{margin:'20px'}}>Enter photo category name:</label>
                      <Button style={{float:'right', margin:'10px'}}>
                        <CSVLink data={answers} >Download this report</CSVLink>
                        {/* <CSVDownload data={report} target="_blank" /> */}
                      </Button>
                          <Search
                              loading={isLoading}
                              // onResultSelect={this.handleResultSelect}
                              onSearchChange={this.handleSearchChange}
                              // results={results}
                              value={this.state.searchValue.charAt(0).toUpperCase() + this.state.searchValue.slice(1)}
                              placeholder="Search answers..."
                              // {...this.props}
                              showNoResults={false}
                              // size='large'
                              icon={null}
                              style={{display:'inline'}}
                          />
                          {/* <i className="search icon"/>
                          <i
                            className="remove icon"
                            onClick={this.handleSearchCancel}
                            style={removeIconStyle}
                          /> */}
                  </th>
              </tr>
              <tr>
              <Pagination
                activePage={activePage}
                boundaryRange={boundaryRange}
                onPageChange={this.handlePaginationChange}
                size='mini'
                siblingRange={siblingRange}
                totalPages={totalPages}
                // All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                ellipsisItem={showEllipsis ? undefined : null}
                firstItem={showFirstAndLastNav ? undefined : null}
                lastItem={showFirstAndLastNav ? undefined : null}
                prevItem={showPreviousAndNextNav ? undefined : null}
                nextItem={showPreviousAndNextNav ? undefined : null}
              />
              </tr>
              <tr >
                <th>Select</th>
                <th>photo</th>
                <th>Answer</th>
                <th>Description</th>
              </tr>
            </thead>
              <tbody style={{width:'10px'}}> 
                {answersRows}
              </tbody>
            </table>
          
          </Segment>
      </div>
    );
  }
}

// export default ReportAnswerCategoryPage;
export  {  AnswerCategorySearch };

AnswerCategorySearch.defaultProps = {
  onAnswerClick: () => {},
  handleSearchChange: () => {},
  handleSearchCancel: () => {},
  answers: {},
  isLoading: false,
  showRemoveIcon: false
}

AnswerCategorySearch.propTypes = {
  onAnswerClick: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleSearchCancel: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showRemoveIcon: PropTypes.bool.isRequired
}
