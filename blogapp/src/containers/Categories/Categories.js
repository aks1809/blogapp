import React from "react";
import { Link } from "react-router-dom";
import image1 from "./images/1.jpg";
import image2 from "./images/2.jpg";
import image3 from "./images/3.jpg";
import image4 from "./images/4.jpg";
import image5 from "./images/5.jpg";
import "./Categories.css";

const Categories = () => {
  return (
    <div>
      <div
        className="jumbotron rounded-0 bg-dark banner m-0 p-0 shadow-lg"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <div className="overlay">
          <h1>Blog App</h1>
        </div>
      </div>
      <div className="jumbotron mb-0 bg-white">
        <h2 className="category-h1">Choose Category:</h2>
        <div className="row">
          <div className="col-sm-6 col-lg-4 d-flex justify-content-center align-items-center mb-5">
            <div className="card shadow" style={{ width: "18rem" }}>
              <img className="card-img-top" src={image2} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Economics</h5>
                <p className="card-text">
                  Read latest blogs in economics and finance.
                </p>
                <Link to="/economics" className="btn btn-primary">
                  View All
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4 d-flex justify-content-center align-items-center mb-5">
            <div className="card shadow" style={{ width: "18rem" }}>
              <img className="card-img-top" src={image3} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Technology</h5>
                <p className="card-text">
                  Read latest blogs about advancements in technology.
                </p>
                <Link to="/technology" className="btn btn-primary">
                  View All
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4 d-flex justify-content-center align-items-center mb-5">
            <div className="card shadow" style={{ width: "18rem" }}>
              <img className="card-img-top" src={image4} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Sports</h5>
                <p className="card-text">
                  Read latest blogs about domestic and international sports.
                </p>
                <Link to="/sports" className="btn btn-primary">
                  View All
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4 d-flex justify-content-center align-items-center mb-5">
            <div className="card shadow" style={{ width: "18rem" }}>
              <img className="card-img-top" src={image5} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Science</h5>
                <p className="card-text">
                  Read latest blogs about daily advancements in science.
                </p>
                <Link to="/science" className="btn btn-primary">
                  View All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
