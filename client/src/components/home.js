import NavigationBar from "./NavigationBar";
import { useLocation } from "react-router-dom";
function Home() {
  const location = useLocation();
  const { user } = location.state || {};
  console.log("user", user);
  return (
    <div>
      <NavigationBar name={user?.user?.name}></NavigationBar>
    </div>
  );
}

export default Home;
