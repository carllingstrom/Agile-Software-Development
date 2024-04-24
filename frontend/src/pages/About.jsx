import React from 'react';
import './About.css';
import logoImage from '../images/logo.png'; // Make sure this is the correct path
import Navbar from "../components/Navbar.jsx";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-section">
          <div className="about-text">
            <h2>About us:</h2>
            <p>
              This is Project Solar Savings. We are dedicated to empowering homeowners
              and businesses to create a positive impact through solar energy.<br /><br />

              In a landscape of opinions, we stand behind the importance of relying on concrete
              calculations and factual data.<br /><br />

              That is why we have developed a program that enables you to generate customized
              calculations, ensuring you can confidently make the right choice for your energy
              needs and the planet!
            </p>
          </div>
          <div className="about-logo">
            <img src={logoImage} alt="Logo" className="logo-image" />
         </div>
        </div>

        <div className="background-image">
          <div className="header">
            <h1 className="main-title">UN Goals</h1>
            <p className="subtext">Our project takes great pride in working for the UN Global Goals. Here is how we create impact!</p>
          </div>
          <div className="content">
            <div className="green-box">

              <h2>Affordable and Clean Energy</h2>
              <p>
                War, conflicts, and political instability lead to increased
                energy pricing, lack of electricity access in some parts of
                the world, and heavy reliance on non-renewable sources. The UN states
                that “To ensure access to energy for all by 2030, we must accelerate
                electrification, increase investments in renewable energy sources
                and invest in improving electricity grids”. We support this by
                making it easier to make economically feasible investments in solar energy.
              </p>

            </div>

            <div className="green-box">
            <>
          <h2>Urgent Climate <br/> Action</h2>
             <p>
  To combat the rise in global emissions, we must shift towards energy production that relies on renewable sources like solar energy, which offers a significant reduction in emissions. Solar panels are a practical alternative to non-renewable sources like coal and gas, helping to decrease our carbon footprint and support sustainable energy transitions.
</p>

              </>
            </div>

            <div className="green-box">
              <h2>Sustainable Cities and Communities</h2>
              <p>
                Incorporating solar energy into local energy systems boosts the resilience
                of cities and settlements against fluctuations in energy pricing and reduces
                their reliance on external sources. Solar panels offer a space-efficient
                means of energy generation, freeing up land for parks, leisure activities,
                and other purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
