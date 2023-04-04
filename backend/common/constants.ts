import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
dotenv.config({ path: "../.secrets.env" });

export const backendPort = process.env.BACKEND_PORT;
export const frontendPort = process.env.FRONTEND_PORT;

export const supertokensURI = process.env.SUPERTOKENS_URI || "";
export const supertokensAPIKey = process.env.SUPERTOKENS_API_KEY || "";
