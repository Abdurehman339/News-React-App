import React from "react";

const NewsItem = (props)=>{
  let {title,description,imageUrl, newsUrl, Date, source} = props;
  return (
    <div>
      <div className="card">
        <span className="position-absolute top-0 badge rounded-pill bg-danger" style={{zIndex: '1', right: '0%'}}>
        {source? source:"Unknown"}
        </span>
        
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {description}
          </p>
          <p className="card-text"><small className="text-muted">{Date}</small></p>
          <a href={newsUrl} className="btn btn-primary">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
