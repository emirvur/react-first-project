import React from 'react';
import { getUser, removeUserSession } from '../utils/common';

function Cikis(props) {
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    localStorage.removeItem("user");
    props.history.push('/giris');
  }

  return (
    <div>
      Merhabalar {user}!<br /><br />
      <input type="button" onClick={handleLogout} value="Çıkış" />
    </div>
  );
}

export default Cikis;