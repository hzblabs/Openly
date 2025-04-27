import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateMessage from "./pages/CreateMessage";
import LinkGenerated from "./pages/LinkGenerated";
import ViewMessage from "./pages/ViewMessage";
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateMessage />} />
        <Route path="/link-generated/:slug" element={<LinkGenerated />} />
        <Route path="/view/:slug" element={<ViewMessage />} />
        <Route path="/chat/:slug" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
