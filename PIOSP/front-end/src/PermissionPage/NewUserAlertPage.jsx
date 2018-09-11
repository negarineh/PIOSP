import React from 'react';
import '../components/stylesheets/MainPage.css';
import '../components/stylesheets/Survey.css';
import '../components/stylesheets/Butterfly.css';
import '../components/stylesheets/Permission.css';

// render when someone without creating account wants to access survey page url
class NewUserAlertPage extends React.Component {

    render() {

      return (
        <div className="mainpage-permission">
          <div className="butterfly">
            <div className="body">
              <img src="http://fjordstudio.dk/animations/img/butterfly3-body.png" alt=""/>
            </div>
            <div className="leftwing">
                <img src="http://fjordstudio.dk/animations/img/butterfly3-leftwing.png" alt=""/>
            </div>
            <div className="rightwing">
                <img src="http://fjordstudio.dk/animations/img/butterfly3-rightwing.png" alt=""/>
            </div>
          </div>

          <div className="wrappermainpage-permission">    
            <fieldset  className="fieldsetwelcome1">
              <p key="a" className="pwelcome1" > 
              Sorry Your Account Does Not Exits ,Please Create An Account
              </p>
            </fieldset> 
          </div>
        </div>
      );
    }
  }

export  {NewUserAlertPage};