import "../assets/styles/err.css";
import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="err_page_c">
      <div>
        <h1>OOPS ... Page Not Found !</h1>
        <p class="zoom-area"></p>
        <section class="error-container">
          <span class="four">
            {/* <span class="screen-reader-text">4</span> */}
          </span>
          <span class="zero">
            {/* <span class="screen-reader-text">0</span> */}
          </span>
          <span class="four">
            {/* <span class="screen-reader-text">4</span> */}
          </span>
        </section>
        <div class="link-container">
          <NavLink to="/">
            <a target="_blank" class="more-link">
              Visit home
            </a>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
