import React, { useState, useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import moment from 'moment'

function News (props) {
  const [localNews, setLocalNews] = useState({})
  const [newsLoaded, setNewsLoaded] = useState(false)

  const getNews = () => {
    fetch(`${process.env.REACT_APP_NEWS_BASE}everything?q=${props.currentCity} Good&language=en&sortBy=publishedA&pageSize=6&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(data => {
        setLocalNews(data)
      })
      .then(() => {
        setNewsLoaded(false)
      })
      .then(() => {
        setNewsLoaded(true)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    if (props.currentCity) {
      getNews()
    } else if (!props.currentCity) {

    }
  }, [props.currentCity])

  return (
        <div
            style={{
              zIndex: 1
            }}
        >
            {newsLoaded && (
                <>
                    Some good news
                    <Carousel
                        autoPlay={true}
                        interval={6000}
                        showArrows={false}
                        showIndicators={false}
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={true}
                        stopOnHover={false}
                        swipeable={false}
                        animationHandler={'fade'}
                    >
                        {localNews.articles.map(
                          (news, i) => (
                                <div
                                    key={i}
                                    style={{
                                      padding: 20
                                    }}
                                >
                                    <a href={news.url} target='_blank' rel="noreferrer"><span className="news-date">{moment(news.publishedAt).format('MMM DD yy')}</span> {news.title}</a>
                                </div>
                          )
                        )}
                    </Carousel>
                </>
            )}
        </div>
  )
};

export default News
