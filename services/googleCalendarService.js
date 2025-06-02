import jwt from "jsonwebtoken";
import axios from "axios";

/**
 * 🔐 Gera o JWT para autenticação com o Google API.
 */
const generateJWT = async () => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;

  const payload = {
    iss: process.env.CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    exp,
    iat,
    sub: "admin@ialfred.com.br"
  };

  return jwt.sign(payload, process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), { algorithm: "RS256" });
};

/**
 * 🔓 Obtém o Access Token para requisições.
 */
export const getAccessToken = async () => {
  try {
    const jwtToken = await generateJWT();
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwtToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
} catch (error) {
    let errMsg = "Erro desconhecido ao obter Access Token.";
    if (error.response) {
      console.error("❌ Erro da API do Google ao obter Access Token:", error.response.data);
      errMsg = error.response.data.error_description || error.response.data.error || error.message;
    } else if (error.request) {
      console.error("❌ Erro de requisição (sem resposta da API do Google):", error.request);
      errMsg = "Sem resposta da API do Google ao tentar obter Access Token.";
    } else {
      console.error("❌ Erro ao configurar requisição para Access Token:", error.message);
      errMsg = error.message;
    }
    throw new Error(errMsg); // Lança um erro com uma mensagem mais clara ou a do Google
  }
};

/**
 * ➕ Cria um evento no Google Calendar
 */
export const createEvent = async (calendarId, event) => {
  try {
    const accessToken = await getAccessToken();
    let conferenceData = "";
    if(event.location?.toLowerCase() === 'online') {
      conferenceData = "&conferenceDataVersion=1";
      const requestID = `meet-${Date.now()}-${Math.random().toString(36).substring(2)}`;

      event.conferenceData = {
        createRequest: {
        requestId: requestID
        }
      };
    }

    const response = await axios.post(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?sendUpdates=all${conferenceData}`,
      event,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Erro ao criar evento:", error.response.data);
    throw error;
  }
};

export const listOfEvents = async (calendarId, startTime, endTime) => {
  try {
    const accessToken = await getAccessToken();

    if (!startTime || !endTime) {
      const now = new Date();
      const ano = now.getFullYear();
      const mes = (now.getMonth() + 1).toString().padStart(2, '0'); // Meses são 0-indexados
      const dia = now.getDate().toString().padStart(2, '0');

      startTime = `${ano}-${mes}-${dia}T00:00:00-03:00`;
      endTime = `${ano}-${mes}-${dia}T23:59:59-03:00`;
    }

    console.log(`🔄 Buscando eventos de: ${startTime} até ${endTime}`);

    const response = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          timeMin: startTime,
          timeMax: endTime,
          singleEvents: true,
          orderBy: 'startTime',
          fields: 'items(id,summary,description,location,start,end)'
        },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error("❌ Erro ao listar eventos:", error.response.data);
    throw new Error("Falha ao buscar eventos do Google Calendar: " + (error.response?.data?.error?.message || error.message));
  }
};

export const listFreeBusy = async (calendarId, day) => {
  try {
    const accessToken = await getAccessToken();

    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(day)
    endOfDay.setHours(23, 59, 59, 999);

    const response = await axios.post(
      `https://www.googleapis.com/calendar/v3/freeBusy`,
    {
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      timeZone: "America/Sao_Paulo",
      items: [
        {
          id: calendarId
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    }
    );
    
  return response.data;

  } catch (error) {
    console.error("❌ Erro ao listar horários ocupados:", error.response?.data || error.message);
    throw error;
  }
};