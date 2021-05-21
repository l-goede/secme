import React from 'react';
import styles from './App.module.css';
import Credential from './components/Credential';
import AppHeader from './components/AppHeader';

function App(): JSX.Element {
  return (
    <div className={styles.App}>
      <AppHeader
        imageSrc="https://cdn.onlinewebfonts.com/svg/img_138267.png"
        title="SECME"
      />

      <main>
        <ul>
          <Credential service="Google" />
          <Credential service="Github" />
        </ul>
      </main>
    </div>
  );
}

export default App;
