import Pages from "./pages/Pages";
import Category from "./components/Ctegory";
import { BrowserRouter, Link} from "react-router-dom";
import Search from "./components/Search";
import { Nav } from "./style/styles";
const Logo = require("./logo/logo160.jpg")

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav >
        <img src={Logo} alt="reyhan_&_shirin" />
      </Nav>
      <Search />
    <Category />
      <Pages />
      </BrowserRouter>
      </div>
  );
}
export default App;
