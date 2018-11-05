import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export default class GeneralContact extends React.Component {
  state = {
    name: '',
    email: '',
    message: '',
    recaptcha: null,
  };

  onChange = (e) => {
    const newState = {...this.state};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  onReCaptchaChange = (value) => {
    this.setState({...this.state, recaptcha: value });
  };

  onSubmit = () => {
    // if ReCaptcha is valid,
    // call graphQL mutation triggering email here
  };

  render() {
    return (
      <div>
        <h2>Contact Us</h2>
        <form className="resource-suggest"
              onSubmit={this.onSubmit}
        >
          <label htmlFor="name">Your Name *</label>
          <input type="text"
                 id="name"
                 name="name"
                 className="u-full-width"
                 tabIndex="1"
                 required
                 onChange={this.onChange}
          />
          <label htmlFor="email">Your Email *</label>
          <input type="email"
                 id="email"
                 name="email"
                 className="u-full-width"
                 tabIndex="2"
                 required
                 onChange={this.onChange}
          />
          <label htmlFor="message">Message</label>
          <textarea id="message"
                    name="message"
                    className="u-full-width"
                    tabIndex="7"
                    cols="40"
                    rows="100"
                    onChange={this.onChange}
          />
          <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                     onChange={this.onReCaptchaChange}
                     className="g-recaptcha"
                     tabIndex="8"
          />
          <input className="button-primary"
                 type="submit"
                 value="Submit"
                 tabIndex="9"
          />
        </form>
      </div>
    )
  }
};

