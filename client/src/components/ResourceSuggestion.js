import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export default class ResourceSuggestion extends React.Component {
  state = {
    name: '',
    email: '',
    composer: '',
    works: '',
    link: '',
    location: '',
    comments: '',
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
        <h2>Suggest a Resource</h2>
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
          <label htmlFor="composer">Composer(s) Concerned</label>
          <input type="text"
                 id="composer"
                 name="composer"
                 className="u-full-width"
                 tabIndex="3"
                 onChange={this.onChange}
          />
          <label htmlFor="works">Major Work(s) and/or Film(s) Concerned</label>
          <input type="text"
                 id="works"
                 name="works"
                 className="u-full-width"
                 tabIndex="4"
                 onChange={this.onChange}
          />
          <label htmlFor="link">Link to Resource</label>
          <input type="url"
                 id="link"
                 name="link"
                 className="u-full-width"
                 tabIndex="5"
                 onChange={this.onChange}
          />
          <label htmlFor="location">
            Location (name of library, repository, database...)
          </label>
          <input type="text"
                 id="location"
                 name="location"
                 className="u-full-width"
                 tabIndex="6"
                 onChange={this.onChange}
          />
          <label htmlFor="comments">Comments</label>
          <textarea id="comments"
                    name="comments"
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

