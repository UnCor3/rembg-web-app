import CriticalErrorBoundary from "./components/error-boundaries/critical-error-boundary";
import Content from "./components/content/content.component";
import Navbar from "./components/navbar/navbar.component";
import { Provider } from "react-redux";
import ToastifyContainer from "./lib/toastify";
import store from "./store/store";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import _404 from "./pages/404";

const App = () => (
  <CriticalErrorBoundary>
    <Provider store={store}>
      <Navbar />
      <ToastifyContainer />
      <Content>
        <Routes>
          <Route path="/" index element={<Index />} />
          <Route path="*" element={<_404 />} />
        </Routes>
      </Content>
    </Provider>
  </CriticalErrorBoundary>
);

export default App;
