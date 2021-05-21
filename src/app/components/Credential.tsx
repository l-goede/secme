import React from 'react';
import styles from './Credentials.module.css';

type CredentialProps = {
  service: string;
};

function Credential({ service }: CredentialProps): JSX.Element {
  return (
    <li className={styles.credential}>
      {service}
      <button>🔽</button>
      <button>✚</button>
      <button>❌</button>
    </li>
  );
}

export default Credential;
