import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import pacienteRoutes from "./routes/paciente.routes";
import profissionalRoutes from "./routes/profissional.routes";
import organizacaoRoutes from "./routes/organizacao.routes";
import consultaRoutes from "./routes/consulta.routes";
import attendanceRoutes from "./routes/attendance.routes";
import agendaRoutes from "./routes/agenda.routes";
import logAdminRoutes from "./routes/logadmin.routes";

const app = express();

app.use(cors());
app.use(express.json());

// rotas da API
app.use("/api/users", userRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/profissionais", profissionalRoutes);
app.use("/api/organizacoes", organizacaoRoutes);
app.use("/api/consultas", consultaRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/agenda", agendaRoutes);
app.use("/api/logadmin", logAdminRoutes);

// servidor
app.listen(4000, () => {
  console.log("API rodando na porta 4000");
});
