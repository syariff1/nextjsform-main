/*
  Warnings:

  - You are about to drop the column `createdAt` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `forms` table. All the data in the column will be lost.
  - Added the required column `difficulty_rating` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form_image` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ongoing` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updates` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workout_title` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workout_type` to the `forms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forms" DROP COLUMN "createdAt";
ALTER TABLE "forms" DROP COLUMN "description";
ALTER TABLE "forms" DROP COLUMN "title";
ALTER TABLE "forms" ADD COLUMN     "checkboxes" STRING[];
ALTER TABLE "forms" ADD COLUMN     "completion_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "forms" ADD COLUMN     "difficulty_rating" INT4 NOT NULL;
ALTER TABLE "forms" ADD COLUMN     "form_image" STRING NOT NULL;
ALTER TABLE "forms" ADD COLUMN     "ongoing" BOOL NOT NULL;
ALTER TABLE "forms" ADD COLUMN     "updates" STRING NOT NULL;
ALTER TABLE "forms" ADD COLUMN     "workout_title" STRING NOT NULL;
ALTER TABLE "forms" ADD COLUMN     "workout_type" STRING NOT NULL;
