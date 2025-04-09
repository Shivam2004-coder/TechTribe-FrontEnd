import Body from "./Components/Body";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import appStore from "./utils/ReduxStore/appStore";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Toaster richColors />
        <Body />
      </BrowserRouter>
    </Provider>
  );
}

export default App;