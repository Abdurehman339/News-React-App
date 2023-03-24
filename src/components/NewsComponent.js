import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
 
const NewsComponent = (props)=>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  
  // constructor() {
  //   super();
  //   this.state = {
  //     articles: [],
  //     loading: false,
  //     page: 1,
  //     totalResults: 0
  //   };
  // }

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const updatePage = async (page) => {
    props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(10)
    setLoading(true);
    props.setProgress(20)
    let data = await fetch(url);
    props.setProgress(40)
    let fetched_data = await data.json();
    props.setProgress(70)
    setArticles(fetched_data.articles);
    settotalResults(fetched_data.totalResults);
    setLoading(false);
    props.setProgress(90)
    document.title = `${capitalizeWords(props.category)} - News Monkey`
    props.setProgress(100)
  }

  useEffect((page)=>{
    updatePage(page);
    /* eslint-disable */
  }, [])

  // const componentDidMount = async() => {
  //   updatePage(page);
  // } 

  // hanldePre = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true
    // })
    // let data = await fetch(url);
    // let fetched_data = await data.json();
    // this.setState({
    //   articles: fetched_data.articles,
    //   page: this.state.page - 1,
    //   loading: false
    // });
  //   this.updatePage(this.state.page - 1);
  //   this.setState({
  //     page: this.state.page - 1
  //   });
  // };

  // hanldeNext = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${
    // this.state.page + 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true
    // })
    // let data = await fetch(url);
    // let fetched_data = await data.json();
    // this.setState({
    //     articles: fetched_data.articles,
    //     page: this.state.page + 1,
    //     loading: false
    // });
    // this.updatePage(this.state.page + 1);
    // this.setState({
    //   page: this.state.page + 1
    // });
    // }

    const fetchMoreData = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page + 1}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let fetched_data = await data.json();
      setArticles(articles.concat(fetched_data.articles));
      settotalResults(fetched_data.totalResults);
      setPage(page + 1);
      document.title = `${capitalizeWords(props.category)} - News Monkey`
    }

  return (
    <div className="container my-5">
      <h1 className="text-center" style={{marginTop: '70px'}}>Top {capitalizeWords(props.category)} News</h1>
        {loading && <Spinner/>}
      <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalResults}
      loader={<Spinner/>}
      >
      <div className="container">
        <div className="row">
          {articles.map((element) => {
            return (
              <div key={element.url} className="col-md-4" style={{paddingBottom: '2rem',paddingTop: '2rem'}}>
                {!loading && <NewsItem
                  source={element.source.name}
                  imageUrl={element.urlToImage}
                  title={element.title}
                  description={element.description}
                  newsUrl={element.url}
                  Date={new Date(element.publishedAt).toUTCString()}
                />}
              </div>
            );
          })}
        </div>
      </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between my-4">
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.hanldePre}
          disabled={this.state.page <= 1}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.hanldeNext}
          disabled={
            this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
          }
        >
          Next &rarr;
        </button>
      </div> */}
    </div>
  );
};

NewsComponent.defaultProps = {
  pageSize: '5',
  country: 'us',
  category: 'sports',
  // api: '5d4a3aeb8b7d44deaf518e0b5a1088cb'
};

NewsComponent.propTypes = {
  pageSize: PropTypes.string,
  country: PropTypes.string,
  category: PropTypes.string,
  api: PropTypes.string
};

export default NewsComponent;
