import { createEvent, listOfEvents, listFreeBusy } from '../services/googleCalendarService.js';
import { sendNotificationIalfred } from '../services/IalfredService.js';

/**
 * ➕ Adicionar um evento ao Google Calendar
 */
export const addEvent = async (req, res) => {
  try {
    const { calendarId, event, participants } = req.body;

    if (!calendarId || !event) {
      return res.status(400).json({ error: "ID do Calendário e evento são obrigatórios." });
    }

    const result = await createEvent(calendarId, event);

    if (participants && typeof participants === 'string' && participants.trim() !== '') {
      const telefones = participants.split(",");
      for (const telefone of telefones) {
        await sendNotificationIalfred(telefone, result);
      }
    }

    res.status(201).json({ message: "Evento criado com sucesso!", event: result });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar evento", details: error.message });
  }
};

export const listEvents = async (req, res) => {
    try {
      const { calendarId } = req.params;
      const { startTime, endTime} = req.query;
  
      if (!calendarId) {
        return res.status(400).json({ error: "ID do Calendário é obrigatório." });
      }
  
      const events = await listOfEvents(calendarId, startTime, endTime);
  
      res.status(200).json({ message: "Eventos listados com sucesso!", events });
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar eventos do dia atual", details: error.message });
    }
  };

  export const freeBusy = async (req, res) => {
    try {
      const { calendarId } = req.params;
      const { day } = req.query;

      if (!calendarId || !day) {
        return res.status(400).json({ error: "ID do Calendário e dia são obrigatórios." });
      }

      const busy = await listFreeBusy(calendarId, day);

      res.status(200).json({ message: `horários ocupados do dia ${day}`, busy});

    } catch (error) {
      res.status(500).json({error: "Erro ao listar intervalos ocupados", details: error.message });
    }
  }