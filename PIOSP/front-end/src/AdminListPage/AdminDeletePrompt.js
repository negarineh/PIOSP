import React from "react"; 
import PropTypes from 'prop-types';

import { Button, Modal} from 'semantic-ui-react';

// User delete component
export default class AdminDeletePrompt extends React.Component {

  // render 
  render() {
    const {show, user, hideDelete, userDelete} = this.props;
    return (
      
      <Modal size="small" open={show} onClose={hideDelete} 
             style={{ position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign:'justify'}}>
          <Modal.Header> 
            Delete Account
          </Modal.Header>
          <Modal.Content style={{ width: '80%'}}>
            <p style={{ padding: '15px', textAlign:'justify'}}>Are you sure you want to delete <strong>{user.name}</strong> account? </p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={hideDelete}> 
              No
            </Button>
            <Button style={{ marginLeft: '74%', height:'37px'}} positive icon='checkmark' labelPosition='right' content='Yes' onClick={userDelete}/>
          </Modal.Actions>
        </Modal>
    );
  }
}


AdminDeletePrompt.defaultProps = {
  show: false,
  user: {},
  hideDelete: () => {},
  userDelete: () => {}
}
// prop checks
AdminDeletePrompt.propTypes = {
  show: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  hideDelete: PropTypes.func.isRequired,
  userDelete: PropTypes.func.isRequired,
}
