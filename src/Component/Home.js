import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchHome, fetchHotnovel } from "../Action/NovelActions";
import ContentLoader from "react-content-loader"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docnhieu: []
    }

  }
  componentDidMount() {
    let params = {
      page: 1
    }
    this.props.fetchHome(params);
    this.props.fetchHotnovel(params);
  }



  render() {
    console.log(this.props)
    return (
      <div>
        <div className="cotgiua">
          <div className="cotgiua_menu">
            <Link
              rel="nofollow"
              to={'/updates/page/1'}
              title="RECENTLY UPDATED NOVEL"
              className="head_title actived muc_truyen_moi_cap_nhat"
            >
              RECENTLY UPDATED
            </Link>
            <Link
              rel="nofollow"
              to={'/completed/page/1'}
              title="COMPLETED NOVEL"
              className="head_title muc_truyen_hoan_thanh"
            >
              COMPLETED
            </Link>
            <Link
              rel="nofollow"
              to={'/hotnovel/page/1'}
              title="TOP VIEW NOVEL"
              className="head_title"
            >
              TOP VIEW
            </Link>
          </div>
          <div className="wrap_update home">
            <div className="daily-update">
              <h2 className="title update-title" title="Recently Updated MANGA">
                RECENTLY UPDATED NOVEL
              </h2>
            </div>
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
            {this.props.mangalist.map(mangalist => (
              <div className="update_item">
                <div className="update_image">
                  <Link
                    className="tooltip"
                    data-tooltip={mangalist.novelsname}
                    to={'/novel/' + mangalist.idnovel}
                  >
                    <img
                      src={mangalist.cover}
                      alt={mangalist.novelsname}
                    />
                  </Link>
                </div>
                <h3 className="nowrap">
                  <Link
                    className="tooltip"
                    data-tooltip={mangalist.novelsname}
                    to={'/novel/' + mangalist.idnovel}
                    title={mangalist.novelsname}
                  >
                    {mangalist.novelsname}
                  </Link>
                  {/* <em>43 minutes ago </em> */}
                </h3>
                <Link
                  to={'/novel/' + mangalist.idnovel + '/' + mangalist.idchapter}
                  title={mangalist.lasterchapter}
                  className="chapter"
                >
                  {mangalist.lasterchapter}
                </Link>
                <br />
              </div>
            ))}
            <Link to={'/updates/page/1'} title="More" className="xemthem" rel="nofollow">More</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    mangalist: state.Home.mangalist,
    hotnovel: state.Home.hotnovel,
    loading: state.Home.loading
  }),
  { fetchHome, fetchHotnovel }
)(Home);
