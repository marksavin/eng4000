import React from "react";
import "semantic-ui-css/semantic.min.css";

const ContactPhysicanCard = () => {
  return (
    <div className="container">
      <div class="ui card">
        <div class="image">
          <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
        </div>
        <div class="content">
          <div class="header">Matthew</div>
          <div class="meta">
            <span class="date">Joined in 2015</span>
          </div>
          <div class="description">
            Matthew is a musician living in Nashville.
          </div>
        </div>
        <div class="extra content">
          <a>
            <i aria-hidden="true" class="user icon"></i>22 Friends
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPhysicanCard;
