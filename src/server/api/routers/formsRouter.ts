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
      workout_title: z.string(),
      completion_date: z.date(), 
      workout_type: z.string(),
      checkboxes: z.array(z.string()), 
      updates: z.string(),
      difficulty_rating: z.number(), 
      ongoing: z.boolean(), 
      form_image: z.string(),
    }),
  )
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const newForm = await db.forms.create({
          data: {
            workout_title: input.workout_title,
            completion_date: input.completion_date,
            workout_type: input.workout_type,
            checkboxes: input.checkboxes,  // Corrected assignment
            updates: input.updates,
            difficulty_rating: input.difficulty_rating,
            ongoing: input.ongoing,
            form_image: input.form_image,
  
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
        workout_title: z.string().optional(),
      completion_date: z.date().optional(), 
      workout_type: z.string().optional(),
      checkboxes: z.array(z.string()).optional(), 
      updates: z.string().optional(),
      difficulty_rating: z.number().optional(), 
      ongoing: z.boolean().optional(), 
      form_image: z.string().optional(),
      }),
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;

        const updatedForm = await db.forms.update({
          where: { id: input.id },
          data: {
            workout_title: input.workout_title,
            completion_date: input.completion_date,
            workout_type: input.workout_type,
            checkboxes: input.checkboxes,  // Corrected assignment
            updates: input.updates,
            difficulty_rating: input.difficulty_rating,
            ongoing: input.ongoing,
            form_image: input.form_image,
  
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
