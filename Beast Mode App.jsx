import { useState, useEffect } from "react";

// ── DADOS DO TREINO ─────────────────────────────────────────────────────────

const semana = [
  {
    dia: "SEG", periodo: "MANHÃ", cor: "#FF6B35", emoji: "💪",
    foco: "PEITO + TRÍCEPS",
    blocos: [
      { titulo: "🔥 ATIVAÇÃO — 5 min", tipo: "warmup", exercicios: [
        { nome: "Esteira (aquecimento)", series: "1x", reps: "5 min", descanso: "—", equip: "Cardio", dica: "Caminhada rápida pra aquecer as articulações. Postura ereta!", busca: "treadmill walking gym cardio" },
      ]},
      { titulo: "⚡ CIRCUITO FORÇA — 3 rounds", tipo: "main", nota: "Faça todos em sequência, depois 60s de descanso.", exercicios: [
        { nome: "Supino na Máquina",               series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Costas coladas. Empurre para longe. Expire na subida.", busca: "chest press machine gym exercise" },
        { nome: "Crucifixo na Máquina (Peck Deck)", series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Abre os braços devagar (3 seg). Aperte o peito no final.", busca: "pec deck fly machine gym chest" },
        { nome: "Supino Inclinado na Máquina",      series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Ângulo inclinado = parte superior do peito. Core firme!", busca: "incline chest press machine gym" },
        { nome: "Tríceps na Máquina",               series: "3x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Cotovelos fixos. Só o antebraço se move. Devagar na volta.", busca: "tricep machine gym exercise" },
        { nome: "Tríceps Corda no Cabo",            series: "3x", reps: "15 reps", descanso: "60s após circuito", equip: "Cabo", dica: "Separa a corda no final. Cotovelos no corpo!", busca: "tricep rope pushdown cable gym" },
      ]},
      { titulo: "🏁 FINALIZAÇÃO", tipo: "finisher", exercicios: [
        { nome: "Abdominal na Máquina", series: "3x", reps: "15 reps", descanso: "30s", equip: "Máquina", dica: "Segura 1 segundo na contração. Respira!", busca: "ab crunch machine gym exercise" },
        { nome: "Bike Ergométrica",     series: "1x", reps: "5 min",   descanso: "—",  equip: "Cardio", dica: "Pedala no seu ritmo. Dopamina garantida! 🎶", busca: "stationary bike gym cardio" },
      ]},
    ],
  },
  {
    dia: "SEG", periodo: "NOITE", cor: "#4ECDC4", emoji: "🏋️",
    foco: "COSTAS + BÍCEPS",
    blocos: [
      { titulo: "🔥 ATIVAÇÃO — 5 min", tipo: "warmup", exercicios: [
        { nome: "Esteira (aquecimento)", series: "1x", reps: "5 min", descanso: "—", equip: "Cardio", dica: "Caminhada leve. Ativa a circulação antes de puxar peso.", busca: "treadmill walking gym cardio" },
      ]},
      { titulo: "⚡ CIRCUITO FORÇA — 3 rounds", tipo: "main", nota: "Sequência completa, depois 60s de descanso.", exercicios: [
        { nome: "Puxada Frontal na Máquina", series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Peito aberto, puxa até o queixo. Cotovelos para baixo.", busca: "lat pulldown machine gym back exercise" },
        { nome: "Remada na Máquina",         series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Junta as escápulas no final. Costas retas.", busca: "seated row machine gym back" },
        { nome: "Remada Sentada no Cabo",    series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Cabo",    dica: "Puxa até o umbigo. Tronco levemente inclinado.", busca: "cable seated row gym back exercise" },
        { nome: "Rosca Direta com Barra",    series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Barra",   dica: "Cotovelos FIXOS no corpo. Se balançar, o peso está pesado.", busca: "barbell bicep curl gym exercise" },
        { nome: "Rosca Martelo com Haltere", series: "3x", reps: "12 reps", descanso: "60s após circuito", equip: "Halteres", dica: "Polegar para cima. Movimento lento e controlado.", busca: "hammer curl dumbbell bicep gym" },
      ]},
      { titulo: "🏁 FINALIZAÇÃO", tipo: "finisher", exercicios: [
        { nome: "Abdominal na Máquina", series: "3x", reps: "15 reps", descanso: "30s", equip: "Máquina", dica: "Concentra no abdômen. Não usa o pescoço!", busca: "ab crunch machine gym" },
        { nome: "Bike Ergométrica",     series: "1x", reps: "5 min",   descanso: "—",  equip: "Cardio", dica: "Missão do dia quase concluída. Empurra! 💥", busca: "stationary bike gym cardio" },
      ]},
    ],
  },
  {
    dia: "TER", periodo: "MANHÃ", cor: "#A855F7", emoji: "🦵",
    foco: "PERNAS — QUADRÍCEPS",
    blocos: [
      { titulo: "🔥 ATIVAÇÃO — 5 min", tipo: "warmup", exercicios: [
        { nome: "Esteira (aquecimento)", series: "1x", reps: "5 min", descanso: "—", equip: "Cardio", dica: "Aquece os joelhos antes de agachar e pressionar.", busca: "treadmill walking gym" },
      ]},
      { titulo: "⚡ CIRCUITO FORÇA — 3 rounds", tipo: "main", nota: "Sequência completa, 60s entre rounds.", exercicios: [
        { nome: "Leg Press 45°",        series: "3x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Pés na largura do quadril. Desça até 90°, não trave o joelho.", busca: "leg press 45 degree machine gym" },
        { nome: "Agachamento no Smith", series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Smith",   dica: "Barra nas costas, desça devagar (3 seg). Core rígido!", busca: "smith machine squat gym barbell" },
        { nome: "Cadeira Extensora",    series: "3x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Sobe rápido, desce lento (3 seg). Queima boa! 🔥", busca: "leg extension machine gym quad" },
        { nome: "Afundo com Halteres",  series: "3x", reps: "10 reps cada perna", descanso: "60s após circuito", equip: "Halteres", dica: "Passo largo. Joelho não passa da ponta do pé.", busca: "dumbbell lunge exercise legs gym" },
      ]},
      { titulo: "🏁 FINALIZAÇÃO", tipo: "finisher", exercicios: [
        { nome: "Abdominal na Máquina", series: "3x", reps: "15 reps", descanso: "30s", equip: "Máquina", dica: "Mantém foco no abdômen, não no pescoço.", busca: "ab crunch machine gym" },
        { nome: "Bike Ergométrica",     series: "1x", reps: "5 min",   descanso: "—",  equip: "Cardio", dica: "Pernas queimando = progresso acontecendo! 💥", busca: "stationary bike gym" },
      ]},
    ],
  },
  {
    dia: "TER", periodo: "NOITE", cor: "#EC4899", emoji: "🍑",
    foco: "PERNAS — POSTERIOR + GLÚTEOS",
    blocos: [
      { titulo: "🔥 ATIVAÇÃO — 5 min", tipo: "warmup", exercicios: [
        { nome: "Esteira (aquecimento)", series: "1x", reps: "5 min", descanso: "—", equip: "Cardio", dica: "Ativa o posterior antes de trabalhar isquio e glúteo.", busca: "treadmill walking gym" },
      ]},
      { titulo: "⚡ CIRCUITO FORÇA — 3 rounds", tipo: "main", nota: "Sequência completa, 60s entre rounds.", exercicios: [
        { nome: "Cadeira Flexora (sentada)", series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Desce devagar (3 seg). O isquio vai queimar!", busca: "seated leg curl machine gym hamstring" },
        { nome: "Stiff com Halteres",       series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Halteres", dica: "Quadril para trás, NÃO curva a coluna. Sente o posterior.", busca: "dumbbell romanian deadlift stiff leg gym" },
        { nome: "Leg Press 45°",            series: "3x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Pés mais altos na plataforma = mais glúteo!", busca: "leg press 45 degree machine gym" },
        { nome: "Abdutora na Máquina",      series: "3x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Abre as pernas devagar. Aperta o glúteo no máximo.", busca: "hip abduction machine gym glute" },
        { nome: "Agachamento no Smith",     series: "3x", reps: "12 reps", descanso: "60s após circuito", equip: "Smith", dica: "Pés levemente à frente da barra. Mais glúteo na descida!", busca: "smith machine squat gym" },
      ]},
      { titulo: "🏁 FINALIZAÇÃO", tipo: "finisher", exercicios: [
        { nome: "Abdominal na Máquina", series: "3x", reps: "15 reps", descanso: "30s", equip: "Máquina", dica: "Finaliza com força! Abdômen contraído.", busca: "ab crunch machine gym" },
        { nome: "Bike Ergométrica",     series: "1x", reps: "5 min",   descanso: "—",  equip: "Cardio", dica: "MISSÃO CUMPRIDA! Você foi 2x hoje. 🏆", busca: "stationary bike gym cardio" },
      ]},
    ],
  },
  {
    dia: "QUA", periodo: "MANHÃ", cor: "#F59E0B", emoji: "🎯",
    foco: "OMBROS + CORE",
    blocos: [
      { titulo: "🔥 ATIVAÇÃO — 5 min", tipo: "warmup", exercicios: [
        { nome: "Esteira (aquecimento)", series: "1x", reps: "5 min", descanso: "—", equip: "Cardio", dica: "Ombros = articulação delicada. Aquece bem!", busca: "treadmill gym warm up" },
      ]},
      { titulo: "⚡ CIRCUITO FORÇA — 3 rounds", tipo: "main", nota: "Sequência completa, 60s entre rounds.", exercicios: [
        { nome: "Desenvolvimento na Máquina",    series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Não trave os cotovelos no topo. Core firme!", busca: "shoulder press machine gym overhead" },
        { nome: "Elevação Lateral na Máquina",   series: "3x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Levanta até a altura do ombro. Controlado!", busca: "lateral raise machine gym shoulder" },
        { nome: "Elevação Lateral com Halteres", series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Halteres", dica: "Cotovelo levemente dobrado. Sem embalo!", busca: "dumbbell lateral raise shoulder gym" },
        { nome: "Elevação Frontal com Halter",   series: "3x", reps: "12 reps", descanso: "60s após circuito", equip: "Halteres", dica: "Polegar levemente para cima. Para na altura do ombro.", busca: "dumbbell front raise shoulder gym" },
      ]},
      { titulo: "🏁 CORE DESTRUIDOR", tipo: "finisher", exercicios: [
        { nome: "Abdominal na Máquina",      series: "4x", reps: "15 reps", descanso: "30s", equip: "Máquina", dica: "4 séries hoje! Segura 2 seg na contração.", busca: "ab crunch machine gym" },
        { nome: "Abdominal Infra na Máquina",series: "3x", reps: "15 reps", descanso: "30s", equip: "Máquina", dica: "Foca na parte de baixo do abdômen.", busca: "lower ab machine gym core" },
        { nome: "Bike Ergométrica",          series: "1x", reps: "5 min",   descanso: "—",  equip: "Cardio", dica: "Respira, sorri. Você está mandando bem! ✨", busca: "stationary bike gym" },
      ]},
    ],
  },
  {
    dia: "QUA", periodo: "NOITE", cor: "#EF4444", emoji: "⚡",
    foco: "FULL BODY — MÁQUINAS",
    blocos: [
      { titulo: "🔥 ATIVAÇÃO — 5 min", tipo: "warmup", exercicios: [
        { nome: "Esteira (aquecimento)", series: "1x", reps: "5 min", descanso: "—", equip: "Cardio", dica: "Full Body — aquece tudo!", busca: "treadmill gym cardio" },
      ]},
      { titulo: "⚡ CIRCUITO FULL BODY — 4 rounds", tipo: "main", nota: "4 rounds intensos. 60s entre rounds. Vai!", exercicios: [
        { nome: "Leg Press 45°",              series: "4x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Explosivo na subida, controlado na descida.", busca: "leg press machine gym" },
        { nome: "Supino na Máquina",          series: "4x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Peito cheio de ar na descida, expira na subida.", busca: "chest press machine gym" },
        { nome: "Puxada Frontal na Máquina",  series: "4x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Cotovelos apontando pro chão. Costas retas!", busca: "lat pulldown machine gym" },
        { nome: "Desenvolvimento na Máquina", series: "4x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Ombros pra baixo e pra trás antes de começar.", busca: "shoulder press machine gym" },
        { nome: "Rosca na Máquina",           series: "4x", reps: "12 reps", descanso: "60s após circuito", equip: "Máquina", dica: "Cotovelos fixos no apoio. Isola o bíceps!", busca: "bicep curl machine gym" },
      ]},
      { titulo: "🏁 FINALIZAÇÃO", tipo: "finisher", exercicios: [
        { nome: "Abdominal na Máquina", series: "3x", reps: "15 reps", descanso: "30s", equip: "Máquina", dica: "Último esforço do dia. Vai!", busca: "ab crunch machine gym" },
        { nome: "Bike Ergométrica",     series: "1x", reps: "5 min",   descanso: "—",  equip: "Cardio", dica: "Quarta concluída. Você é fera! 🔥", busca: "stationary bike gym" },
      ]},
    ],
  },
  {
    dia: "QUI", periodo: "MANHÃ", cor: "#06B6D4", emoji: "🔵",
    foco: "PEITO + COSTAS (VOLUME)",
    blocos: [
      { titulo: "🔥 ATIVAÇÃO — 5 min", tipo: "warmup", exercicios: [
        { nome: "Esteira (aquecimento)", series: "1x", reps: "5 min", descanso: "—", equip: "Cardio", dica: "Peito e costas — os maiores músculos do tronco!", busca: "treadmill gym warm up" },
      ]},
      { titulo: "⚡ CIRCUITO FORÇA — 3 rounds", tipo: "main", nota: "Alterna peito e costas — recuperação ativa!", exercicios: [
        { nome: "Supino na Máquina",               series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Mais carga que segunda! Progresso gradual.", busca: "chest press machine gym" },
        { nome: "Remada na Máquina",               series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Escápulas juntas no final. Costas retas!", busca: "seated row machine gym back" },
        { nome: "Crucifixo na Máquina (Peck Deck)",series: "3x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Amplitude máxima. Sente o peito abrir!", busca: "pec deck fly machine gym chest" },
        { nome: "Puxada Frontal na Máquina",       series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Varia a pegada — mais aberta que segunda.", busca: "lat pulldown machine gym" },
        { nome: "Supino Inclinado na Máquina",     series: "3x", reps: "12 reps", descanso: "60s após circuito", equip: "Máquina", dica: "Parte alta do peito. Postura ereta no banco!", busca: "incline chest press machine gym" },
      ]},
      { titulo: "🏁 FINALIZAÇÃO", tipo: "finisher", exercicios: [
        { nome: "Abdominal na Máquina", series: "3x", reps: "15 reps", descanso: "30s", equip: "Máquina", dica: "Concentração total. Abdômen ativo!", busca: "ab crunch machine gym" },
        { nome: "Bike Ergométrica",     series: "1x", reps: "5 min",   descanso: "—",  equip: "Cardio", dica: "Quase no fim da semana. Segura!", busca: "stationary bike gym" },
      ]},
    ],
  },
  {
    dia: "QUI", periodo: "NOITE", cor: "#8B5CF6", emoji: "💜",
    foco: "BRAÇOS — BÍCEPS + TRÍCEPS",
    blocos: [
      { titulo: "🔥 ATIVAÇÃO — 5 min", tipo: "warmup", exercicios: [
        { nome: "Esteira (aquecimento)", series: "1x", reps: "5 min", descanso: "—", equip: "Cardio", dica: "Dia de braços — o treino mais gostoso da semana! 💪", busca: "treadmill gym warm up" },
      ]},
      { titulo: "⚡ CIRCUITO BRAÇOS — 4 rounds", tipo: "main", nota: "Alterna bíceps e tríceps — bomba total!", exercicios: [
        { nome: "Rosca Direta com Barra",    series: "4x", reps: "12 reps", descanso: "no circuito", equip: "Barra",   dica: "Cotovelos FIXOS. Sem balanço!", busca: "barbell bicep curl gym exercise" },
        { nome: "Tríceps Corda no Cabo",     series: "4x", reps: "15 reps", descanso: "no circuito", equip: "Cabo",    dica: "Separa a corda embaixo. Cotovelos no corpo.", busca: "tricep rope pushdown cable gym" },
        { nome: "Rosca Martelo com Haltere", series: "4x", reps: "12 reps", descanso: "no circuito", equip: "Halteres",dica: "Antebraço + bíceps. Sobe devagar na volta.", busca: "hammer curl dumbbell bicep gym" },
        { nome: "Tríceps na Máquina",        series: "4x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Estende o braço completamente. Isola o tríceps!", busca: "tricep machine gym exercise" },
        { nome: "Rosca na Máquina",          series: "4x", reps: "12 reps", descanso: "60s após circuito", equip: "Máquina", dica: "Finaliza os bíceps. Cotovelo no apoio!", busca: "bicep curl machine gym" },
      ]},
      { titulo: "🏁 FINALIZAÇÃO", tipo: "finisher", exercicios: [
        { nome: "Abdominal na Máquina", series: "3x", reps: "15 reps", descanso: "30s", equip: "Máquina", dica: "Braços bombeados + abdômen forte. Combo!", busca: "ab crunch machine gym" },
        { nome: "Bike Ergométrica",     series: "1x", reps: "5 min",   descanso: "—",  equip: "Cardio", dica: "Dia de braços concluído. Que dia lindo! 🏆", busca: "stationary bike gym cardio" },
      ]},
    ],
  },
  {
    dia: "SEX", periodo: "MANHÃ", cor: "#10B981", emoji: "🦿",
    foco: "PERNAS COMPLETO",
    blocos: [
      { titulo: "🔥 ATIVAÇÃO — 5 min", tipo: "warmup", exercicios: [
        { nome: "Esteira (aquecimento)", series: "1x", reps: "5 min", descanso: "—", equip: "Cardio", dica: "Pernas completo = treino mais pesado. Aquece bem!", busca: "treadmill gym warm up" },
      ]},
      { titulo: "⚡ CIRCUITO FORÇA — 3 rounds", tipo: "main", nota: "Quad + posterior + glúteo — tudo hoje!", exercicios: [
        { nome: "Leg Press 45°",             series: "3x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Maior carga da semana aqui. Vai com tudo!", busca: "leg press 45 degree machine gym" },
        { nome: "Cadeira Extensora",         series: "3x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Finaliza o quad. Desce em 3 segundos!", busca: "leg extension machine gym" },
        { nome: "Cadeira Flexora (sentada)", series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Isquiotibial em foco. Controla a volta!", busca: "seated leg curl machine gym" },
        { nome: "Abdutora na Máquina",       series: "3x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Aperta o glúteo na abertura máxima. 1 seg parado!", busca: "hip abduction machine gym" },
        { nome: "Agachamento no Smith",      series: "3x", reps: "12 reps", descanso: "60s após circuito", equip: "Smith", dica: "Finalizador pesado! Desça fundo. Cabeça alta.", busca: "smith machine squat gym" },
      ]},
      { titulo: "🏁 FINALIZAÇÃO", tipo: "finisher", exercicios: [
        { nome: "Abdominal na Máquina", series: "3x", reps: "15 reps", descanso: "30s", equip: "Máquina", dica: "Último abdômen da semana — dá tudo!", busca: "ab crunch machine gym" },
        { nome: "Bike Ergométrica",     series: "1x", reps: "5 min",   descanso: "—",  equip: "Cardio", dica: "FIM DE SEMANA CHEGANDO! 🎉", busca: "stationary bike gym" },
      ]},
    ],
  },
  {
    dia: "SEX", periodo: "NOITE", cor: "#F97316", emoji: "🌅",
    foco: "OMBROS + ABDÔMEN FINAL",
    blocos: [
      { titulo: "🔥 ATIVAÇÃO — 5 min", tipo: "warmup", exercicios: [
        { nome: "Esteira (aquecimento)", series: "1x", reps: "5 min", descanso: "—", equip: "Cardio", dica: "Último treino da semana. Deixa tudo na academia!", busca: "treadmill gym warm up" },
      ]},
      { titulo: "⚡ CIRCUITO FORÇA — 3 rounds", tipo: "main", nota: "Último treino da semana — arrebenta!", exercicios: [
        { nome: "Desenvolvimento na Máquina",    series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Máquina", dica: "Ombros pra baixo antes de pressionar. Sem encolher!", busca: "shoulder press machine gym" },
        { nome: "Elevação Lateral na Máquina",   series: "3x", reps: "15 reps", descanso: "no circuito", equip: "Máquina", dica: "Até a altura do ombro. Controlado e limpo.", busca: "lateral raise machine gym shoulder" },
        { nome: "Elevação Lateral com Halteres", series: "3x", reps: "12 reps", descanso: "no circuito", equip: "Halteres", dica: "Estímulo diferente com halteres hoje!", busca: "dumbbell lateral raise shoulder gym" },
        { nome: "Elevação Frontal com Halter",   series: "3x", reps: "12 reps", descanso: "60s após circuito", equip: "Halteres", dica: "Deltóide anterior. Sem embalo.", busca: "dumbbell front raise shoulder gym" },
      ]},
      { titulo: "🏁 ABDÔMEN FINAL DE SEMANA 🔥", tipo: "finisher", exercicios: [
        { nome: "Abdominal na Máquina",      series: "4x", reps: "20 reps", descanso: "20s", equip: "Máquina", dica: "4×20! Semana completa = mereceu!", busca: "ab crunch machine gym" },
        { nome: "Abdominal Infra na Máquina",series: "3x", reps: "15 reps", descanso: "20s", equip: "Máquina", dica: "Parte baixa do abdômen. Foco total!", busca: "lower ab machine gym core" },
        { nome: "Bike Ergométrica",          series: "1x", reps: "10 min",  descanso: "—",  equip: "Cardio", dica: "10 min hoje! FIM DE SEMANA MERECIDO. VOCÊ É INCRÍVEL! 🏆🔥", busca: "stationary bike gym cardio" },
      ]},
    ],
  },
];

const EQUIP = {
  "Máquina": { icon: "🔩", cor: "#FF6B35", onde: "Aparelho com encosto e movimento guiado" },
  "Cabo":    { icon: "🔗", cor: "#4ECDC4", onde: "Torre com polia — ajusta a altura do cabo" },
  "Halter":  { icon: "🏋️", cor: "#A855F7", onde: "Prateleira com pesos de mão em pares" },
  "Halteres":{ icon: "🏋️", cor: "#A855F7", onde: "Prateleira com pesos de mão em pares" },
  "Barra":   { icon: "📊", cor: "#F59E0B", onde: "Barra longa com anilhas — área de peso livre" },
  "Smith":   { icon: "🏗️", cor: "#06B6D4", onde: "Gaiola com barra guiada nos trilhos" },
  "Cardio":  { icon: "🚴", cor: "#EF4444", onde: "Área de cardio — bikes e esteiras" },
};

const tipoStyle = {
  warmup:  { bg: "#FFFBEB", border: "#F59E0B" },
  main:    { bg: "#EFF6FF", border: "#3B82F6" },
  finisher:{ bg: "#F0FDF4", border: "#22C55E" },
};

// ── COMPONENTE DE IMAGEM COM FETCH VIA ANTHROPIC API ────────────────────────
function ExerciseImage({ busca, nome, cor }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tried, setTried] = useState(false);
  const eq = EQUIP[Object.keys(EQUIP).find(k => busca.includes(k.toLowerCase())) || "Máquina"] || EQUIP["Máquina"];

  const fetchImg = async () => {
    if (tried) return;
    setTried(true);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{
            role: "user",
            content: `Search for an image of this gym exercise: "${busca}". Return ONLY a valid direct image URL (ending in .jpg, .png or .gif) that shows this exercise being performed. Return just the URL, nothing else.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("");
      const match = text?.match(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|gif|webp)/i);
      if (match) setImgUrl(match[0]);
    } catch (e) {}
    setLoading(false);
  };

  if (!tried) {
    return (
      <button onClick={fetchImg} style={{
        width: "100%", padding: "14px", borderRadius: 10, cursor: "pointer",
        background: `${cor}15`, border: `2px dashed ${cor}55`,
        color: cor, fontSize: 13, fontWeight: 700, marginBottom: 10,
      }}>
        📸 Carregar foto do exercício
      </button>
    );
  }
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#555", fontSize: 12, marginBottom: 10 }}>
        🔍 Buscando foto...
      </div>
    );
  }
  if (imgUrl) {
    return (
      <div style={{ marginBottom: 10 }}>
        <img
          src={imgUrl}
          alt={nome}
          onError={() => setImgUrl(null)}
          style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 10, border: `2px solid ${cor}55` }}
        />
        <div style={{ fontSize: 10, color: "#444", textAlign: "center", marginTop: 3 }}>📸 {nome}</div>
      </div>
    );
  }
  // fallback
  return (
    <div style={{
      background: `${cor}12`, border: `2px dashed ${cor}44`,
      borderRadius: 10, padding: "20px 0", textAlign: "center", marginBottom: 10,
    }}>
      <div style={{ fontSize: 44 }}>🏋️</div>
      <div style={{ fontSize: 12, color: cor, fontWeight: 700, marginTop: 6 }}>{nome}</div>
    </div>
  );
}

// ── CARD DE EXERCÍCIO ────────────────────────────────────────────────────────
function ExCard({ ex, done, onCheck, cor }) {
  const [open, setOpen] = useState(false);
  const eq = EQUIP[ex.equip] || EQUIP["Máquina"];

  return (
    <div style={{
      background: done ? "#0A1F0A" : "#13131C",
      borderLeft: `4px solid ${done ? "#22C55E" : cor}`,
      borderBottom: "1px solid #1E1E2E",
      transition: "background 0.2s",
    }}>
      <div style={{ display: "flex", gap: 10, padding: "11px 14px", alignItems: "flex-start" }}>
        <button onClick={onCheck} style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0, marginTop: 1,
          border: `2px solid ${done ? "#22C55E" : "#3A3A4A"}`,
          background: done ? "#22C55E" : "transparent",
          cursor: "pointer", color: "#fff", fontSize: 15,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s",
        }}>{done ? "✓" : ""}</button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 14, fontWeight: 800,
            color: done ? "#4ade80" : "#F0F0FF",
            textDecoration: done ? "line-through" : "none",
            opacity: done ? 0.65 : 1,
          }}>{ex.nome}</div>

          <div style={{ fontSize: 10, color: eq.cor, fontWeight: 700, marginTop: 3 }}>
            {eq.icon} {eq.onde}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 7 }}>
            <span style={{ background: "#1E2035", color: cor, borderRadius: 6, padding: "2px 9px", fontSize: 11, fontWeight: 800 }}>
              {ex.series} × {ex.reps}
            </span>
            <span style={{ background: "#1E2035", color: "#7A7A9A", borderRadius: 6, padding: "2px 9px", fontSize: 11 }}>
              ⏱ {ex.descanso}
            </span>
          </div>

          <button onClick={() => setOpen(o => !o)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: open ? "#F59E0B" : "#555", fontSize: 11,
            fontWeight: 700, padding: "5px 0 0", letterSpacing: 0.3,
          }}>
            {open ? "▲ fechar" : "▼ ver foto + dica"}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ borderTop: "1px solid #1E1E2E", padding: "12px 14px", background: "#0D0D18" }}>
          <ExerciseImage busca={ex.busca} nome={ex.nome} cor={cor} />
          <div style={{ background: "#1A1400", border: "1px solid #F59E0B44", borderRadius: 8, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, color: "#F59E0B", fontWeight: 800, marginBottom: 4 }}>💡 EXECUÇÃO</div>
            <div style={{ fontSize: 12, color: "#FCD34D", lineHeight: 1.6 }}>{ex.dica}</div>
          </div>
          <div style={{ background: `${eq.cor}12`, border: `1px solid ${eq.cor}44`, borderRadius: 8, padding: "8px 12px", marginTop: 8 }}>
            <div style={{ fontSize: 11, color: eq.cor, fontWeight: 700 }}>📍 ONDE FICA</div>
            <div style={{ fontSize: 12, color: eq.cor, opacity: 0.8, marginTop: 2 }}>{eq.onde}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── APP PRINCIPAL ────────────────────────────────────────────────────────────
export default function TreinoTDAH() {
  const [idx, setIdx] = useState(0);
  const [checked, setChecked] = useState({});
  const treino = semana[idx];

  const toggle = key => setChecked(p => ({ ...p, [key]: !p[key] }));

  const total = treino.blocos.reduce((a, b) => a + b.exercicios.length, 0);
  const feitos = treino.blocos.reduce((a, b, bi) =>
    a + b.exercicios.filter((_, ei) => checked[`${idx}-${bi}-${ei}`]).length, 0);
  const pct = total ? Math.round(feitos / total * 100) : 0;

  const dias = ["SEG","TER","QUA","QUI","SEX"];

  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "#0B0B12", minHeight: "100vh",
      color: "#F0F0FF", maxWidth: 430, margin: "0 auto", paddingBottom: 120,
    }}>
      <style>{`* { box-sizing: border-box; } button { font-family: inherit; }`}</style>

      {/* HEADER */}
      <div style={{
        background: `linear-gradient(160deg, ${treino.cor}25 0%, #0B0B12 55%)`,
        borderBottom: `3px solid ${treino.cor}`,
        padding: "18px 16px 14px",
        position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: treino.cor, fontWeight: 900, marginBottom: 3 }}>
          PROTOCOLO TDAH · SEG→SEX · 2×/DIA
        </div>
        <div style={{ fontSize: 21, fontWeight: 900, lineHeight: 1.15 }}>
          {treino.emoji} {treino.foco}
        </div>
        <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>{treino.dia} {treino.periodo} · 45–55 min</div>

        <div style={{ marginTop: 11 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#555", marginBottom: 5 }}>
            <span style={{ fontWeight: 700, letterSpacing: 1 }}>⚡ PROGRESSO</span>
            <span style={{ color: pct === 100 ? "#22C55E" : treino.cor, fontWeight: 800 }}>
              {feitos}/{total} {pct === 100 ? "🏆 MISSÃO CUMPRIDA!" : `(${pct}%)`}
            </span>
          </div>
          <div style={{ background: "#1A1A28", borderRadius: 99, height: 7, overflow: "hidden" }}>
            <div style={{
              width: `${pct}%`, height: "100%", borderRadius: 99,
              background: pct === 100 ? "linear-gradient(90deg,#22C55E,#A855F7)" : `linear-gradient(90deg,${treino.cor},${treino.cor}77)`,
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>
      </div>

      {/* SELETOR */}
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          {dias.map(d => {
            const primIdx = semana.findIndex(s => s.dia === d);
            const ativo = semana[idx].dia === d;
            return (
              <button key={d} onClick={() => setIdx(primIdx)} style={{
                flex: 1, padding: "7px 0", borderRadius: 10,
                background: ativo ? treino.cor : "#181824",
                color: ativo ? "#fff" : "#555",
                border: `2px solid ${ativo ? treino.cor : "#252535"}`,
                fontWeight: 800, fontSize: 11, cursor: "pointer",
              }}>{d}</button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
          {semana.filter(s => s.dia === treino.dia).map((s) => {
            const sIdx = semana.indexOf(s);
            const ativo = sIdx === idx;
            return (
              <button key={sIdx} onClick={() => setIdx(sIdx)} style={{
                flex: 1, padding: "8px 0", borderRadius: 10,
                background: ativo ? `${s.cor}22` : "#181824",
                color: ativo ? s.cor : "#444",
                border: `2px solid ${ativo ? s.cor : "#252535"}`,
                fontWeight: 800, fontSize: 12, cursor: "pointer",
              }}>
                {s.periodo === "MANHÃ" ? "☀️ MANHÃ" : "🌙 NOITE"}
              </button>
            );
          })}
        </div>
      </div>

      {/* BLOCOS */}
      <div style={{ padding: "14px 16px" }}>
        {treino.blocos.map((bloco, bi) => {
          const ts = tipoStyle[bloco.tipo] || tipoStyle.main;
          return (
            <div key={bi} style={{ marginBottom: 22 }}>
              <div style={{ background: ts.bg, border: `2px solid ${ts.border}`, borderRadius: "13px 13px 0 0", padding: "9px 14px" }}>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#111" }}>{bloco.titulo}</div>
                {bloco.nota && <div style={{ fontSize: 11, color: "#555", marginTop: 3, fontStyle: "italic" }}>ℹ️ {bloco.nota}</div>}
              </div>
              {bloco.exercicios.map((ex, ei) => {
                const key = `${idx}-${bi}-${ei}`;
                return <ExCard key={ei} ex={ex} done={!!checked[key]} onCheck={() => toggle(key)} cor={treino.cor} />;
              })}
              <div style={{ height: 3, background: ts.border, opacity: 0.2, borderRadius: "0 0 5px 5px" }} />
            </div>
          );
        })}

        {/* MOTIVACIONAL */}
        <div style={{
          background: `linear-gradient(135deg, ${treino.cor}22, #A855F722)`,
          border: `2px solid ${treino.cor}`, borderRadius: 16, padding: 18, textAlign: "center",
        }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{pct === 100 ? "🏆🔥🏆" : pct >= 50 ? "💪⚡" : "💪"}</div>
          <div style={{ fontSize: 15, fontWeight: 800 }}>
            {pct === 100 ? "MISSÃO CUMPRIDA! Você é uma fera!" : pct >= 50 ? "Metade feita! Não para agora!" : "Foco total. Uma série por vez!"}
          </div>
          <div style={{ fontSize: 11, color: "#888", marginTop: 6 }}>
            {pct === 100 ? `${treino.dia} ${treino.periodo} → ✅ Descansa 10 min.` : `${total - feitos} exercício(s) restante(s) ⚡`}
          </div>
        </div>

        {/* LEMBRETES */}
        <div style={{ background: "#0D0D16", border: "1px solid #22223A", borderRadius: 14, padding: 16, marginTop: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, color: "#444", marginBottom: 12 }}>🧠 LEMBRETES TDAH</div>
          {[
            ["🫁","Respire","Inspire antes, expire no esforço."],
            ["🎯","Postura","3 segundos de check antes de cada série."],
            ["📸","Foto","Toca em 'ver foto + dica' — busca a imagem na hora!"],
            ["💧","Hidrate","Um gole de água entre cada exercício."],
            ["✅","Check","Marque ao terminar — dopamina liberada!"],
          ].map(([ic,t,d]) => (
            <div key={t} style={{ display: "flex", gap: 10, marginBottom: 9 }}>
              <span style={{ fontSize: 16 }}>{ic}</span>
              <div style={{ fontSize: 12 }}>
                <span style={{ fontWeight: 800, color: "#ccc" }}>{t}: </span>
                <span style={{ color: "#555" }}>{d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
