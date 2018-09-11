import React from 'react'; 
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { userActions } from '../_actions';

import '../components/stylesheets/menuStyle.css';
import 'react-tabs/style/react-tabs.css';
import '../components/stylesheets/MainPage.css';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import matchSorter from 'match-sorter';

import { Layout} from 'antd';

import cookie from 'react-cookies';

import { Segment, Confirm} from 'semantic-ui-react';

const { Header } = Layout;
   
// main table for shwoing name of admin follow by their attributes
class AdminTablePage extends React.Component {

    constructor() {
        super();
        this.state = {
          data: userActions.getAll(),
          email: '',
          activeItem: 'inbox',
          open: false,
          result: '',
          userId: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.renderEditable = this.renderEditable.bind(this);
        this.show = this.show.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
      }
    
    componentDidMount() {
        this.props.dispatch(userActions.getAll()); 
        this.setState ({ userId: cookie.load('jwt') });
        cookie.save('jwt', this.state.userId, { path: '/' });
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    show = (id) => this.setState({ open: true, id1: id });
    handleConfirm = () => this.setState({ result: 'confirmed', open: false });
    handleCancel = () => this.setState({ result: 'cancelled', open: false });

    handleUpdateUser(adminInfo) {

        const { dispatch } = this.props;
        
        dispatch(userActions.update(adminInfo));
        dispatch(userActions.getAll());
        }

    logoutClick(){
        cookie.remove('jwt', { path: '/' });
    }

    handleGetUserByMail(curEmail) {
        return (e) => {
            e.preventDefault();
            const data1 = new FormData(e.target);
            curEmail = data1.get('email');
            this.props.dispatch(userActions.getById(curEmail));
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        const { email } = this.state;
        const { dispatch } = this.props;
        if (email) {
            dispatch(userActions.getById(email));
        }
    }


    renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.users.items];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.users.items[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  
  
    render() {
        const {  users } = this.props;
        const { open } = this.state;
    return(
        <div>
          <Segment style={{height:'638.5px'}}> 
            <Header as='h2' >
              All Registered Admins
            </Header>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
        
            <form name="form" onSubmit={this.handleDeleteUser}>
                <div className="wrapper" >
                    <ReactTable style={{backgroundColor:"beige",maxHeight:'500px'}}
                            data={users.items}
                            loading={users.loading}
                            // manual
                            filterable
                            defaultFilterMethod={(filter, row) =>
                            String(row[filter.id]) === filter.value}
                        columns={[
                            {
                                columns: [
                                    {
                                    Header: "ID",
                                    id: "_id",
                                    accessor: d => d._id,
                                    filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["_id"] }),
                                    filterAll: true
                                    },
                                    {
                                    Header: "name",
                                    id: "name",
                                    accessor: d => d.name,
                                    filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["name"] }),
                                    filterAll: true,
                                    },
                                        ]
                            } 
                            ,
                            {
                                columns: [
                                        {
                                        Header: "Email",
                                        id: "mail",
                                        accessor: d => d.mail,
                                        filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["mail"] }),
                                        filterAll: true,
                                        // Cell: this.renderEditable,
                                        },
                                        {
                                        Header: "Status",
                                        accessor: "status",
                                        id: "status",
                                        Cell: ({ value }) => (value === 'active' ? "Yes" : "No"),
                                        filterMethod: (filter, row) => {
                                            if (filter.value === "all") {
                                            return true;
                                            }
                                            if (filter.value === "true") {
                                            return row[filter.id] === 'active';
                                            }
                                            return row[filter.id] === 'inactive';
                                        },
                                        Filter: ({ filter, onChange }) =>
                                            <select
                                            onChange={event => onChange(event.target.value)}
                                            style={{ width: "100%" }}
                                            value={filter ? filter.value : "all"}
                                            >
                                            <option value="all">Show All</option>
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                            </select>
                                        },
                                ]
                            },
                            {
                            Header: "Created Date",
                            id: "created_date",
                            accessor: d => d.created_date,
                            filterMethod: (filter, rows) =>
                            matchSorter(rows, filter.value, { keys: ["created_date"] }),
                            filterAll: true
                            },
                            {
                            Header: "Role Id",
                            accessor: "role_id",
                            },
                            {
                                Header: () => <span><i className='fa-tasks' /> Status </span>,
                                accessor: 'status',
                                Cell: row => (
                                    <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#dadada',
                                        borderRadius: '2px'
                                    }}
                                    >
                                    <div
                                        style={{
                                        width: `${row.value}%`,
                                        height: '100%',
                                        backgroundColor: row.value === 'inactive' ? '#ffbf00'
                                            : row.value === 'active' ? '#85cc00'
                                            : '#ff2e00',
                                        borderRadius: '2px',
                                        transition: 'all .2s ease-out'
                                        }}
                                    />
                                    </div>
                                ),
                                filterMethod: (filter, row) => {
                                            if (filter.value === "all") {
                                            return true;
                                            }
                                            if (filter.value === "true") {
                                            return row[filter.id] === 'active';
                                            }
                                            return row[filter.id] === 'inactive';
                                        },
                                        Filter: ({ filter, onChange }) =>
                                            <select
                                            onChange={event => onChange(event.target.value)}
                                            style={{ width: "100%" }}
                                            value={filter ? filter.value : "all"}
                                            >
                                            <option value="all">Show All</option>
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                            </select>
                                },
                                
                                        
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                    
                        />
                <Confirm 
                open={open}
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}/>

                </div>
                </form>
        
                }

        </Segment>
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

const connectedAdminPage = connect(mapStateToProps)(AdminTablePage);
export { connectedAdminPage as AdminTablePage };


AdminTablePage.defaultProps = {
//   user: {},
  users: {},
  dispatch: () => {},
}
// prop checks
AdminTablePage.propTypes = {
  users: PropTypes.object.isRequired,
//   user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}