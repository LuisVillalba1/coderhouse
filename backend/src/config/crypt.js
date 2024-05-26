import bcrypt from "bcrypt";
import { dotenvValues } from "../config.js";

//hasheamos una contraseña
export async function generateCrypt(value){
    const valueHash = await bcrypt.hash(value,parseInt(dotenvValues.HashValue));
    return valueHash;
}

export async function compareHashValue(value,hashValue){
    const compare = await bcrypt.compare(value,hashValue)
    return compare;
}