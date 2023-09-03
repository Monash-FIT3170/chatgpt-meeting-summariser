import { useEffect } from 'react';
import styles from '../Account.module.css';
import { Google } from '@mui/icons-material'; // Import the Google icon from Material-UI

var config = require('../../../config.json');
const port = config.port || 5000;
const client_id = config.web.client_id;

var YOUR_CLIENT_ID = client_id;
var YOUR_REDIRECT_URI = 'http://localhost:3000';

// If there's an access token, try an API request.
// Otherwise, start OAuth 2.0 flow.
function trySampleRequest() {
    var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
    if (params && params['access_token']) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET',
            'https://www.googleapis.com/drive/v3/about?fields=user&' +
            'access_token=' + params['access_token']);
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.response);
            } else if (xhr.readyState === 4 && xhr.status === 401) {
                // Token invalid, so prompt for user permission.
                oauth2SignIn();
            }
        };
        xhr.send(null);
    } else {
        oauth2SignIn();
    }
}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauth2SignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create element to open OAuth 2.0 endpoint in a new window.
    var form = document.createElement('form');
    form.setAttribute('method', 'POST'); // Send as a POST request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to the OAuth 2.0 endpoint.
    var params = {
      client_id: YOUR_CLIENT_ID,
      redirect_uri: YOUR_REDIRECT_URI,
      scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
      state: 'try_sample_request',
      include_granted_scopes: 'true',
      response_type: 'token',
    };
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to the page and submit it to open the OAuth 2.0 endpoint.
    document.head.appendChild(form);
    form.submit();
  }


function GoogleLoginComponent() {
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
    };

    const onFailure = (res) => {
        console.log('[Login Failed] res:', res);
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: client_id,
            callback: onSuccess,
        });
    }, []);

    return (
        <div className={styles.customGoogleButton} onClick={trySampleRequest}>
            <Google />
        </div>
    );
}

export default GoogleLoginComponent;
