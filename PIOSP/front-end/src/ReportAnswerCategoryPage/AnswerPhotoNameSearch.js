import React from "react";
import PropTypes from 'prop-types';
import NameSearch from "./NameSearch";
import {Button, Search, Segment, Pagination } from 'semantic-ui-react';

import {CSVLink} from 'react-csv';


const MATCHING_ITEM_LIMIT = 125;
var globalResponse = 0;

//search base on photos name and export as a csv file
class AnswerPhotoNameSearch extends React.Component {
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
        };
        this.handleSearchCancel = this.handleSearchCancel.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
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

      NameSearch.search(value, this.state.activePage, 5, answers => {
        this.setState({
          answers: answers.slice(0, MATCHING_ITEM_LIMIT)
        });
      });

      fetch(`reportAnswersPhotoIdCount`,{
        method: 'POST',
        body:JSON.stringify({
          photoName: value
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(data => data.json())
      .then((data) => { globalResponse = data;
      console.log(globalResponse); // eslint-disable-line no-console
    }).catch(err => console.log(err));

  this.setState({totalPages:globalResponse/5});
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

    NameSearch.search(this.state.searchValue, activePage, 5, answers => {
      this.setState({
        answers: answers.slice(0, MATCHING_ITEM_LIMIT)
      });
    });
    }

  render() {
    const { answers, isLoading } = this.state;
    // const removeIconStyle = showRemoveIcon ? {} : { visibility: "hidden" };

    const answersRows = answers.map((answer, idx) => (
      <tr key={idx} >
           <td><input 
                type="checkbox"
                name="checkbox" 
                className="form-control-12"
                ref={(a) => this.checkbox = a}
                required
                onClick={() => this.props.onAnswerClick(answer)}
                 /></td> 
        <td className="left aligned" >{answer.photo}</td>
        <td className="left aligned" >{answer.answer}</td>
        <td className="left aligned" >{answer.description}</td>
      </tr>
    ));

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
      <div id="search">
        <Segment>
          <table className="ui selectable structured table">
              <thead>
                <tr>
                  <th colSpan="5">
                    <label style={{margin:'20px'}}>Enter photo Name:</label>
                      <Button style={{float:'right', margin:'10px'}}><CSVLink data={answers} >Download this report</CSVLink></Button>
                        <Search
                            loading={isLoading}
                            // onResultSelect={this.handleResultSelect}
                            onSearchChange={this.handleSearchChange}
                            // results={results}
                            value={this.state.searchValue.charAt(0).toUpperCase() + this.state.searchValue.slice(1)}
                            placeholder="Search answers..."
                            // {...this.props}
                            showNoResults={false}
                            icon={null}
                            style={{display:'inline'}}
                        />
                        {/* <i className="search icon" />
                        <i
                          className="remove icon"
                          onClick={this.handleSearchCancel}
                          style={removeIconStyle}
                        /> */}
                    </th>
                  </tr>
                  <tr style={{textAlign:'center'}}>
                    <Pagination
                      activePage={activePage}
                      boundaryRange={boundaryRange}
                      onPageChange={this.handlePaginationChange}
                      size='mini'
                      siblingRange={siblingRange}
                      totalPages={totalPages}
                      // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
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
                    {/* <th>_id</th> */}
                  </tr>
              </thead>
            <tbody> 
            {answersRows}
            </tbody>
          </table>
        </Segment>
      </div>
    );
  }
}

// export default ReportAnswerCategoryPage;
export  {  AnswerPhotoNameSearch };

AnswerPhotoNameSearch.defaultProps = {
  onAnswerClick: () => {},
  handleSearchChange: () => {},
  handleSearchCancel: () => {},
  answers: {},
  isLoading: false,
  showRemoveIcon: false
}

AnswerPhotoNameSearch.propTypes = {
  onAnswerClick: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleSearchCancel: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showRemoveIcon: PropTypes.bool.isRequired
}