import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import Credential from './components/Credential';
import AppHeader from './components/AppHeader';
import { Credential as CredentialType } from '.././types';

function App(): JSX.Element {
  const [credentials, setCredentials] = useState<CredentialType[]>([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/credentials')
      .then((response) => response.json())
      .then((credentials) => setCredentials(credentials));
  }, []);
  console.log(setCredentials);

  const credentialElements = credentials.map((credential) => (
    <Credential key={credential.service} credential={credential} />
  ));

  return (
    <div className={styles.App}>
      <AppHeader imageSrc="" title="SECME" />

      <main>
        <ul>{credentialElements}</ul>
      </main>
    </div>
  );
}

export default App;
