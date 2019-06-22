import React, { Component } from "react";
import Header from '../Component/Header';
import Home from '../Component/Home';
import TopWeakeNovel from '../Component/TopWeakeNovel';
import Genres from '../Component/Genres';
import Footer from '../Component/Footer';
import NovelDetail from "../Component/NovelDetail";
import { fetchNovelChapter, fetchNovelDetail } from "../Action/NovelActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Chapter from "../Component/Chapter";
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ContentLoader from "react-content-loader"

class ChapterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prechap: undefined,
      nextchap: undefined
    };
  }
  initializeReactGA() {
    ReactGA.initialize('UA-132843894-1');
    ReactGA.pageview(`/novel/${this.props.match.params.slug}/${this.props.match.params.id}`);
  }
  componentDidMount() {
    let params = {
      novelid: this.props.match.params.slug,
      chapterid: this.props.match.params.id
    }
    let params1 = {
      id: this.props.match.params.slug
    }
    this.props.fetchNovelChapter(params);
    this.props.fetchNovelDetail(params1);
    window.scrollTo(0, 0);
    this.initializeReactGA();
  }
  componentDidUpdate(prevProps, prevState) {
    // if (this.props.noveldetail !== prevProps.noveldetail) {
    //   if (this.state.prechap === undefined || this.state.nextchap === undefined) {
    //     if (this.props.noveldetail[0].chapterlist.length === 1) {
    //       return this.setState({ prechap: "", nextchap: "" });
    //     }
    //     for (let i = 0; i < this.props.noveldetail[0].chapterlist.length; i++) {
    //       if (
    //         this.props.novelchapter.idchapter ===
    //         this.props.noveldetail[0].chapterlist[i].idchapter
    //       ) {
    //         if (i === 0) {
    //           this.setState({
    //             prechap: "",
    //             nextchap: this.props.noveldetail[0].chapterlist[i + 1].idchapter
    //           });
    //         }
    //         if (i > 0 && i < this.props.noveldetail[0].chapterlist.length - 1) {
    //           this.setState({
    //             prechap: this.props.noveldetail[0].chapterlist[i - 1].idchapter,
    //             nextchap: this.props.noveldetail[0].chapterlist[i + 1].idchapter
    //           });
    //         }
    //         if (i === this.props.noveldetail[0].chapterlist.length - 1) {
    //           this.setState({
    //             prechap: this.props.noveldetail[0].chapterlist[i - 1].idchapter,
    //             nextchap: ""
    //           });
    //         }
    //       }
    //     }
    //   }
    // }

  }

  render() {
    console.log(this.props)
    console.log(this.state)
    if (this.props.noveldetail.chapterlist !== undefined) {
      // if (this.state.prechap === undefined || this.state.nextchap === undefined) {
      if (this.props.noveldetail.chapterlist.length === 1) {
        this.state.prechap = '';
        this.state.nextchap = '';
      }
      for (let i = 0; i < this.props.noveldetail.chapterlist.length; i++) {
        if (
          this.props.novelchapter.idchapter ===
          this.props.noveldetail.chapterlist[i].idchapter
        ) {
          if (i === 0) {
            this.state.prechap = '';
            this.state.nextchap = this.props.noveldetail.chapterlist[i + 1].idchapter;
            // this.setState({
            //   prechap: "",
            //   nextchap: this.props.noveldetail.chapterlist[i + 1].idchapter
            // });
          }
          if (i > 0 && i < this.props.noveldetail.chapterlist.length - 1) {
            this.state.prechap = this.props.noveldetail.chapterlist[i - 1].idchapter;
            this.state.nextchap = this.props.noveldetail.chapterlist[i + 1].idchapter;
            // this.setState({
            //   prechap: this.props.noveldetail.chapterlist[i - 1].idchapter,
            //   nextchap: this.props.noveldetail.chapterlist[i + 1].idchapter
            // });
          }
          if (i === this.props.noveldetail.chapterlist.length - 1) {
            this.state.prechap = this.props.noveldetail.chapterlist[i - 1].idchapter;
            this.state.nextchap = '';
            // this.setState({
            //   prechap: this.props.noveldetail.chapterlist[i - 1].idchapter,
            //   nextchap: ""
            // });
          }
        }
        // }
      }
    }
    return (
      <div id='trang_doc'>
        <Helmet>
          <title>{`Read ${this.props.novelchapter.chaptername}`}</title>
          <meta name="description" content={`Read ${this.props.novelchapter.chaptername} online free at novelopen.com . Novel updates, Free books online, Light Novel, Read light novel, Light novel translations, Free Novels Online`} />
          <meta name="theme-color" content="#008f68" />
          <meta name="keywords" content="Novel updates, Free books online, Light Novel, Read light novel, Light novel translations, Free Novels Online" />
        </Helmet>
        <Header />
        <div>
          <div className="breadcrumb breadcrumbs breadcrumbs_doc">
            <div className="rdfa-breadcrumb">
              <div>
                <p>
                  <span className="breadcrumbs-title" />
                  <span>
                    <Link to="/" title="Read novel online" className="home">
                      Read novel online
                  </Link>
                  </span>
                  <span className="separator">»</span>
                  <span>
                    <Link
                      to={"/novel/" + this.props.novelchapter.idnovels}
                      className="home"
                    >
                      {this.props.novelchapter.novelsname}
                    </Link>
                  </span>
                  <span className="separator">»</span>{" "}
                  {this.props.novelchapter.chaptername}
                </p>
              </div>
            </div>
          </div>
          <div className="menu_doc">
            <Link to={'/novel/' + this.props.novelchapter.idnovels}>
              <span
                id="show_menu_chap"
                className="show_menu_chap btn_theodoi btn_doc"
                style={{ width: 200 }}
              >
                LIST CHAPTER
            </span>
            </Link>
            <div>
              {this.state.prechap !== "" && (
                <a
                  rel="nofollow"
                  className="btn_theodoi btn_doc"
                  href={'/novel/' + this.props.novelchapter.idnovels + '/' + this.state.prechap}
                >
                  PREV CHAPTER
              </a>
              )}
              {this.state.nextchap !== "" && (
                <a
                  rel="nofollow"
                  className="btn_theodoi btn_doc"
                  href={'/novel/' + this.props.novelchapter.idnovels + '/' + this.state.nextchap}
                >
                  NEXT CHAPTER
              </a>
              )}
            </div>
          </div>
          <div className="hentry">
            <h1 className="name_chapter entry-title">{this.props.novelchapter.chaptername}</h1>
            <div className="entry-content">
              <div id="vung_doc" className="vung_doc" >
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
                {ReactHtmlParser(this.props.novelchapter.content)}
              </div>
            </div>
            <div className="menu_doc" id="load">
              <span id="show_menu_chap_bot" className="show_menu_chap btn_theodoi btn_doc" style={{ width: 200 }}><Link to={'/novel/' + this.props.novelchapter.idnovels}>LIST CHAPTER</Link></span>
              <div>
                {this.state.prechap !== "" && (
                  <a
                    rel="nofollow"
                    className="btn_theodoi btn_doc"
                    href={'/novel/' + this.props.novelchapter.idnovels + '/' + this.state.prechap}
                  >
                    PREV CHAPTER
              </a>
                )}
                {this.state.nextchap !== "" && (
                  <a
                    rel="nofollow"
                    className="btn_theodoi btn_doc"
                    href={'/novel/' + this.props.novelchapter.idnovels + '/' + this.state.nextchap}
                  >
                    NEXT CHAPTER
              </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  state => ({
    novelchapter: state.Home.novelchapter,
    noveldetail: state.Home.noveldetail,
    loading: state.Home.loading
  }),
  { fetchNovelChapter, fetchNovelDetail }
)(ChapterContainer);