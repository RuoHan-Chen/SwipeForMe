import React from "react";
import "../styles/landing.css";
import instagramLogo from "../assets/ins-logo.svg";

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="eclipse"></div>
          <div className="nebula"></div>
          <div className="texture"></div>
        </div>
        <div className="hero-content">
          <h1>Make Every Meal Count</h1>
          <p>
            Swipe4Me is a peer-to-peer platform designed to help students make
            the most of their unused meal swipes. Whether you have extra swipes
            to share or you’re looking for a convenient dining option, Swipe4Me
            connects you with fellow students to exchange meal swipes
            effortlessly.
          </p>
          <div className="hero-buttons">
            <a href="/login" className="btn btn-primary">
              Create an Account
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section">
        <h2>Why Choose Swipe4Me?</h2>
        <p>
          Swipe smarter, connect better, and trust more—designed just for
          Vanderbilt students.
        </p>
        <div className="feature-box-container">
          {/* Feature 1 */}
          <div className="feature-box">
            <i className="icon-lightning"></i>
            <h3>Easy to Use</h3>
            <p>
              Post your unused swipes, browse listings, and schedule meet-ups
              with ease. Swipe4Me keeps it simple for busy students.
            </p>
            <a href="/learn-more" className="btn btn-primary">
              Learn More
            </a>
          </div>

          {/* Feature 2 */}
          <div className="feature-box">
            <i className="icon-rate"></i>
            <h3>Rate & Review for Trust</h3>
            <p>
              Our mutual rating system ensures every interaction is honest and
              reliable. Rate users after exchanges to build a trustworthy
              community.
            </p>
            <a href="/trust" className="btn btn-primary">
              Learn More
            </a>
          </div>

          {/* Feature 3 */}
          <div className="feature-box">
            <i className="icon-design"></i>
            <h3>Feel Our Design</h3>
            <p>
              Samples will show you the feeling of how to play around using the
              components in the website building process.
            </p>
            <a href="/design" className="btn btn-primary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className="join-movement-section">
        <div className="join-movement-content">
          <h3>SWIPE4ME</h3>
          <h2>Join the Movement!</h2>
          <p>
            Our goal is to promote sustainability and build community by
            reducing waste and fostering resource-sharing on campus. Join us
            today to connect, share, and make a difference—one meal at a time!
          </p>
          <div className="instagram-button-container">
            <a
              href="https://instagram.com/swipe4me"
              className="instagram-button"
            >
              Follow Us On Instagram!
            </a>
            <img
              src={instagramLogo}
              alt="Instagram Icon"
              className="instagram-icon"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
