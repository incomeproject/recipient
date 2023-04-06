import app from "./app";
import { AppDataSource } from "./data-source";
import { env } from "./common/constants";

AppDataSource.initialize()
  .then(async () => {
    app.listen(env.BACKEND_PORT, () => {
      console.log(`Server is running at http://localhost:${env.BACKEND_PORT}`);
    });
  })
  .catch((error) => console.log(error));
