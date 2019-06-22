import React, { Component } from "react";
import { fetchHotnovel } from "../Action/NovelActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Component/Header";
import TopWeakeNovel from "../Component/TopWeakeNovel";
import Genres from "../Component/Genres";
import Footer from "../Component/Footer";
import GenresDetail from "../Component/GenresDetail";
import TopviewNovel from "../Component/TopviewNovel";
import ContentLoader from "react-content-loader"

class TopViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    let params = {
      page: this.props.match.params.id,
    };
    this.props.fetchHotnovel(params);
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.hotnovel !== prevProps.hotnovel) {
      this.setState({ data: this.props.hotnovel.data })
    }
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <Header />
        <div id="main_body">
          <div className="cotgiua">
            <div>
              <div className="breadcrumb breadcrumbs">
                <div className="rdfa-breadcrumb">
                  <div>
                    <p>
                      <span className="breadcrumbs-title" />
                      <span
                        itemScope
                        itemType="http://data-vocabulary.org/Breadcrumb"
                      >
                        <a
                          itemProp="url"
                          href="/"
                          className="home"
                          title="Read novel online"
                        >
                          <span itemProp="title">Read novel online</span>
                        </a>
                      </span>
                      <span className="separator">»</span>
                      <span
                        itemScope
                        itemType="http://data-vocabulary.org/Breadcrumb"
                      >
                        <Link
                          itemProp="url"
                          to={'/hotnovel/' + this.props.hotnovel.page}
                        >
                          <span itemProp="title">Hot novel</span>
                        </Link>
                      </span>
                      <span className="separator">»</span>
                      <span
                        itemScope
                        itemType="http://data-vocabulary.org/Breadcrumb"
                      >
                        <Link
                          itemProp="url"
                          to={'/hotnovel/' + this.props.hotnovel.page}
                        >
                          <span itemProp="title">All</span>
                        </Link>
                      </span>
                      <span className="separator">»</span>{this.props.hotnovel.page} page
              </p>
                  </div>
                </div>
              </div>
              <div className="wrap_update tab_anh_dep danh_sach" style={{ marginBottom: 10 }}>
                {this.state.data.map(data => (
                  <div className="update_item list_category" title={data.novelsname}>
                    <Link rel="nofollow" to={'/novel/' + data.idnovel} title={'/novel/' + data.novelsname}>
                      <img src={data.cover} alt={data.novelsname} title={data.novelsname} />
                    </Link>
                    <h3 className="nowrap">
                      <Link to={'/novel/' + data.idnovel} title={data.novelsname} >{data.novelsname} </Link>
                    </h3>
                    <Link to={'/novel/' + data.idnovel + '/' + data.idchapter} title={data.lasterchapter} className="chapter">{data.lasterchapter}</Link>
                    {/* <span>Last updated : 21-Jan-2019 06:29</span>
            <span>View : 13,396</span> */}
                  </div>
                ))}
                <div className="clearfix"></div>
              </div>
              <div className="phan-trang">
                {this.props.hotnovel.page !== this.props.hotnovel.totalpage &&
                  <a href={'/hotnovel/page/' + (parseInt(this.props.hotnovel.page) + 1)} class="quantitychapter">Next page</a>
                }
                {this.props.hotnovel.page !== '1' &&
                  <a href={'/hotnovel/page/' + (parseInt(this.props.hotnovel.page) - 1)} class="page">Pre page</a>
                }
              </div>
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
          </div>
          <div className="cotphai">
            <TopWeakeNovel />
            {/* <Genres /> */}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(
  state => ({
    hotnovel: state.Home.hotnovel,
    loading: state.Home.loading
  }),
  { fetchHotnovel }
)(TopViewContainer);
