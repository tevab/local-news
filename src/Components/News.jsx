import React, { useState, useEffect } from "react";

function News(props) {

    const [localNews, setLocalNews] = useState({});
    const [newsLoaded, setNewsLoaded] = useState(false);

    const getNews = () => {
        fetch(`${process.env.REACT_APP_NEWS_BASE}everything?q=${props.currentCity} Good&language=en&sortBy=publishedA&pageSize=6&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
        })
        .then(data => {
          setLocalNews(data);
        })
        .then(() => {
            setNewsLoaded(true);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        if (props.currentCity) {
            getNews();
        } else if (!props.currentCity) {
            return;
        }
    }, [props.currentCity]);


    return (
        <>
            {newsLoaded && (
                <>
                    {localNews.articles.map(
                        (news, i) => (
                            <div key={i}>{news.title}</div>
                        )
                    )}
                </>
            )}
        </>
    );
};

export default News;