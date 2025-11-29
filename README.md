# 🌿 Vitalis — Sistema de Gestão de Agendamentos para UBS

O **Vitalis** é uma plataforma digital criada para apoiar a rotina das **Unidades Básicas de Saúde (UBS)**, facilitando o gerenciamento de consultas e exames, reduzindo o absenteísmo e melhorando a comunicação de campanhas preventivas de saúde.

O projeto foi desenvolvido para o contexto da **gestão pública municipal**, respeitando o fluxo real das UBS:  
📌 *o paciente NÃO agenda sozinho* — todo o processo é conduzido pelo **administrador da unidade**.

---

## 🎯 Problema

As UBS enfrentam grandes dificuldades para organizar agendamentos, reduzir faltas e divulgar informações de saúde, pois o fluxo atual depende de:

- Planilhas manuais  
- Trocas de WhatsApp  
- Falta de confirmação dos pacientes  
- Perda de vagas quando há ausência  
- Comunicação limitada sobre campanhas de vacinação e prevenção  

O resultado é um serviço mais lento, alto índice de absenteísmo e menor efetividade nas ações de saúde pública.

---

## 🌿 Nossa Solução

O **Vitalis** centraliza toda a gestão da UBS em um único sistema simples e eficiente.  
O administrador importa planilhas de agendamentos, acompanha o risco de falta, visualiza condições climáticas, organiza campanhas e interage com pacientes via chatbot para confirmação de consultas.

O paciente acessa apenas um painel informativo (via Figma) para conferir consultas e campanhas, com confirmações feitas via chatbot.

---

# 🧩 Funcionalidades

## 🟥 Para Administradores (parte codada)

### ✔ Importar Planilha (Excel → Sistema)  
Importação direta da planilha usada atualmente pelas UBS, com leitura automática de:
- Paciente  
- CPF  
- Data e horário  
- UBS  
- Tipo da consulta/exame  

### ✔ Painel de Agendamentos  
Listagem completa com:
- nome do paciente  
- horário  
- UBS  
- tipo  
- status (confirmado, cancelado, falta)  
- risco de falta  
- filtros por UBS, data e tipo  

### ✔ Alterar Status  
O administrador pode marcar:
- ✔ Confirmado  
- ❌ Cancelado  
- ⚠ Faltou  

### ✔ Indicador de Risco de Falta  
Regra simples baseada em:
- histórico de faltas  
- horário  
- clima  
- perfil do paciente  

Indicadores:
- 🟢 Baixo  
- 🟡 Médio  
- 🔴 Alto  

### ✔ Integração Climática  
Consulta a API de clima para avisar quando chuva ou calor extremo aumentam o risco de absenteísmo.

### ✔ Campanhas de Saúde  
Cadastro e gerenciamento de campanhas:
- vacinação  
- campanhas sazonais (dengue, outubro rosa, etc.)

---

## 🟦 Para Pacientes (Figma — parte visual)

### ✔ Minhas Consultas  
Lista das consultas já marcadas pela UBS.

### ✔ Campanhas de Vacinação 
Informações de:
- faixa etária  
- locais de vacinação  
- campanhas ativas  

### ✔ Chatbot  
Agendamento, Confirmação e cancelamento de consultas via WhatsApp.

### ✔ Equipe
Guilherme da Rosa Silva; Iago Bussoletti; Janine Veigas Farias; Miguel Rubim Vencato e Rafaela de Mello Martins.



