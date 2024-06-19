import supertest from "supertest";
import { expect } from "chai";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { dotenvValues } from "../src/config.js";

await mongoose.connect(dotenvValues.MongoConnect);

const requester = supertest("http://localhost:8080");

let email = faker.internet.email();
let password = faker.internet.password();
let cookieName;
let cookieValue;
let cartID;

describe("Test de la API de session", () => {
    it("Nos registramos en la aplicacion", async () => {
        const response = await requester.post("/register").send({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: email,
            password: password,
        });
        expect(response._body.message).to.be.equal("Se ha creado el usuario correctamente");
        expect(response.status).to.be.equal(201);
    });
    it("Nos logeamos en la aplicacion", async () => {
        const response = await requester.post("/login").send({
            email: email,
            password: password,
        });
        //obtenemos la cookie generada
        let cookie = response.header["set-cookie"][0];

        cookieName = cookie.split("=")[0];
        cookieValue = cookie.split("=")[1].split(";")[0];

        expect(cookieName).to.be.equal("connect.sid");
        expect(cookieValue).to.be.ok;
        expect(response._body.message).to.be.equal("sesion exitosa");
        expect(response.status).to.be.equal(200);
    })
    it("Obtenemos el usuario actual", async () => {
        //obtenemos la informacion del usuario
        const response = await requester.get("/current").set("Cookie", [`${cookieName}=${cookieValue}`]);

        expect(response.status).to.be.equal(200);
        expect(response._body.email).to.be.equal(email);
    })
});

describe("Test de la API de products", () => {
    it("Obtenemos todos los productos", async () => {
        const response = await requester.get("/products").set("Cookie", [`${cookieName}=${cookieValue}`]);

        expect(response.status).to.be.equal(200);
        expect(response._body.docs).to.be.ok;
        expect(response._body.docs).to.be.an("array");
        expect(response._body.page).to.be.an("number");
    });
    it("Obtenemos un producto por su id", async () => {
        const response = await requester.get("/products/65e730ff5e6a31784a321fd8").set("Cookie", [`${cookieName}=${cookieValue}`]);

        expect(response.status).to.be.equal(200);
        expect(response._body._id).to.be.equal("65e730ff5e6a31784a321fd8");
        expect(response._body.stock).to.be.an("number")
    });
    it("Añadimos un nuevo producto", async () => {
        //primero debemos logearnos con el usuario administrador

        const loginRta = await requester.post("/login").send({
            email: "adminCoder@coder.com",
            password: "adminCod3r123"
        })

        //obtenemos la cookie del usuario administrados
        let cookieAdmin = loginRta.header["set-cookie"][0];

        let cookieNameAdmin = cookieAdmin.split("=")[0];
        let cookieValueAdmin = cookieAdmin.split("=")[1].split(";")[0];


        const response = await requester.post("/products").set("Cookie", [`${cookieNameAdmin}=${cookieValueAdmin}`]).send({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.uuid(),
            price: faker.number.int(),
            status: true,
            stock: faker.number.int(),
            category: faker.commerce.department(),
        });

        expect(response.status).to.be.equal(201);
        expect(response._body.message).to.be.ok;
    })
});


describe("Test para la api de cart", () => {
    it("creamos un carrito para el usuario", async () => {
        const response = await requester.post("/carts").set("Cookie", [`${cookieName}=${cookieValue}`]);

        cartID = response._body.message.split(": ")[1];

        expect(response.status).to.be.equal(201);
        expect(response._body.message).to.be.ok;
        expect(response._body.message).to.be.an("string");
    });

    it("Añadimos un producto al carrito", async () => {
        const response = await requester.post(`/carts/${cartID}/65e730ff5e6a31784a321fd8`).set("Cookie", [`${cookieName}=${cookieValue}`]);
        expect(response.status).to.be.equal(201);
        expect(response._body.message).to.be.ok;
    })

    it("Eliminamos un producto del carrito", async () => {
        const response = await requester.delete(`/carts/${cartID}/66451062fc865534507d33eb`).set("Cookie", [`${cookieName}=${cookieValue}`]);
        expect(response.status).to.be.equal(200);
        expect(response._body.message).to.be.ok;
        expect(response._body.message).to.be.equal("Se ha eliminado el producto correctamente");
    })

})
