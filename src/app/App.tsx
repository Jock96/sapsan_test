import { FC } from "react";
import { Layout } from "../components";
import { MediaContextProvider } from "../contexts";
import { SearchPage } from "../pages";

export const App: FC = () => (
  <MediaContextProvider>
    <Layout>
      <SearchPage />
    </Layout>
  </MediaContextProvider>
);
