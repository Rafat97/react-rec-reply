import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { RecodePlayIdContextProvider } from "./module/contex/RecodePlayIdContext";

export default function Root() {
  return (
    <>
      <RecodePlayIdContextProvider>
        {/* all the other elements */}
        <div id="detail">
          <Outlet />
        </div>
      </RecodePlayIdContextProvider>
    </>
  );
}
