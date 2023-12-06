import { useContext } from "react";
import Route from "./router/Route";
import Loading from "./utils/Loading";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
  return (
    <>
      <Route />
    </>
  );
}

export default App;
