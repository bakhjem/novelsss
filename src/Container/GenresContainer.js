import React, { Component } from "react";
import { fetchGenresDetail } from "../Action/NovelActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Component/Header";
import TopWeakeNovel from "../Component/TopWeakeNovel";
import Genres from "../Component/Genres";
import Footer from "../Component/Footer";
import GenresDetail from "../Component/GenresDetail";
import ContentLoader from "react-content-loader"

class GenresContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let params = {
      page: this.props.match.params.id,
      id: this.props.match.params.slug
    };
    this.props.fetchGenresDetail(params);
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div>
        <Header />
        <div id="main_body">
          <div className="cotgiua">
            <GenresDetail id={this.props.match.params.slug}/>
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
    genresdetail: state.Home.genresdetail,
    loading: state.Home.loading
  }),
  { fetchGenresDetail }
)(GenresContainer);
