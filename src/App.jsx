import { WalletContextProvider } from "./context/WalletContext";
import { Home } from "./pages/Home";

import "./App.css";

export default function App() {
  return (
    <WalletContextProvider>
      <Home />
    </WalletContextProvider>
  );
}
