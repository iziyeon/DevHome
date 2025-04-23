// src/App.tsx

import AuthObserver from "./contexts/AuthObserver";
import Router from "./routes/Router";
import { useUserStore } from "./stores/useUserStore";

export default function App() {
  const isLoading = useUserStore((state) => state.isLoading);

  return (
    <>
      <AuthObserver />
      {!isLoading && <Router />}
    </>
  );
}
