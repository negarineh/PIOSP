import React from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux"; 
import AdminListElement from "./AdminListElement";
import AdminDeletePrompt from "./AdminDeletePrompt";
  
import { userActions } from '../_actions';
import {Segment, Table} from "semantic-ui-react";

import Pagination from '../Pagination/Pagination';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';

// User list component
// main component for admin list element and admin delete prompt
class AdminList extends React.Component {
  // constructor
  constructor(props) {
    super(props);

 
    // default ui local state
    this.state = {
      delete_show: false, 
      delete_user: {},
      pageOfItems: [],
      arrayOfAdmins: [],
    };

    // bind <this> to the event method
    this.showDelete = this.showDelete.bind(this);
    this.hideDelete = this.hideDelete.bind(this);
    this.userDelete = this.userDelete.bind(this);
    this.showUpdate = this.showUpdate.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

    componentWillMount() {
      this.props.dispatch(userActions.getAll());
        fetch('/alladmins')
        .then(data => data.json())
        .then((data) => { this.setState({ arrayOfAdmins: data });
      }
      , 
      function (error) {
        console.error("Error with fetching /alladmins url:", error);
      }); 
        
    }

      // show the delete user prompt
    showUpdate(user) {
      
      let adminInfo = {
        name : user.name,
        email: user.mail,
        emailSearch: user.email
      };

      this.handleUpdateUser(adminInfo);
      }

      handleUpdateUser(adminInfo) {
        
        const { dispatch } = this.props;
        dispatch(userActions.update(adminInfo));
        dispatch(userActions.getAll());
      }

      handleDeleteUser(id) {
          return (e) => 
          {
            // var id = this.state.delete_user._id;
            this.props.dispatch(userActions.delete(id));
            this.hideDelete();
          };
      }

      onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

  // render
  render() {
    // pagination
    const {users } = this.props;

    // show the list of users
    return (
      <div style={{maxHeight:'614px'}}>
      <Segment style={{height:'638.5px'}}>
      <Table style={{maxHeight:'614px', maringBottom:'0px'}}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine>ID</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Update</Table.HeaderCell>
        <Table.HeaderCell>Delete</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
          {users.items&&
            <Table.Body>
          {this.state.pageOfItems.map((user, index) => {
            
              return (
                <AdminListElement key={index} user={user} showDelete={this.showDelete}  showUpdate={this.showUpdate}/>
              );
          })
          }
            
          </Table.Body>

          }
          
        </Table>
          <Segment style={{paddingBottom:'40px', marginTop: '0px'}} textAlign='center'>
            <ErrorBoundry>
              <Pagination items={this.state.arrayOfAdmins} onChangePage={this.onChangePage} />
            </ErrorBoundry>
          </Segment>
        <ErrorBoundry>
          <AdminDeletePrompt show={this.state.delete_show} user={this.state.delete_user}
            hideDelete={this.hideDelete} userDelete={this.userDelete}/>
        </ErrorBoundry>
          </Segment>
      </div>
    );
  }

//   // change the user lists' current page
//   changePage(page) {
//     this.props.dispatch(push('/?page=' + page));
//   }

  // show the delete user prompt
  showDelete(user) {
    // change the local ui state
    this.setState({
      delete_show: true,
      delete_user: user,
    });
  }

  // hide the delete user prompt
  hideDelete() {
    // change the local ui state
    this.setState({
      delete_show: false,
      delete_user: {},
    });
  }

  // delete the user
  userDelete() {

    this.props.dispatch(userActions.delete(this.state.delete_user._id));

    this.props.dispatch(userActions.getAll());
    
    // localStorage.setItem('users', JSON.stringify(this.state.users));
    // // hide the prompt
    this.hideDelete();
    // this.props.dispatch(userActions.getAll());
    
  }

}

// export the connected class
function mapStateToProps(state) {
  const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users

    // https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
    // react-router-redux wants you to get the url data by passing the props through a million components instead of
    // reading it directly from the state, which is basically why you store the url data in the state (to have access to it)
    // page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
  };
}

const connectedAdminListPage = connect(mapStateToProps)(AdminList);
export { connectedAdminListPage as AdminList };
// export default connect(mapStateToProps)(AdminList);

AdminList.defaultProps = {
  users: {},
  dispatch: () => {},
}
// prop checks
AdminList.propTypes = {
  users: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}
