import React, { Component } from 'react'
import Newselement from './Newselement'
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import Weatherelement from './weatherelement'

export class News extends Component {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            weather: [],
            value: 'New York',
            main: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-News World`
    }
    static defaultProps = {
        country: 'in',
        pagesize: 20,
        category: 'science'
    }
    static propTypes = {
        country: propTypes.string,
        pagesize: propTypes.number,
        category: propTypes.string,
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.updateweather();
        event.preventDefault();
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c4c194bcaa4a4d0a979e3eb04ae6f48e&page=1&pagesize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parsedinfo = await data.json();
        this.setState({});
        this.setState({ articles: parsedinfo.articles, totalResults: parsedinfo.totalResults })
        let url2 = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=09d0d89e268de3298d9ac220a74f727b`;
        let data2 = await fetch(url2);
        let parsedinfo2 = await data2.json();
        this.setState({});
        this.setState({ weather: parsedinfo2.weather, main: parsedinfo2.main })
    }
    updateweather = async () => {
        this.setState({ value: this.state.value });
        let url2 = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=09d0d89e268de3298d9ac220a74f727b`;
        this.setState({ loading: true });
        let data2 = await fetch(url2);
        let parsedinfo2 = await data2.json();
        this.setState({});
        this.setState({ weather: parsedinfo2.weather, main: parsedinfo2.main })
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c4c194bcaa4a4d0a979e3eb04ae6f48e&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedinfo = await data.json();
        this.setState({
            articles:
                this.state.articles.concat(parsedinfo.articles), totalResults: parsedinfo.totalResults, loading: false
        })
    };
    

    render() {
        return (
            <div className="splitScreen">
                <div className="topPane" >
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<h4 className="text-center">
                            <div className="spinner-border " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div></h4>}>
                        <div className="container cont">
                        <h2 className="tophead">Top Headlines-{this.capitalizeFirstLetter(this.props.category)}</h2>
                            <div className=" my-3 ">
                                <div className="row mn">
                                    {this.state.articles.map((element) => {
                                        return (<div className="col-md-4" key={element.url}>
                                            <Newselement title={element.title} discription={element.description} imageurl={element.urlToImage} url={element.url} time={element.publishedAt} author={element.author} source={element.source.name} />
                                        </div>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
                <div className="bottomPane">
                        <h2 className="weatherhead">Search Your Location</h2>
                        <div className="box summer ">
                            <form onSubmit={this.handleSubmit} className="d-flex searchbox">
                                <input className="form-control me-2" type="search" placeholder="Search" value={this.state.value} onChange={this.handleChange} />
                                <input className="btn btn-outline-success" type="submit" value="Search" />
                            </form>
                            {this.state.weather.map((element) => {
                                return (<div key={element.id}>
                                    <Weatherelement description={element.description} temp={this.state.main.temp} location={this.state.value} humidity={this.state.main.humidity} tempmx={this.state.main.temp_max} tempmin={this.state.main.temp_min} feel={this.state.main.feel_like} icon={element.icon} />
                                </div>)
                            })}
                            
                        </div>
                </div>
            </div>
        )
    }
}

export default News
