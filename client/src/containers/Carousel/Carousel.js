import React, { Component } from "react";
import "./Carousel.scss";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';



export default class Carousel extends Component {

  render() {
    const articleData = [
      { title: 'Halo Infinite ', summary: 'Rumors, release dates, plot, and gameplay.  Get the most up to date information on the upcoming mega release, Halo Infinite!  Everything we know about Halo Infinite so far can be found here!', url: 'https://www.laptopmag.com/news/halo-infinite-rumors-release-date-plot-and-gameplay', imgLink: 'https://i.imgur.com/iNUbukr.jpg' },
      { title: 'Accessible Gaming', summary: 'Come celebrate Global Awareness Day with the Halo community. Watch the livestream hosted by SightlessKombat as he plays a custom game variant created to push the gaming industry to create better experiences for everyone. Amazing work!', url: 'https://blog-ambassadors.xbox.com/global-accessibility-awareness-day-playing-halo-5-guardians-without-sight', imgLink: 'https://i.imgur.com/tFwNtwA.png' },
      { title: 'Halo 5 Content Updates', summary: 'Get an overview of all the recent updates and changes made to Halo 5.  Here you can find patch notes, new game modes, and other news pertaining to Halo 5! These game modes include Overtime, Monitor\'s Bounty, and Anvil\'s Legacy, come check it out Today!', url: 'https://www.halowaypoint.com/en-us/games/halo-5-guardians/updates', imgLink: 'https://i.imgur.com/53obnwG.jpg' },
      { title: 'MCC Pro Series', summary: 'Follow the current rankings in the PRO Series. Team information, Standings, Matches and much more! Stay up to date with all your favorite players and teams!', url: 'https://www.faceit.com/en/championship/5964985b-aba8-4f24-b5c9-3b1b9bf00adc/Halo%20MCC%20Open%20Qualifier/standings/classic', imgLink: 'https://i.imgur.com/55mIZWf.png' },
      { title: 'Discord', summary: 'Join your fellow Spartans in friendly conversation about all that is Halo! Like minded Halo fans can enjoy a fun and down to earth environment. Join today!', url: 'https://discord.com/invite/halo', imgLink: 'https://i.imgur.com/7usoV7r.jpg' },
      { title: 'Twitter ', summary: 'Follow the official twitter of 343 Industries Halo!  Get all the latest tweets and updates live through the feed of the makers of Halo.  Find interesting pictures, posts, and a great community by following today!', url: 'https://twitter.com/halo?lang=en', imgLink: 'https://i.imgur.com/IikCrAF.jpg' },
    ]

    const renderSlides = () =>
      articleData.map(({ imgLink, title, summary, url }) => {
        const imgStyle = { backgroundImage: `url(${imgLink})` }
        return (<div>
          <div className='carousel-slide'>
            <div className='article-img-container' style={imgStyle}></div>
            <div className='article-info'>
              <h3>{title}</h3>
              <p>{summary}</p>
              <a href={url} target='_blank'>Click Here to Read More..</a>
            </div>
          </div>
        </div>
        )
      })


    return (
      <div className='App'>
        <Slider
          dots={true}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={2500}
        >
          {renderSlides()}
        </Slider>
      </div>)
  }
}
