import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

const quizzes = {
  [crypto.randomUUID()]: {
    question: "Qui est l'inventeur du JavaScript ?",
    answers: [
      {
        content: "Brendan Eich",
        isValid: true,
      },
      {
        content: "Douglas Crockford",
        isValid: false,
      },
      {
        content: "Tim Berners-Lee",
        isValid: false,
      },
    ],
  },
  [crypto.randomUUID()]: {
    question: "Quelle entreprise a créé le langage JavaScript ?",
    answers: [
      {
        content: "Netscape",
        isValid: true,
      },
      {
        content: "Microsoft",
        isValid: false,
      },
      {
        content: "Google",
        isValid: false,
      },
    ],
  },
  [crypto.randomUUID()]: {
    question:
      "Dans quelle année le JavaScript a-t-il été officiellement publié ?",
    answers: [
      {
        content: "1995",
        isValid: true,
      },
      {
        content: "2000",
        isValid: false,
      },
      {
        content: "1989",
        isValid: false,
      },
    ],
  },
};

const rooms = {};
const players = {};

const QUIZ_DURATION = 20_000; // 20 seconds

function getRandomQuizId(idToIgnore = null) {
  const quizIds = Object.keys(quizzes).filter((id) => id !== idToIgnore);
  if (quizIds === 0) {
    throw new Error("No quizzes available");
  }

  const index = Math.floor(Math.random() * quizIds.length);
  return quizIds[index];
}

function updateRoomInfo(id) {
  const room = rooms[id];

  if (!room) return;

  const elapsed = Date.now() - room.start;

  if (elapsed >= QUIZ_DURATION) {
    room.quizId = getRandomQuizId(room.quizId);
    room.quiz = quizzes[room.quizId];
    room.start = Date.now();
  }

  const playerCount = room.players.size;
  const data = { elapsed, playerCount, quiz: room.quiz };
  for (const player of room.players) {
    player.emit("roomInfo", data);
  }
}

function removePlayerFromRoom(roomId, playerSocket) {
  const room = rooms[roomId];

  if (!room) {
    return;
  }

  room.players.delete(playerSocket);
  delete players[playerSocket.id];

  if (room.players.size === 0) {
    clearInterval(room.interval);
    delete rooms[roomId];
  }
}

io.on("connection", (socket) => {
  socket.on("createForm", (data) => {
    const quizId = crypto.randomUUID();
    quizzes[quizId] = data;
  });

  socket.emit("roomList", Object.keys(rooms));

  socket.on("joinRoom", ({ id }) => {
    if (!rooms[id]) {
      const quizId = getRandomQuizId();
      rooms[id] = {
        players: new Set(),
        quiz: quizzes[quizId],
        start: Date.now(),
      };
    }

    const room = rooms[id];
    players[socket.id] = id;

    if (!room.players.has(socket)) {
      room.players.add(socket);
    }

    if (!room.interval) {
      room.interval = setInterval(() => {
        updateRoomInfo(id);
      }, 1_000);
    }
  });

  socket.on("leaveRoom", ({ id }) => {
    removePlayerFromRoom(id, socket);
  });

  socket.on("disconnect", () => {
    const playerRoomId = players[socket.id];

    if (!playerRoomId) {
      return;
    }

    removePlayerFromRoom(playerRoomId, socket);
  });

  socket.on("submitAnswers", (data) => {
    const room = rooms[data.id];

    if (!room) return;
    const correctAnswers = room.quiz.answers
      .filter(({ isValid }) => isValid)
      .map(({ content }) => content);

    const isValid =
      data.answers.length === correctAnswers.length &&
      data.answers.every((element, index) => element === correctAnswers[index]);

    socket.emit("feedback", { isValid, answers: correctAnswers });
  });
});

io.listen(3000);
