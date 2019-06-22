import React, { Component } from "react";
import { connect } from "react-redux"; 
import { Link } from "react-router-dom";
import { fetchGenres } from "../Action/NovelActions";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Chapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prechap: undefined,
      nextchap: undefined
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.noveldetail !== prevProps.noveldetail) {
      if (this.state.prechap === undefined) {
        if (this.props.noveldetail[0].chapterlist.length === 1) {
          return this.setState({ prechap: "", nextchap: "" });
        }
        for (let i = 0; i < this.props.noveldetail[0].chapterlist.length; i++) {
          if (
            this.props.novelchapter.idchapter ===
            this.props.noveldetail[0].chapterlist[i].idchapter
          ) {
            if (i === 0) {
              this.setState({
                prechap: "",
                nextchap: this.props.noveldetail[0].chapterlist[i + 1].idchapter
              });
            }
            if (i > 0 && i < this.props.noveldetail[0].chapterlist.length - 1) {
              this.setState({
                prechap: this.props.noveldetail[0].chapterlist[i - 1].idchapter,
                nextchap: this.props.noveldetail[0].chapterlist[i + 1].idchapter
              });
            }
            if (i === this.props.noveldetail[0].chapterlist.length - 1) {
              this.setState({
                prechap: this.props.noveldetail[0].chapterlist[i - 1].idchapter,
                nextchap: ""
              });
            }
          }
        }
      }
    }
  }

  render() {
    console.log(this.props);
    return (
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
          <span
            id="show_menu_chap"
            className="show_menu_chap btn_theodoi btn_doc"
            style={{ width: 200 }}
          >
            <Link to={'/novel/'+this.props.novelchapter.idnovels}>LIST CHAPTER</Link>
          </span>
          <div>
            {this.state.prechap !== "" && (
              <a
                rel="nofollow"
                className="btn_theodoi btn_doc"
                href={'/novel/'+this.props.novelchapter.idnovels+'/'+this.state.prechap}
              >
                PREV CHAPTER
              </a>
            )}
            {this.state.nextchap !== "" && (
              <a
                rel="nofollow"
                className="btn_theodoi btn_doc"
                href={'/novel/'+this.props.novelchapter.idnovels+'/'+this.state.nextchap}
              >
                NEXT CHAPTER
              </a>
            )}
          </div>
          </div>
          <div className="hentry">
          <h1 className="name_chapter entry-title">{this.props.novelchapter.chaptername}</h1>
          <div className="entry-content">
          <div id="vung_doc" className="vung_doc">
          {ReactHtmlParser(this.props.novelchapter.content)}
          </div>
          </div>
          <div className="menu_doc" id="load">
          <span id="show_menu_chap_bot" className="show_menu_chap btn_theodoi btn_doc" style={{width: 200}}><Link to={'/novel/'+this.props.novelchapter.idnovels}>LIST CHAPTER</Link></span>
          <div>
            {this.state.prechap !== "" && (
              <a
                rel="nofollow"
                className="btn_theodoi btn_doc"
                href={'/novel/'+this.props.novelchapter.idnovels+'/'+this.state.prechap}
              >
                PREV CHAPTER
              </a>
            )}
            {this.state.nextchap !== "" && (
              <a
                rel="nofollow"
                className="btn_theodoi btn_doc"
                href={'/novel/'+this.props.novelchapter.idnovels+'/'+this.state.nextchap}
              >
                NEXT CHAPTER
              </a>
            )}
          </div>
          </div>
          </div>
        </div>
    );
  }
}

export default connect(
  state => ({
    novelchapter: state.Home.novelchapter,
    noveldetail: state.Home.noveldetail
  }),
  { fetchGenres }
)(Chapter);
