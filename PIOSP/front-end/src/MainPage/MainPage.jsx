import React from 'react';
import PropTypes from 'prop-types';
import '../components/stylesheets/MainPage1.css';

import { Image, Reveal, Modal} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

// render the main page of component
// this page shows at the main url http://localhost:3001/ , http://localhost:3001/mainpage
class MainPage extends React.Component {

    render() {
      
      return (
        
            <div style={{background: "yellowgreen"}}>
              <nav className="navmainpage" >
                <ul className="ulmainpage">
                  <li className="limainpage" style={{color:"lightGreen"}}><a>Home</a></li>
                  <li className="limainpage" ><a>About</a></li>
                  <li className="limainpage" ><a>Contact</a></li>
                </ul>
              </nav>
              <div className="wrapimage" > 
                <img className="imgmain1" src="/img/Fot1.jpg" alt=""/>
                <img className="imgmain" src="/img/Fot.jpg" alt=""/>
              </div>
              <div className="wrapmiddle">
                  <h1 className="hmainpage1"> Pollinator Identification Survey</h1>
              <div>
                  <button type="submit" className="main-login">
                           <Link to={'/page2'}> Get Started</Link>
                  </button>
              </div>
              </div>
              <div className="mainpage1"> 
                <div className="wrappermain">
                  <div className="wrappersubmain">
                    <Reveal animated='small fade' >
                      <Reveal.Content visible>
                        <Image circular size='tiny' src='/img/question.jpg' style={{ borderStyle:"double"}} />
                      </Reveal.Content>
                      <Reveal.Content hidden>
                        <Image circular size='tiny' src='/img/magnifier.png' style={{ borderStyle:"double"}} />
                      </Reveal.Content>
                    </Reveal>
                          <h4>Why Survey</h4>
                          <br/>
                            <p className="psubmain">
                                Did you know that about 90% of wild plants and 75% of... 
                            </p>
                            <Modal
                                trigger={<button type="submit" className="main-more">
                                            more details
                                         </button>}
                                header='Did you know that about 90% of wild plants and 75% of crops grown globally benefit from insect pollination?'
                                content={
                                  <div style={{overflow: 'hidden', padding: '15px'}}>
                                    
                                  <p style={{ paddingBottom: '5px', textAlign:'justify'}}>
                                  
                                  <Image style={{padding: '15px', float:'right'}} wrapped size='medium' src='/img/RRinappleorchard.jpg' />
                                  <Image style={{padding: '15px', float:'right'}} wrapped size='medium' src='/img/raspberryflowermedia.png' />
                                  <Image style={{padding: '15px', float:'right'}} wrapped size='medium' src='/img/raspberryonfieldsheet.png' />

                                  Growing crops are essential to maintain food production around the world.  For some types of crops, insect pollinators are essential and there will be no fruits/seeds in their absence. In others, the presence of insect pollinators can be beneficial but not essential.  An example is raspberry 
                                  fruits – these crops have higher yields and better quality fruits with pollinators than without. As such, ensuring adequate numbers of insect pollinators within crops around the world is an important step in securing ongoing food security. 
                                  </p>
                                  <p style={{ paddingTop: '5px', textAlign:'justify'}}>
                                  
                                  Here in Australia we grow over 50 crops that yield best with insect pollination. While the European Honey Bee (Apis mellifera) is often used as a managed pollinator in a range of insect pollinated crops there are many other important insect crop pollinators. A range of other bee, fly, wasp, beetle, moth and butterfly species are known pollinators, and many of these insects live wild in agricultural landscapes
                                  
                                  </p>
                                  </div>}
                                
                                actions={[
                                  
                                    { key: 'done', content: 'Done', positive: true },
                                  ]}
                                style={{ position: 'absolute',
                                        top: '100%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        textAlign:'justify'}}
                                />
                  </div>
                  <div className="wrappersubmain">
                    {/* <Image src='/img/Fot11.jpg' size='tiny' circular style={{marginLeft:"70px"}} />  */}
                    <Reveal animated='small fade' style={{marginLeft:"0px"}}>
                      <Reveal.Content visible>
                        <Image circular size='tiny' src='/img/survey.jpg' style={{ borderStyle:"double"}} />
                      </Reveal.Content>
                      <Reveal.Content hidden>
                        <Image circular size='tiny' src='/img/Fot11.jpg' style={{ borderStyle:"double"}}/>
                      </Reveal.Content>
                    </Reveal>
                          <h4>Survey process</h4>
                          <br/>
                            <p className="psubmain">
                              You can watch a video about the process of survey... 
                            </p>
                            <Modal
                                trigger={<button type="submit" className="main-more">
                                            more details
                                         </button>}
                                header='Below is the video cilp of survey registration process '
                                content={
                                  <div>
                                    {/* <iframe width="820" height="745" src="https://youtube/embed/jHXCpOn1bd8"> */}
                                    <iframe title="Survey video youtube link" style={{paddingLeft:'170px'}} width="731" height="411" src="https://www.youtube.com/embed/jHXCpOn1bd8" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                                    {/* </iframe> */}
                                  </div>}

                                actions={[
                                  
                                    { key: 'done', content: 'Done', positive: true },
                                  ]}
                                style={{ position: 'absolute',
                                        top: '90%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        textAlign:'justify'}}
                                />
                  </div>
                  <div className="wrappersubmain">
                    <Reveal animated='small fade' style={{marginLeft:"0px"}}>
                      <Reveal.Content visible>
                        <Image circular size='tiny' src='/img/paper.jpg' style={{ borderStyle:"double"}} />
                      </Reveal.Content>
                      <Reveal.Content hidden>
                        <Image circular size='tiny' src='/img/bird-bees1.jpg' style={{ borderStyle:"double"}}/>
                      </Reveal.Content>
                    </Reveal>
                          <h4>Acknowledgment</h4>
                          <br/>
                            <p className="psubmain">
                            Here we are running a research project to understand... 
                            </p>
                            <Modal
                                trigger={<button type="submit" className="main-more">
                                            more details
                                         </button>}
                                header='Welcome to our online insect pollinator identity survey!'
                                content={
                                <div style={{overflow: 'hidden', padding: '20px'}}>
                                <p style={{ paddingBottom: '5px', textAlign:'justify'}}>
                                
                                Here we are running a research project to understand how well computers can identify insects when compared to people.  
                                <br/>
                                <br/>
                                We have a series of photos in which participants will be asked to identify pollinator insects.  
                                <br/>
                                <br/>
                                When you are ready to begin, click the ‘Get Started’ button.  You will then be shown a series of images, one at a time, and asked to select what you believe is the identity of the insect.  You will be shown 15 separate photos.  When you see the pictures, you will have a choice of 5 insect groups to select: 
                                {/* <br/>
                                <br/> */}
                                <Image style={{padding: '15px', float:'right'}} wrapped size='medium' src='/img/dilophussinglevisit1.jpg' />
                                </p>
                                <p>
                                1.	bee, 
                                <br/><br/>
                                2.	fly, 
                                <br/><br/>
                                3.	beetle,
                                <br/> <br/>
                                4.	wasp, 
                                <br/><br/>
                                5.	moth/butterfly
                                <br/>
                                <br/>
                                For each image there will also be an optional text box (labelled optional extra information) where participants can further identify the insect if they choose (e.g. to individual species or group). The 15 photos are randomly selected from a larger pool of 100 photos.  The random selection process will be automated so that each time a new survey is started; a new random set of photos will be automatically chosen.
                                <br/>
                                <br/>
                                After completing the photo identifications, each participant will be asked to rate their insect identification experience on a scale of 1 to 5 (1 no experience, and 5 highly experienced). On this same screen you be will also be asked if they have ever been involved in a citizen science project before (yes and no boxes to tick), and if yes, to enter a name or brief description of the project you were involved with.
                                <br/>
                                <br/>
                                The results from these surveys will be used to generate an accuracy rate for human observers in the identification of five insect groups (bees, flies, beetles, wasps, moths/butterflies). This accuracy rate will then be compared with the accuracy rate of the machine recognition algorithm we have developed, to test whether its accuracy levels are comparable to human observers. The machine recognition algorithm will be given the same sets of random samples of 15 images at a time to process.  The combinations of randomly selected images will be recorded each time, and these same combinations used for the algorithm.
                                
                                </p>
                                </div>}
                                actions={[
                                  
                                    { key: 'done', content: 'Done', positive: true },
                                  ]}
                                style={{ position: 'absolute',
                                        top: '70%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        textAlign:'justify'}}
                                />
                  </div>
                  <div className="wrappersubmain" style={{boxShadow:"0 0px 0px rgb(95, 95, 95)"}}>
                    <Reveal animated='small fade' style={{marginLeft:"0px"}}>
                      <Reveal.Content visible>
                        <Image circular size='tiny' src='/img/lab.jpg' style={{ borderStyle:"double"}} />
                      </Reveal.Content>
                      <Reveal.Content hidden>
                        <Image circular size='tiny' src='/img/RaderLab.jpg' style={{ borderStyle:"double"}} />
                      </Reveal.Content>
                    </Reveal>
                      <h4>Rader Lab</h4>
                      <br/>
                        <p className="psubmain">
                           We study community ecology in agroecosystems...
                        </p>
                        <button type="submit" className="main-more">
                            <a className='alink' href='https://www.raderlab.com/' target='_blank' rel="noopener noreferrer"> more details</a> 
                        </button>
                  </div>
                </div>
              </div>     
            </div>
      );
    }
  }

  MainPage.defaultProps = {
    history: {}
  }

  MainPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export  {MainPage};