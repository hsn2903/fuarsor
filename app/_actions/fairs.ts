/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";
import { renderError } from "@/lib/error-handling";
import { revalidatePath } from "next/cache";
import { FairFilters } from "@/lib/types";

// Get all fairs
export const getAllFairs = async () => {
  const fairs = await prisma.fair.findMany();

  return fairs;
};

// Get fair by slug
export const getFairBySlug = async (slug: string) => {
  const fair = await prisma.fair.findMany({ where: { slug: slug } });

  return fair;
};

// Get fair by id
export const getFairById = async (slug: string) => {
  const fair = await prisma.fair.findMany({ where: { slug: slug } });

  return fair;
};

// Get featured fairs
export const getFeaturedFairs = async () => {
  const fairs = await prisma.fair.findMany({
    where: { isFeatured: true },
  });

  return fairs;
};

export const getGuaranteedDepartureTours = async () => {
  const fairs = await prisma.fair.findMany({
    where: { isDefiniteDeparture: true },
  });
  return fairs;
};

export const deleteFair = async (prevState: unknown, formData: FormData) => {
  const id = formData.get("id") as string;

  try {
    await prisma.fair.delete({ where: { id: id } });

    revalidatePath("/dashboard/fairs");
    return { message: "Fuar silindi." };
  } catch (error) {
    return renderError(error);
  }
};

// Get fairs with params
interface GetFairsParams {
  page?: number;
  limit?: number;
  filters?: FairFilters;
}
export async function getFairsWithParams({
  page = 1,
  limit = 12,
  filters = {},
}: GetFairsParams) {
  const offset = (page - 1) * limit;

  // Construct where clause dynamically
  const where: any = {};
  if (filters.name) {
    where.name = {
      contains: filters.name,
      mode: "insensitive",
    };
  }
  if (filters.category) {
    where.category = filters.category;
  }
  if (filters.type) {
    where.type = filters.type;
  }

  // Fetch fairs with pagination
  const [fairs, total] = await Promise.all([
    prisma.fair.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { startDate: "asc" },
    }),
    prisma.fair.count({ where }),
  ]);

  // Fetch unique categories and types
  const [categories, fairTypes] = await Promise.all([
    prisma.fair.findMany({
      select: { category: true },
      distinct: ["category"],
    }),
    prisma.fair.findMany({
      select: { type: true },
      distinct: ["type"],
    }),
  ]);

  return {
    fairs,
    total,
    categories: categories.map((c) => c.category),
    fairTypes: fairTypes.map((t) => t.type),
  };
}
