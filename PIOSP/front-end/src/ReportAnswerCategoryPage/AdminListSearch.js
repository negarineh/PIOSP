import React from "react";
import PropTypes from 'prop-types';
import AdminSearch from "./AdminSearch";
import AdminSearchCount from "./AdminSearchCount";
import { Search, Button, Segment, Pagination } from 'semantic-ui-react';

import {CSVLink} from 'react-csv';

const MATCHING_ITEM_LIMIT = 125;

// list of admins that we can have query between list create csv file
class AdminListSearch extends React.Component {
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

      AdminSearch.search(value, this.state.activePage, 5, answers => {
        this.setState({ 
          answers: answers.slice(0, MATCHING_ITEM_LIMIT)
        });
      });

      AdminSearchCount.search(value, count => {
        this.setState({
          totalPages: count/5
        });
      });

      fetch(`/reportAdminActivity`,{
        method: 'POST',
        body: JSON.stringify({
          email: value
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
      });
    }, 500);
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
    
    AdminSearch.search(this.state.searchValue, activePage, 5, answers => {
      this.setState({
        answers: answers.slice(0, MATCHING_ITEM_LIMIT)
      });
    });
    }

  render() {
    const { answers, isLoading } = this.state;

    const answersRows = answers.map((answer, idx) => (
      <tr key={idx} >
        <td> <input 
                type="checkbox"
                name="checkbox" 
                className="form-control-12"
                ref={(a) => this.checkbox = a}
                required
                onClick={() => this.props.onAnswerClick(answer)}
                 /></td>
        <td className="left aligned" >{answer.Id}</td>
        <td className="left aligned" >{answer.email}</td>
        <td className="left aligned" >{answer.activityType}</td>
        <td className="left aligned" >{answer.timeOfActivity}</td>
    
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
      <div id="food-search">
      <Segment>
        <table className="ui selectable structured  table">
          <thead>
            <tr>
              <th colSpan="5">
                <label style={{margin:'20px'}}>Enter Admin Email:</label>
                  <Button style={{float:'right', margin:'10px'}}><CSVLink data={answers} >Download this report</CSVLink></Button>
                    <Search
                        loading={isLoading}
                        onSearchChange={this.handleSearchChange}
                        value={this.state.searchValue}
                        placeholder="Search Admin Name..."
                        showNoResults={false}
                        icon={null}
                        style={{display:'inline'}}
                    />
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
            <tr>
              <th>Select</th>
              <th>Id</th>
              <th>Email</th>
              <th>Activity Type</th>
              <th>Time of Activity</th>
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

export  {  AdminListSearch };

AdminListSearch.defaultProps = {
  onAnswerClick: () => {},
  onSearchChange: () => {},
  answers: {},
  isLoading: false,
  showRemoveIcon: false
}

AdminListSearch.propTypes = {
  onAnswerClick: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showRemoveIcon: PropTypes.bool.isRequired
}
