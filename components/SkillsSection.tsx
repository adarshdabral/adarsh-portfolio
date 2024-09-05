import React from 'react';
import styles from '../styles/SkillsSection.module.css';

const SkillsSection: React.FC = () => {
  return (
    <div className={styles.skillsSection}>
      <h2>Skills</h2>
      <p>Here are some of my skills on which I have been working on for the past 2 years.</p>

      <div className={styles.skillsGrid}>

      <div className={styles.skillCategory}>
          <h3>Languages</h3>
          <div className={styles.skillIcons}>
            <img src="/C.svg" alt="C" />
            <img src="/c++.svg" alt="C++" />
            <img src="/JAVA.svg" alt="JAVA" />
            <img src="/js.svg" alt="JavaScript" />
            <img src="/PYTHON.svg" alt="Python" />
          </div>
        </div>

        <div className={styles.skillCategory}>
          <h3>Frontend</h3>
          <div className={styles.skillIcons}>
            <img src="/next.svg" alt="Next Js" />
            <img src="/HTML.svg" alt="HTML" />
            <img src="/CSS.svg" alt="CSS" />
            <img src="/js.svg" alt="JavaScript" />
            <img src="/TWS.svg" alt="Tailwind CSS" />
          </div>
        </div>

        <div className={styles.skillCategory}>
          <h3>Backend</h3>
          <div className={styles.skillIcons}>
            <img src="/node.svg" alt="Node Js" />
            <img src="/Ex.svg" alt="Express Js" />
            <img src="/PYTHON.svg" alt="Python" />
            <img src="/mongo.svg" alt="MongoDB" />
          </div>
        </div>
        <div className={styles.skillCategory}>
          <h3>Data Analytics</h3>
          <div className={styles.skillIcons}>
            <img src="/numpy.svg" alt="Numpy" />
            <img src="/pandas.svg" alt="Pandas" />
            <img src="/mat.svg" alt="Matplotlib" />
          </div>
        </div>
        <div className={styles.skillCategory}>
          <h3>Others</h3>
          <div className={styles.skillIcons}>
            <img src="/2logo.svg" alt="Git" />
            <img src="/git.svg" alt="GitHub" />
            <img src="/VS.svg" alt="VS Code" />
            <img src="/2logo.svg" alt="VS Code" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
