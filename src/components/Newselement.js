import React, { Component } from 'react'

export class Newselement extends Component {
    render() {
        let { title, discrption, imageurl,url, time , author, source} = this.props;
        return (
            <div>
                <div className="card">
                    <img src={!imageurl?"https://www.androidpolice.com/wp-content/uploads/2020/12/09/iPhone-12-Mini-vs-Pixel-5-1-scaled.jpg":imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                    <span className="badge badgecolor">{source}</span>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{discrption}</p>
                        <a href={url} target="_blank" className="btn btn-sm btn-dark" >Read More</a>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date(time).toGMTString()}</small></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newselement
