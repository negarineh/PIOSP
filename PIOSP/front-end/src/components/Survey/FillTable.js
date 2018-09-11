import React from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/Survey.css';
import '../stylesheets/MainPage.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Segment, Message} from 'semantic-ui-react';
import '../stylesheets/Survey.css';

var globalResponse = [];

// filling the pollinator table when we are running the server for the first time
class FillTable extends React.Component {
    constructor(props) {
      super(props);   
      this.state={
        photo:[],
        response: [],
        response1: [],
        APIResponse:'',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    componentDidMount() {

      fetch('http://localhost:3000/checkFill')
              .then(data => data.json())
              .then((data) => { globalResponse = data;
              console.log(globalResponse); // eslint-disable-line no-console
            }).catch(err => console.error(err));
    }
    
    handleSubmit(){

      fetch('http://localhost:3000/checkFill')
              .then(data => data.json())
              .then((data) => { globalResponse = data;
              console.log(globalResponse); // eslint-disable-line no-console
            }).catch(err => console.log(err));

      if (globalResponse.length !== 0)
        console.log('Filled'); // eslint-disable-line no-console
      else if (globalResponse.length === 0)
      {
        fetch('http://localhost:3000/fill')
              .then(datas => datas.json())
              .then((datas) => { this.setState({ photo: datas });
            }).catch(err => console.log(err));
      }  
    }

    render() {

      return (
        /* jshint ignore:start */
    <div>
      <MuiThemeProvider>
            <Segment style={{height: '638.5px'}}>
                <Message
                    positive
                    header='Filling Photo Table'
                    content="First before running the survey you should fill the photo table with names of all photos."
                    style={{textAlign:'left'}}
                    />
                      <button 
                          type="submit" 
                          className="btn btn-primary2100"
                          onClick={this.handleSubmit}
                          >
                            Fill Pollinators Table
                      </button>
            </Segment>
      </MuiThemeProvider>
    </div>
    /* jshint ignore:end */
      );
    }
  }

FillTable.defaultProps = {
    dispatch: () => {},
  };
  
// prop checks
FillTable.propTypes = {
  // users: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default FillTable;