import app from "./app";
import { backendPort } from "./common/constants";

app.listen(backendPort, () => {
  console.log(`Server is running at http://localhost:${backendPort}`);
});
