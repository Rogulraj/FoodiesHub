import AppProvider from "@providers/AppProvider";
import "./App.css";
import AppRoute from "@routes/AppRoute";
import { ValidateEnv } from "@utils/envValidator";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
ValidateEnv();

function App() {
  return (
    <AppProvider>
      <AppRoute />
    </AppProvider>
  );
}

export default App;
