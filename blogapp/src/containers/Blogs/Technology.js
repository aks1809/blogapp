import React, { useEffect } from "react";
import tech from "./images/tech.jpg";
import actions from "../../redux/blogs/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const { fetchBlogsStart } = actions;

const Technology = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.Blogs);
  useEffect(() => {
    dispatch(fetchBlogsStart(2));
  }, []);

  return (
    <div>
      {!blogs ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <div>
          <div
            className="jumbotron rounded-0 bg-dark banner m-0 p-0 shadow-lg"
            style={{ backgroundImage: `url(${tech})` }}
          >
            <div className="overlay">
              <h1>Technology Blogs</h1>
            </div>
          </div>
          <div className="jumbotron mb-0 d-flex justify-content-center">
            {blogs.map((blog, index) => {
              return (
                <div
                  className="card mb-3"
                  style={{ maxWidth: "540px" }}
                  key={index}
                >
                  <div className="row g-0">
                    <div className="col-md-4" style={{ display: "flex" }}>
                      <img
                        src={blog.image}
                        alt="blog image"
                        style={{ width: "inherit" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">{blog.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Technology;
