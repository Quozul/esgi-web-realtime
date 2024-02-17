import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

const quizzes = {};

io.on("connection", (socket) => {
  socket.on("createForm", (data) => {
    const quizId = crypto.randomUUID();
    quizzes[quizId] = data;
  });

  console.log(quizzes);

  socket.emit("quizList", quizzes);
});

io.listen(3000);
