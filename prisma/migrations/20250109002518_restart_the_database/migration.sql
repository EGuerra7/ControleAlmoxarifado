-- CreateEnum
CREATE TYPE "State" AS ENUM ('COMPLETED', 'LOAN', 'FINESHED');

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "localization" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loans" (
    "id" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'LOAN',

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan_products" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "loan_id" TEXT NOT NULL,
    "loan_quantity" INTEGER NOT NULL,
    "return_quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "loan_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "loan_products_product_id_loan_id_key" ON "loan_products"("product_id", "loan_id");

-- AddForeignKey
ALTER TABLE "loan_products" ADD CONSTRAINT "loan_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_products" ADD CONSTRAINT "loan_products_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
