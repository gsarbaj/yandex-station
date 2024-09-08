'use client'

import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface TelegramResponse {
    ok: boolean;
    result?: any;
    description?: string;
}

const bot = {
    CHAT_ID: '-4147884596'
}

interface TelegramSenderProps {
    note?: string | null | undefined
}

const TelegramSender: React.FC = ({note}:any) => {

    const [message, setNote] = useState<string>(note);
    const [sendMessage, setSendMessage] = useState<boolean>(true);
    const [response, setResponse] = useState<TelegramResponse | null>(null);
    const [error, setError] = useState<Error | null>(null);

    if (sendMessage) {
        console.log(sendMessage)
    }

    useEffect(() => {
        const sendMessage = async () => {
            console.log('TELEGRAM SEND FRONT');

            // Using axios
            // try {
            //     const axiosResponse = await axios.post(`${process.env.TELEGRAM_BOT_API}/sendMessage`, {
            //         chat_id: process.env.CHAT_ID,
            //         text: `НОВЫЙ ЗАКАЗ AXIOS: ${note}`
            //     });
            //     console.log('Axios response:', axiosResponse.data);
            // } catch (axiosError) {
            //     console.error('Error sending message with axios:', axiosError);
            // }

            // Using fetch
            const url = `https://api.telegram.org/bot7320824806:AAEdttQEKbRpUZoMSlVbkyG_kGvGHBVDXBM/sendMessage`;
            const body = JSON.stringify({
                chat_id: bot.CHAT_ID,
                text: `НОВЫЙ ЗАКАЗ : ${message}`
            });

            try {
                const fetchResponse = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });

                if (!fetchResponse.ok) {
                    throw new Error(`HTTP error! status: ${fetchResponse.status}`);
                }

                const data: TelegramResponse = await fetchResponse.json();
                setResponse(data);
            } catch (fetchError) {
                console.error('Error sending Telegram message:', fetchError);

                // @ts-ignore
                setError(fetchError);
            }
        };

        sendMessage();
        setSendMessage(false);
    }, []);

    return (
        <>
            {/*{response && <div>Response: {JSON.stringify(response)}</div>}*/}
            {/*{error && <div>Error: {error.message}</div>}*/}
        </>
    );
};

export default TelegramSender;
