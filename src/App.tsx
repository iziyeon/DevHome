import Router from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext";
import AuthObserver from "./contexts/AuthObserver";

function App() {
  return (
    <AuthProvider>
      <AuthObserver />
      <Router />
    </AuthProvider>
  );
}

export default App;
