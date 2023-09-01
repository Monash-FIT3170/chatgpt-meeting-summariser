import { useEffect } from 'react';
import { GoogleLogin } from '@leecheuk/react-google-login';
import styles from './Account.module.css';
import Google from '@mui/icons-material/Google';
var config = require('../../config.json');
const port = config.port || 5000;
const client_id = config.web.client_id;

function GoogleLoginComponent() {
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
  };

  const onFailure = (res) => {
    console.log('[Login Failed] res:', res);
  };

  useEffect(() => {
    /* global google */
    const renderGoogleButton = () => {
      google.accounts.id.initialize({
        client_id: client_id,
        callback: onSuccess,
      });
      google.accounts.id.renderButton(document.getElementById('g_id_onload'), {
        type: 'icon',
        shape: 'circle',
        theme: '',
        onsuccess: onSuccess,
        onfailure: onFailure,
        size: 'medium'
      });
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = renderGoogleButton;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="g_id_onload" data-client_id={client_id} data-callback={onSuccess} className={styles.g_id_signin} />
    </div>
  );
}

export default GoogleLoginComponent;
