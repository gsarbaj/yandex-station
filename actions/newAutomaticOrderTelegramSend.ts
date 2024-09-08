'use server'

import axios from "axios";

const bot = {
    CHAT_ID: '-4147884596'
}
export const newAutomaticOrderTelegramSend = async (note: string) => {

    console.log('TELEGRAM SEND');

    // await axios.post(`${process.env["TELEGRAM_BOT_API"]}/sendMessage`, {
    //     chat_id: bot.CHAT_ID,
    //     text: `НОВЫЙ ЗАКАЗ AXIOS: ${note}`
    // })

    const url = `${process.env["TELEGRAM_BOT_API"]}/sendMessage`;
    const body = JSON.stringify({
        chat_id: bot.CHAT_ID,
        text: `НОВЫЙ ЗАКАЗ FETCH: ${note}`
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error sending Telegram message:", error);
        throw error;
    }

}


// created on 08/09/2024 12:04