import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import moment from 'moment';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Link = styled.a`
	color: #f5f5f5;
	font-size: 22px;
`;

function News (props) {
	const [localNews, setLocalNews] = useState({});
	const [newsLoaded, setNewsLoaded] = useState(false);
	const [verb, setVerb] = useState('');

	const getNews = () => {
		fetch(`${process.env.REACT_APP_NEWS_BASE}everything?q=${props.currentCity} Fun Good Happy&language=en&sortBy=publishedA&pageSize=6&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
			.then(response => {
				if (response.ok) {
					return response.json();
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
	};

	useEffect(() => {
		if (props.currentCity) {
			getNews();
		}
	}, [props.currentCity]);

	const getVerb = () => {
		if (props.timeOfDay === 'morning') {
			setVerb('start');
		} else if (props.timeOfDay === 'afternoon' || props.timeOfDay === 'evening') {
			setVerb('move on with');
		} else if (props.timeOfDay === 'night') {
			setVerb('end');
		}
	};

	useEffect(() => {
		getVerb();
	}, [props.timeOfDay]);

	return (
		<div
			style={{
				zIndex: 1,
				marginTop: 36,
			}}
		>
			<h1
				style={{
					fontSize: 16,
					textAlign: 'center',
				}}
			>
				Some fun news to {verb} your day in a positive way:
			</h1>
			{newsLoaded && (
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
									padding: 10,
									width: '100%',
									maxWidth: '80vw',
									margin: '0 auto',
									minHeight: 100,
								}}
							>
								<Link href={news.url} target='_blank' rel="noreferrer">
									{moment(news.publishedAt).format('MMM DD yy')} 
										&nbsp;|&nbsp;
									{news.title}
								</Link>
							</div>
						)
					)}
				</Carousel>
			)}
		</div>
	);
}

News.propTypes = {
	currentCity: PropTypes.string,
	timeOfDay: PropTypes.string,
};

export default News;
