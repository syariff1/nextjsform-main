import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "~/server/db";
const handleError = (error: Error, message: string) => {
  // Log the error for debugging
  console.error(error);

  // Here you can add more complex logic, like sending the error to an error-tracking service

  throw new Error(`${message}: ${error.message}`);
};

export const formRouter = createTRPCRouter({
  formslist: publicProcedure.query(async () => {
    const forms = await db.forms.findMany();
    return forms;
  }),
  formsCreate: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const newForm = await db.forms.create({
          data: {
            title: input.title,
            description: input.description,
          },
        });
        return newForm;
      } catch (err) {
        handleError(err as Error, "Failed to create form");
      }
    }),
  formsUpdate: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;

        const updatedForm = await db.forms.update({
          where: { id: input.id },
          data: {
            title: input.title,
            description: input.description,
          },
        });
        return updatedForm;
      } catch (err) {
        handleError(err as Error, "Failed to update form");
      }
    }),
  formsDelete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;

        const deletedForm = await db.forms.delete({
          where: { id: input.id },
        });
        return deletedForm;
      } catch (err) {
        handleError(err as Error, "Failed to delete form");
      }
    }),
});
