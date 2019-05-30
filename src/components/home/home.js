import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Courses from "./courses";
import ContentFactory from "../contentFactory/contentFactory";
import Img1 from "../../images/istockphoto-915567912-2048x2048.jpg";
import Img2 from "../../images/istockphoto-1050241598-1024x1024.jpg";
import Img3 from "../../images/Spot-Welding.jpeg";
import Img4 from "../../images/051.jpg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminClass: "hide",
      slideIndex: 0,
      slideDirection: "",
      showTime: [
        {
          showtimeTextHeader: "1 WIR HILFE DABEI, IHRE ALIEGE UMZUETEN",
          showtimeText: "wir hilfe dabei, ihre aliege umzuete.",
          image: Img1
        },
        {
          showtimeTextHeader: "2 WIR HILFE DABEI, IHRE ALIEGE UMZUETEN",
          showtimeText: "2 wir hilfe dabei, ihre aliege umzuete.",
          image: Img2
        },
        {
          showtimeTextHeader: "3 WIR HILFE DABEI, IHRE ALIEGE UMZUETEN",
          showtimeText: "3 wir hilfe dabei, ihre aliege umzuete.",
          image: Img3
        },
        {
          showtimeTextHeader: "4 WIR HILFE DABEI, IHRE ALIEGE UMZUETEN",
          showtimeText: "4 wir hilfe dabei, ihre aliege umzuete.",
          image: Img4
        }
      ]
    };
  }


  slide = e => {
    if (e.target.id === "left") {
      this.setState({
        slideIndex: (this.state.slideIndex +3) % 4,
        slideDirection: "slide-left"
      });
    } else if (e.target.id === "right") {
      this.setState({
        slideIndex: (this.state.slideIndex +1) % 4,
        slideDirection: "slide-right"
      });
    }
  };

  render() {
    const classNames = this.state.slideDirection;
    const { strings, lang } = this.props;

    return (
      <div className="container">
        <section className="showtime">
          <div id="leftArrow" onClick={this.slide}>
            <i id="left" className="fas fa-angle-left" />
          </div>
          <div id="rightArrow" onClick={this.slide}>
            <i id="right" className="fas fa-angle-right" />
          </div>
          <div className="showtime__img">
            <TransitionGroup
              childFactory={child => React.cloneElement(child, { classNames })}
            >
              <CSSTransition
                key={this.state.slideIndex}
                timeout={1000}
                classNames={classNames}
              >
                <img
                  src={this.state.showTime[this.state.slideIndex].image}
                  alt=""
                />
              </CSSTransition>
            </TransitionGroup>
          </div>
          <TransitionGroup>
            <CSSTransition
              key={this.state.slideIndex}
              timeout={1000}
              classNames="showtime__text"
            >
              <div className="showtime__text">
                <h1>
                  {
                    this.state.showTime[this.state.slideIndex]
                      .showtimeTextHeader
                  }
                </h1>
                <p>
                  {this.state.showTime[this.state.slideIndex].showtimeText}{" "}
                </p>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </section>

        <ContentFactory link={"home1"} classNames={"home__content"} />
        <Courses strings={strings} lang={lang} />
        <ContentFactory link={"home2"} classNames={"quote"} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  //console.log(state);
  let collection = "home";
  return {
    lang: state.language.language,
    auth: state.firebase.auth,
    content: state.firestore.data[collection],
    strings: state.language.strings
  };
};
export default connect(mapStateToProps)(Home);
