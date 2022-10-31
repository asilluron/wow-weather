/**
 * Provide configuration settings
 */
 import { createContext } from "react";

 import { Config } from "../server/config";
 
 export const ConfigContext = createContext<Config | undefined>(undefined);
