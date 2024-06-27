import { FC } from "react";
import { Fallback, Layout } from "../components";
import { MediaContextProvider } from "../contexts";
import { SearchPage } from "../pages";
import { ErrorBoundary } from "react-error-boundary";

export const App: FC = () => (
  <ErrorBoundary fallback={<Fallback />}>
    <MediaContextProvider>
      <Layout>
        <SearchPage />
      </Layout>
    </MediaContextProvider>
  </ErrorBoundary>
);
