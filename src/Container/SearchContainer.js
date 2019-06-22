import React, { Component } from "react";
import { fetchSearch } from "../Action/NovelActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Component/Header";
import TopWeakeNovel from "../Component/TopWeakeNovel";
import Genres from "../Component/Genres";
import Footer from "../Component/Footer";
import Search from "../Component/Search";
import ContentLoader from "react-content-loader"

class SearchContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let params = {
      name: this.props.match.params.slug,
      page: this.props.match.params.id
    };
    this.props.fetchSearch(params);
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div>
        <Header />
        <div id="main_body">
          <div className="cotgiua">
            <Search />
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
    search: state.Home.search,
    loading: state.Home.loading
  }),
  { fetchSearch }
)(SearchContainer);
