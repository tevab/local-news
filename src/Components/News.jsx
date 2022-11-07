import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

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
            setNewsLoaded(false);
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
                <Carousel 
                    autoPlay={true} 
                    interval={2000} 
                    showArrows={false}
                    showIndicators={false}
                    showStatus={false}
                    showThumbs={false}
                >
                    {localNews.articles.map(
                        (news, i) => (
                            <div key={i}>{news.title}</div>
                        )
                    )}
                </Carousel>
            )}
        </>
    );
};

export default News;