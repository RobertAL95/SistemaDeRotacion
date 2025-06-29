import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server"; // importa tu app Express

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Auth API", () => {
  let supervisorToken: string;
  let invitationToken: string;
  const supervisor = { username: "supervisor@test.com", password: "123456" };
  const entregador = { username: "entregador@test.com", password: "123456" };

  it("debería registrar un supervisor", async () => {
    const res = await request(app)
      .post("/api/login/register")
      .send(supervisor)
      .expect(201);
    expect(res.body.user.username).toBe(supervisor.username);
  });

  it("debería loguear al supervisor", async () => {
    const res = await request(app)
      .post("/api/login/login")
      .send(supervisor)
      .expect(200);
    supervisorToken = res.body.token;
    expect(supervisorToken).toBeDefined();
  });

  it("debería enviar invitación a entregador", async () => {
    const res = await request(app)
      .post("/api/invitations/send")
      .set("Authorization", `Bearer ${supervisorToken}`)
      .send({ username: entregador.username })
      .expect(200);
    // simula extracción del token de la URL generada en la invitación:
    const match = res.body.link.match(/token=([^"]+)/);
    invitationToken = match ? match[1] : "";
    expect(invitationToken).toBeDefined();
  });

  it("debería aceptar invitación y registrar entregador", async () => {
    const res = await request(app)
      .post("/api/invitations/accept")
      .send({ token: invitationToken, password: entregador.password })
      .expect(201);
    expect(res.body.message).toMatch(/Entregador registrado/);
  });

  it("debería loguear al entregador", async () => {
    const res = await request(app)
      .post("/api/login/login")
      .send(entregador)
      .expect(200);
    expect(res.body.token).toBeDefined();
  });
});
