import styles from "./Footer.module.css";

const EMAIL = "cliffgoslinginc@gmail.com";

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <a href={`mailto: ${EMAIL}`} className={styles.contactus}>
        Contact Us
      </a>
      <div className={styles.copyright}>
        {`Copyright © ${new Date().getFullYear()} Game Noir`}
      </div>
    </div>
  );
};

export default Footer;
