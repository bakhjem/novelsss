import React, { Component } from "react";
import { fetchCompleteNovel } from "../Action/NovelActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Component/Header";
import Newupdate from "../Component/Newupdate";
import TopWeakeNovel from "../Component/TopWeakeNovel";
import Genres from "../Component/Genres";
import Footer from "../Component/Footer";
import CompletedNovel from "../Component/CompletedNovel";
import ContentLoader from "react-content-loader"

class CompletedContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let params = {
      page: this.props.match.params.id
    };
    this.props.fetchCompleteNovel(params);
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div>
        <Header />
        <div id="main_body">
          <div className="cotgiua">
            <CompletedNovel />
            {this.props.loading === true &&
              <ContentLoader 
              height={160}
              width={400}
              speed={2}
              primaryColor="#c0c0c0"
              secondaryColor="#ecebeb"
            >
              <circle cx="10" cy="20" r="8" /> 
              <rect x="25" y="15" rx="5" ry="5" width="220" height="10" /> 
              <circle cx="10" cy="50" r="8" /> 
              <rect x="25" y="45" rx="5" ry="5" width="220" height="10" /> 
              <circle cx="10" cy="80" r="8" /> 
              <rect x="25" y="75" rx="5" ry="5" width="220" height="10" /> 
              <circle cx="10" cy="110" r="8" /> 
              <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
            </ContentLoader>
          }
          </div>
          <div className="cotphai">
            <TopWeakeNovel />
            <Genres />
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(
  state => ({
    completenovel: state.Home.completenovel,
    loading: state.Home.loading
  }),
  { fetchCompleteNovel }
)(CompletedContainer);
