import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense>
      <ErrorBoundary FallbackComponent={() => <>Error - 404</>}>
        <HelmetProvider>{children}</HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AppProvider;
