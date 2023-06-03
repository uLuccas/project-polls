const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllPolls = async (req, res) => {
  const result = await prisma.polls.findMany({ orderBy: { id: "desc" } });
  return res.json(result);
};

const createPoll = async (req, res) => {
  const { title, content, option1, option2, option3 } = req.body;
  const date = new Date().toISOString();
  const response = await prisma.polls.create({
    data: {
      title,
      content,
      option1,
      option2,
      option3,
      votes_option1: 0,
      votes_option2: 0,
      votes_option3: 0,
      created_at: date,
      updated_at: date,
    },
  });
  if (!response.id) {
    return res
      .status(500)
      .json({ error: "Houve um problema ao criar a enquete" });
  }

  return res.status(201).json(response);
};

const updateVotesPoll = async (req, res) => {
  const { id, votes_option1, votes_option2, votes_option3 } = req.body;
  const date = new Date().toISOString();
  const response = await prisma.polls.update({
    where: { id: id },
    data: {
      votes_option1,
      votes_option2,
      votes_option3,
      updated_at: date,
    },
  });
  if (!response) {
    return res
      .status(500)
      .json({ error: "Houve um problema ao votar na enquete" });
  }

  return res.status(200).json(response);
};

const updatePoll = async (req, res) => {
  const { id, title, content } = req.body;
  const date = new Date().toISOString();
  const response = await prisma.polls.update({
    where: { id: id },
    data: {
      title,
      content,
      updated_at: date,
    },
  });
  if (!response) {
    return res
      .status(500)
      .json({ error: "Houve um problema ao editar enquete!" });
  }

  return res.status(200).json(response);
};

const deletePoll = async (req, res) => {
  const { id } = req.body;

  const response = await prisma.polls.delete({
    where: { id: id },
  });

  if (!response) {
    return res
      .status(500)
      .json({ error: "Houve um problema ao deletar enquete!" });
  }

  return res.status(200).json(response);
};

module.exports = {
  getAllPolls,
  createPoll,
  updateVotesPoll,
  updatePoll,
  deletePoll,
};
