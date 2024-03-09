'use client';
import styles from './page.module.css'
import WizardDrugs from './wizards/drug-wizard/drug-wizard'

export default function Home() {

  return (
    <main className={styles.main}>
      <WizardDrugs/>
    </main>
  )
}
