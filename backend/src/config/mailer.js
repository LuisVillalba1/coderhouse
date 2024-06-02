import nodemailer from "nodemailer";
import { dotenvValues } from "../config.js";

export const mailer = nodemailer.createTransport({
    service : "gmail",
    port : 587,
    auth : {
        user : dotenvValues.Email,
        pass : dotenvValues.EmailPass
    }
});

