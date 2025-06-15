import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import cardOne from '../assets/card_one.png';
import cardTwo from '../assets/card_two.png';
import cardThree from '../assets/card_three.png';
import heroBanner from '../assets/hero_banner.png';
import '../css/index.css';
import SpotlightCard from '../components/SpotlightCard';  
import SplitText from '../components/SplitText';

const HomePage = () => {
  return (
    <div className="bg-light text-dark min-vh-100"> 
      <div className="position-relative">
        <img
          src={heroBanner}
          alt="hero banner showing a map of the world"
          className="img-fluid w-100 banner-image"
        />
        <div className="banner-text">
          <h1 className="fw-bold fs-2 fs-md-1">Welcome to World Happiness Rankings</h1>
          <p className="lead mb-0">Explore the latest happiness rankings and stats from around the world.</p>
        </div>
      </div>

      <div className="text-container text-center p-5">
        <SplitText
          text="This publication contains rankings of national happiness, based on respondent ratings of their own lives."
          className="fs-3"
          delay={15}
          animationFrom={{ opacity: 0, transform: 'translateY(10px)' }}
          animationTo={{ opacity: 1, transform: 'translateY(0px)' }}
          easing="ease-out"
        />
      </div>

      <div className="container-fluid">
        <div className="row justify-content-center py-4 px-3">
          <div className="col-md-4 py-2">
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(123, 123, 123, 0.69)">
              <img src={cardOne} className="card-img-top pb-2" alt="Top Country - a plane window looking at clouds" />
              <div className="card-body">
                <h5 className="card-title py-2">Country Rankings</h5>
                <p className="card-text">Discover the world rankings of 153 countries and how they have scored against each other over the years, from 2015 to 2020.</p>
                <Link to="/filter" className="btn btn-primary">Explore</Link>
              </div>
            </SpotlightCard>
          </div>

          <div className="col-md-4 py-2">
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(123, 123, 123, 0.69)">
              <img src={cardTwo} className="card-img-top pb-2" alt="Happiness Factors - a sign saying good vibes only " />
              <div className="card-body">
                <h5 className="card-title py-2">New User</h5>
                <p className="card-text">Want to learn about the key factors that contribute to happiness rankings. You will need to register to view this data.</p>
                <div>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </div>
              </div>
            </SpotlightCard>
          </div>

          <div className="col-md-4 py-2">
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(123, 123, 123, 0.69)">
              <img src={cardThree} className="card-img-top pb-2" alt="Trend and Report - feet in front of a happy face" />
              <div className="card-body">
                <h5 className="card-title py-2">Existing User</h5>
                <p className="card-text">Already a user, login here to explore the key factors that contribute to these happiness rankings, along with a chart for deeper dive.</p>
                <div>
                <Link to="/login" className="btn btn-primary ms-2">Login</Link>
              </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
