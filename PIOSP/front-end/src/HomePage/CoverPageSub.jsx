import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../components/stylesheets/MainPage.css';

import { Segment, Image, Icon, Card, Divider, Grid, Label, Menu } from 'semantic-ui-react';
import '../../node_modules/semantic-ui-css/semantic.min.css';

import {SurveyResultsPage} from '../SurveyResultsPage';
import {NumberOfCorrectAnswersCategory} from '../SurveyResultsPage';
import {ReportAnswerCategoryPage} from '../ReportAnswerCategoryPage';

// customized cover page for sub admins
class CoverPagesSub extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      visible: false,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  handleChange = (e, { name, value }) => 
  {
    this.setState({ [name]: value });
  }


  render() {
    const {activeItem} = this.state;
    return (
      <div >
      
          <Segment style={{background: 'whitesmoke', height:'638.5px'}}>
          {activeItem === 'home'?
              <Grid centered container columns={3}>
              <Grid.Column>
              <Card>
              <Label as='a' corner='left' style={{color:'rgb(92,179,96)'}}></Label>
                <Card.Content>
                  <Card.Header style={{paddingLeft:'20px'}}>
                    Graphs
                  </Card.Header>
                  <Divider horizontal/>
                    <Image rounded src="/img/images.jpeg" size='small' />
                  <Divider horizontal/>
                </Card.Content>
                <Card.Content >
                  <Menu secondary size='tiny'>
                    <Menu.Item name='visulize' onClick={this.handleItemClick}>
                    <Icon name='file text' color='black' />
                        Details
                    </Menu.Item>
                  </Menu> 
                </Card.Content>
              </Card>
              </Grid.Column>
              <Grid.Column>
              <Card>
              <Label as='a' corner='left' style={{color:'rgb(238,79,76)'}}></Label>
              <Card.Content>
                  <Card.Header style={{paddingLeft:'20px'}}>
                    Reports
                  </Card.Header>
                  <Divider horizontal/>
                    <Image rounded src="/img/Report.jpg" size='small' />
                  <Divider horizontal/>
                </Card.Content>
                <Card.Content >
                  <Menu secondary size='tiny'>
                    <Menu.Item name='report' onClick={this.handleItemClick}>
                    <Icon name='file text' color='black' />
                        Details
                    </Menu.Item>
                  </Menu>
                </Card.Content>
              </Card>
              </Grid.Column>
    
              <Grid.Row centered columns={3}>
              <Grid.Column>
                <Card>
                  <Label as='a' corner='left' style={{color:'rgb(146,41,173)'}}></Label>
                  <Card.Content>
                    <Card.Header style={{paddingLeft:'20px'}}>
                      Query on Reports
                    </Card.Header>
                    <Divider horizontal/>
                      <Image rounded src="/img/Reports.jpg" size='small' />
                    <Divider horizontal/>
                  </Card.Content>
                  <Card.Content >
                    <Menu secondary size='tiny'>
                      <Menu.Item name='query' onClick={this.handleItemClick}>
                      <Icon name='file text' color='black' />
                          Details
                      </Menu.Item>
                    </Menu>
                  </Card.Content>
                </Card>
              </Grid.Column>
              </Grid.Row>
              </Grid>:
              null}
              {activeItem ==='visulize'? 
                <NumberOfCorrectAnswersCategory/>:
              null}
              {activeItem ==='query'? 
                <ReportAnswerCategoryPage/>:
              null}
              {activeItem ==='report'? 
                <SurveyResultsPage/>:
              null}
            </Segment>
      </div>
    );
  }
} 

export { CoverPagesSub as CoverPageSub };

CoverPagesSub.defaultProps = {
    handleItemClick: () => {},
    handleChange: () => {},
    visible: false,
  }

CoverPagesSub.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}