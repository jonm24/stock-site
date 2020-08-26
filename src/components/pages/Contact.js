import React, { useReducer, useState } from 'react';
import { TextField, Typography, makeStyles, Button } from '@material-ui/core';
import twitter from '../../assets/twitter-icon.png';
import insta from '../../assets/ig-icon.png';
import { Helmet } from 'react-helmet';

// eslint-disable-next-line no-control-regex
const emailExpression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

const formReducer = (state, action) => {
  switch (action.type) {
    case 'name': 
      return {
        name: { 
          text: action.value, 
          valid: (String(action.value).length > 0) ? true : false,
          focusedOnce: state.name.focusedOnce
        },
        email: state.email,
        msg: state.msg
      };
    case 'email':
      return {
        name: state.name,
        email: { 
          text: action.value, 
          valid: emailExpression.test(String(action.value).toLowerCase()),
          focusedOnce: state.email.focusedOnce 
        },
        msg: state.msg
      };
    case 'msg': 
      return {
        name: state.name,
        email: state.email,
        msg: {
          text: action.value,
          valid: (String(action.value).length > 0),
          focusedOnce: state.msg.focusedOnce
        }
      };
    case 'name-focus':
      return {
        name: {
          text: state.name.text,
          valid: state.name.valid,
          focusedOnce: true
        },
        email: state.email,
        msg: state.msg
      }
    case 'email-focus':
      return {
        name: state.name,
        email: { 
          text: state.email.text,
          valid: state.email.valid,
          focusedOnce: true
        },
        msg: state.msg
      }
    case 'msg-focus': 
      return {
        name: state.name,
        email: state.email,
        msg: {
          text: state.msg.text,
          valid: state.msg.valid,
          focusedOnce: true
        }
      }
    default:
      return state;
  }
};

export default function Contact() {
  const classes = useStyles();

  const [submitted, setSubmitted] = useState(false);

  const [formData, dispatch] = useReducer(formReducer, { 
      name: { text: '', valid: false, focusedOnce: false },
      email: { text: '', valid: false, focusedOnce: false }, 
      msg: { text: '', valid: false, focusedOnce: false } 
    });

  const sendEmail = (e) => {
    e.preventDefault();
    for (const elem in formData) {
      console.log(formData[elem])
      if (!formData[elem].valid) {
        alert('Missing Required Fields.');
        return;
      }
    }

    fetch('https://us-central1-finsigs-94e28.cloudfunctions.net/helloWorld', {
      method: 'POST', // or 'PUT'
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: formData.name.text, 
        email: formData.email.text, 
        text: formData.msg.text 
      }),
    }).then(res => console.log(res))
      .catch(error => alert(`Error: ${error}`));
    setSubmitted(true);
  };

  return (
    <div className="policy-container">
      <Helmet>
        <title>Contact Us</title>
        <meta 
          name="description" 
          content="Please contact us if you have any suggestions are questions to our stock market research site" 
        />
      </Helmet>
      <h1>Contact</h1>

      <div className="aux-container">
          <form onSubmit={sendEmail}>
            <div className="contact-form-col">
              <Typography className={classes.text}>Full Name</Typography>
              <TextField 
                onFocus={() => dispatch({ 'type': 'name-focus'})}
                error={formData.name.focusedOnce && !formData.name.valid}
                onChange={(e) => dispatch({ 'type': 'name', value: e.target.value})}
                className={classes.textbox} 
                label="e.g. John Smith" 
                variant="outlined"></TextField>
            
              <Typography 
                className={classes.text}>
                Email Address</Typography>
              <TextField 
                onFocus={() => dispatch({ 'type': 'email-focus'})}
                error={formData.email.focusedOnce && !formData.email.valid}
                onChange={(e) => dispatch({ 'type': 'email', value: e.target.value})}
                className={classes.textbox}
                label="e.g. example@domain.com" 
                variant="outlined"></TextField>
              
              <Typography className={classes.text}>Message</Typography>
              <TextField 
                onFocus={() => dispatch({ 'type': 'msg-focus'})}
                error={formData.msg.focusedOnce && !formData.msg.valid}
                onChange={(e) => dispatch({ 'type': 'msg', value: e.target.value})}
                className={classes.msgbox} 
                multiline rows={5} 
                label="e.g. Hey! I am..." 
                variant="outlined"></TextField>

              { submitted ? <div>email sent</div> :
              <Button 
                type="submit" 
                style={{marginTop: '10px', }} 
                variant="contained"
                color="primary">Submit</Button>
              }
            </div>
          </form>
          <div className="contact-text-col">
            <Typography className={classes.text}>
              We would love to hear your thoughts, concerns or problems with anything so we can improve!
            </Typography>
            <br></br>
            <br></br>
            <Typography>
              Follow us on social media for the latest updates:
            </Typography>
            <br></br>
            <div>
              <a
                style={{marginRight: '15px'}}
                href="https://twitter.com/finsigs"
                target="_blank" 
                rel="noopener noreferrer">
                <img src={twitter} alt="twitter icon"></img>
              </a>
              <a
                href="https://www.instagram.com/financialsignals/"
                target="_blank" 
                rel="noopener noreferrer">
                <img src={insta} alt="twitter icon"></img>
              </a>
               
            </div>
          </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  text: {
    fontSize: '1.1rem'
  },
  textbox: {
    margin: '10px 0px',
    width: '25ch'
  },
  msgbox: {
    margin: '10px 0px',
    width: '30ch'
  }
});