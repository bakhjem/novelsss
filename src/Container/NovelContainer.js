import React, { Component } from "react";
import Header from '../Component/Header';
import Home from '../Component/Home';
import TopWeakeNovel from '../Component/TopWeakeNovel';
import Genres from '../Component/Genres';
import Footer from '../Component/Footer';
import NovelDetail from "../Component/NovelDetail";
import { fetchNovelDetail } from "../Action/NovelActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import ContentLoader from "react-content-loader"

class NovelContainer extends Component {
  constructor(props) {
    super(props);

  }
  initializeReactGA() {
    ReactGA.initialize('UA-132843894-1');
    ReactGA.pageview(`/novel/${this.props.match.params.id}`);
  }
  componentDidMount() {
    let params = {
      id: this.props.match.params.id
    }
    this.props.fetchNovelDetail(params);
    window.scrollTo(0, 0);
    this.initializeReactGA();
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Helmet>
          <title>{`Read ${this.props.noveldetail.novelsname}`}</title>
          <meta name="description" content={this.props.noveldetail.description} />
          <meta name="theme-color" content="#008f68" />
          <meta name="keywords" content="Novel updates, Free books online, Light Novel, Read light novel, Light novel translations, Free Novels Online" />
        </Helmet>
        <Header />
        <div id="main_body">
          <NovelDetail />
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
          <div className="cotphai">
            <TopWeakeNovel />
            <Genres />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  state => ({
    noveldetail: state.Home.noveldetail,
    loading: state.Home.loading
  }),
  { fetchNovelDetail }
)(NovelContainer);