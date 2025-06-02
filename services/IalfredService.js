import axios from 'axios';

export const sendNotificationIalfred = async (telefone, event) => {
    try {
        const payload = {
            telefone: telefone,
            titulo: event.summary,
            descricao: event.description || 'sem descrição',
            local: event.location || 'local não informado',
            inicio: event.start?.dateTime || 'Data de início não informada',
            fim: event.end?.dateTime || 'Data de término não informada',
            meet: event.hangoutLink || ''
        };

        const response = await axios.post('https://app.ialfred.com.br/api/iwh/45e104c21c676eb3137144cc7429b4d6', payload);

        console.log('✅ Notificação enviada com sucesso:', response.status);

    } catch (error) {
        console.error('❌ Erro ao enviar notificação whatsapp', error.message);
        throw error;
    }
}