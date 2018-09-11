import React from "react";
import PropTypes from 'prop-types';

import '../components/stylesheets/Welcome.css';
  
import { Table} from 'semantic-ui-react';
import ShadowWrapper from 'react-shadow-wrapper';

// User List Element component
// received props from admin list page and render by update button
export default class AdminListElement extends React.Component {

    constructor() {
        super();
        this.state = {
          clicked: false,
          buttonTitle: 'Edit',
          adminInfo: '',
        };
        this.handleClicked = this.handleClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      handleClicked () 
      {
          if(this.state.clicked === false){
          this.setState({ 
              clicked: true,
              buttonTitle: 'Update'
            });
        } else if(this.state.clicked === true){
          this.setState({ 
              clicked: false,
              buttonTitle: 'Edit'
            });
        }
      }
    
    handleChange(e) {

        e.preventDefault();

        let adminInfo ={
                name: this.name.value,
                mail: this.mail.value,
                email: this.props.user.mail
            }; 
        this.setState({ adminInfo: adminInfo });
      }

  // render
  render() {
    const {user, showDelete, showUpdate} = this.props;
    const {clicked, buttonTitle, adminInfo} = this.state;
    return (
      <Table.Row>                    
        {
            clicked ?  
            <ShadowWrapper>
                    <Table.Cell>{user._id}</Table.Cell>
                    <Table.Cell>
                        <input defaultValue={user.name} 
                        name="name"
                        ref={(a) => this.name = a}
                        onChange={this.handleChange}/>
                    </Table.Cell>
                    <Table.Cell>
                        <input defaultValue={user.mail}
                        name="mail"
                        ref={(a) => this.mail = a}
                        onChange={this.handleChange}/>
                    </Table.Cell>
            </ShadowWrapper>
            : 
                <ShadowWrapper>
                    <Table.Cell>{user._id}</Table.Cell> 
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.mail}</Table.Cell>
                </ShadowWrapper> 
                                }
        
      <Table.Cell>

          {buttonTitle === 'Edit' ? 
            <button onClick={this.handleClicked}  className='btn-table'>
              {buttonTitle} 
            </button>
            : 
            <div>
            <button onClick={() => showUpdate(adminInfo) }  className='btn-table'>
              <a onClick={this.handleClicked}>{buttonTitle} </a>
            </button>
            <button onClick={this.handleClicked}  className='btn-table'>
              Cancel
            </button>
            </div>
            }
      </Table.Cell>
      <Table.Cell>
          <button className="btn-table" onClick={() => showDelete(user)} >
            Delete 
          </button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

AdminListElement.defaultProps = {
  user: {},
  showUpdate: () => {},
  showDelete: () => null
  // showDelete: () => void(0)
}
// prop checks
AdminListElement.propTypes = {
  user: PropTypes.object.isRequired,
  showDelete: PropTypes.func.isRequired,
  showUpdate: PropTypes.func.isRequired,
}

