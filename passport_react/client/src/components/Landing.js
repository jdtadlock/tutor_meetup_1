import React from 'react';

export const Landing = props => {
  let header_text = props.is_register ? 'Register' : 'Log In';
  // let classes = {
  //   'some-class': props.is_register,
  //   'another-class': props.logged_in
  // }
  return (
    <div className="landing">
      <h1>Landing</h1>
      <pre>{props.is_register}</pre>
      <form className="column" onSubmit={props.authenticate}>
        <p id="error"></p>
        <h3 id="log-header">{header_text}</h3>
        <input type="email" name="email" placeholder="Email" onChange={props.handleChange} value={props.email} />
        <input type="password" name="password" placeholder="Password" onChange={props.handleChange} value={props.password} />
        {props.is_register ?
          <input type="password" name="confirm" placeholder="Confirm Password" onChange={props.handleChange} value={props.confirm} />
          : ''}
        <div className="toggle-controls row split">
          <div className="row y-center toggle-wrap log">
            <span>Login</span>
            <div className="toggle-bar" onClick={props.toggleType}>
              <button className={`switch ${props.is_register ? 'toggle' : ''}`}></button>
            </div>
            <span>Register</span>
          </div>
        </div>
        <button className="submit-btn">Submit</button>
      </form>
    </div>
  )
};