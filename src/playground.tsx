import ReactDOM from "react-dom/client";
import { ChatComponent } from "./client";
import "./client/components/styles.css";

ReactDOM.createRoot(document.querySelector("#root")!).render(<ChatComponent />);
