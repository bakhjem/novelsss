import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNovelDetail } from "../Action/NovelActions";

class NovelDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datagenres: [],
      datachapter: [],
      cover: '',
      novelsname: '',
      othername: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.noveldetail !== prevProps.noveldetail) {
      this.setState({
        datagenres: this.props.noveldetail.genresdata,
        datachapter: this.props.noveldetail.chapterlist,
        cover: this.props.noveldetail.cover,
        novelsname: this.props.noveldetail.novelsname,
        othername: this.props.noveldetail.othername,
        idnovels: this.props.noveldetail.idnovels,
        status: this.props.noveldetail.status,
        author: this.props.noveldetail.author,
        dateupdate: this.props.noveldetail.dateupdate,
        description: this.props.noveldetail.description,
      });
      
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div className="cotgiua">
        <div className="hfeed truyen_info_wrapper">
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
                    <a
                      itemProp="url"
                      href={"/novel/" + this.state.idnovels}
                      title={this.state.novelsname}
                    >
                      <span itemProp="title">
                        {this.state.novelsname}
                      </span>
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="hentry truyen_info">
            <div className="entry-header">
              <div className="truyen_if_wrap">
                <div className="truyen_info_left">
                  <span
                    className="info_image"
                    style={{
                      background: `url(${
                        this.state.cover
                      })  center center no-repeat`,
                      backgroundSize: "contain"
                    }}
                    title={this.state.novelsname}
                  >
                    <img
                      width={173}
                      height={250}
                      src={this.state.cover}
                      className="attachment-large size-large wp-post-image"
                      alt={this.state.novelsname}
                      title={this.state.novelsname}
                      style={{opacity: 0}}
                    />
                  </span>
                  <Link to={'#list_chapter'}>
                  <span
                    onclick="movetolistchapter();"
                    className="btn_theodoi btn_list_chapter"
                    
                  >
                    LIST CHAPTER
                  </span>
                  </Link>
                </div>
                <ul className="truyen_info_right">
                  <li>
                    <h1 className="entry-title">
                      {this.state.novelsname}
                    </h1>
                    <span
                      style={{
                        font: "400 14px Open Sans, Tahoma, Geneva, sans-serif"
                      }}
                    >
                      {this.state.othername}
                    </span>{" "}
                  </li>
                  <li>
                    <span>Author(s): </span>
                      {this.state.author}
                  </li>
                  <li>
                    <span>GENRES: </span>
                    {this.state.datagenres.map(genresdata => (
                      <a rel="nofollow" href={"/genres/" + genresdata.idgenres+'/page/1'}>
                        {genresdata.genrename} -
                      </a>
                    ))}
                  </li>
                  <li>
                    <span>STATUS : </span>
                      {this.state.status}
                  </li>
                  <li>
                    <span>LAST UPDATED : </span>
                    <em
                      className="entry-meta"
                      style={{ padding: 0, fontStyle: "initial" }}
                    >
                      <em className="date updated">
                        {this.state.dateupdate}
                      </em>
                    </em>
                  </li>
                </ul>
              </div>
              <div
                id="noidungm"
                style={{
                  font: "400 14px Open Sans, Tahoma, Geneva, sans-serif",
                  color: "#3e3e3e",
                  width: "96%",
                  padding: "10px 2%",
                  background: "#FFF",
                  textAlign: "justify",
                  borderTop: "1px dashed #ff530d",
                  float: "left",
                  height: "100%",
                  position: "relative",
                  overflowY: "auto",
                  maxHeight: "100%",
                  overflowX: "hidden"
                }}
              >
                <h2>
                  <p style={{ color: "red" }}>
                    {this.state.novelsname} summary:
                  </p>
                </h2>
                {this.state.description}
              </div>
              <div style={{ width: "100%", textAlign: "center" }} />
              <div id="list_chapter" className="list_chapter">
                <div className="row title-list-chapter">
                  <h2 className="h2-manga">
                    {this.state.novelsname} Chapter
                  </h2>
                </div>
                <div className="chapter-list">
                {this.state.datachapter.map(datachapter => (
                    <div className="row">
                    <span><a href={'/novel/'+this.state.idnovels+'/'+datachapter.idchapter} title={datachapter.chaptername}>{datachapter.chaptername}</a></span>
                  </div>                  
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    noveldetail: state.Home.noveldetail
  }),
  { fetchNovelDetail }
)(NovelDetail);
