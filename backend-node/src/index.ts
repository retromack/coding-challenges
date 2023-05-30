import "dotenv/config";
import { PrismaClient, Prisma } from "@prisma/client";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { pointDelete, pointPost } from "./validators";
import { fetchForecast } from "./helpers";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.post(`/api/points`, pointPost, async (req, res) => {
  const { latitude, longitude, name } = req.body;

  try {
    const result = await prisma.point.create({
      data: { latitude, longitude, name },
    });
    res.json(result);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.json({
        code: e?.code ?? 500,
        message: e?.meta?.cause ?? "UNKNOWN ERROR",
      });
    }
    throw e;
  }
});

app.get(`/api/points`, async (req, res) => {
  const points = await prisma.point.findMany();
  res.json(points);
});

app.delete(`/api/points/:id`, pointDelete, async (req, res) => {
  const { id } = req.params;

  try {
    const point = await prisma.point.delete({
      where: {
        id: Number(id),
      },
    });

    res.json(point);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.json({
        code: e?.code ?? 500,
        message: e?.meta?.cause ?? "UNKNOWN ERROR",
      });
    }
    throw e;
  }
});

app.get(`/api/forecasts`, async (req, res) => {
  try {
    const points = await prisma.point.findMany();

    const forecasts = await Promise.all(
      points.map(async (point) => {
        const forecast = await fetchForecast(point.latitude, point.longitude);
        return {
          pointId: point.id,
          forecast,
        };
      })
    );

    res.json(forecasts);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.json({
        code: e?.code ?? 500,
        message: e?.meta?.cause ?? "UNKNOWN ERROR",
      });
    }
    throw e;
  }
});

const server = app.listen(3000, () => console.log(`🚀 Server ready at: http://localhost:3000`));
