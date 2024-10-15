import NavigationBar from "./NavigationBar";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.auth.user);

  console.log("user", user);
  return (
    <div>
      <NavigationBar name={user?.user?.name}></NavigationBar>
    </div>
  );
}

export default Home;
