-- CreateTable
CREATE TABLE "polls" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "option1" TEXT NOT NULL,
    "option2" TEXT,
    "option3" TEXT,
    "votes_option1" INTEGER NOT NULL,
    "votes_option2" INTEGER NOT NULL,
    "votes_option3" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "polls_pkey" PRIMARY KEY ("id")
);
