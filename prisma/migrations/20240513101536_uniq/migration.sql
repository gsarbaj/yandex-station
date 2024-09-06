/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Costumer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Costumer_phone_number_key" ON "Costumer"("phone_number");
