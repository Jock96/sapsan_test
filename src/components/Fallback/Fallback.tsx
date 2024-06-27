import { FC } from "react";
import { Page } from "../Page";
import styles from "./Fallback.module.css";
import { Button } from "../Button";
import { Layout } from "../Layout";

export const Fallback: FC = () => {
  return (
    <Layout>
      <Page>
        <div className={styles.fallback}>
          <h1>Что-то пошло не так...</h1>
          <Button onClick={() => window.location.reload()}>
            Перезагрузить страницу
          </Button>
        </div>
      </Page>
    </Layout>
  );
};
