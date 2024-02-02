
import { create } from 'zustand'
import { LIMIT_MESSAGE } from '../constant';

export type Imessage = {
    created_at: string;
    id: string;
    is_edit: boolean;
    send_by: string;
    text: string;
    users: {
        avatar_url: string;
        created_at: string;
        display_name: string;
        id: string;
    } | null;
}

interface MessageState {
    page: number,
    hasMore: boolean,
    messages: Imessage[],
    actionMessage: Imessage | undefined,
    optimisticIds: string[],
    addMessage: (message: Imessage) => void,
    setActionMessage: (message: Imessage | undefined) => void,
    optimisticDeleteMessage: (messageId: string) => void,
    optimisticUpdateMessage: (messageId: Imessage) => void,
    setMessages: (messages: Imessage[]) => void
}

export const useMessage = create<MessageState>()((set) => ({
    page: 1,
    hasMore: true,
    messages: [],
    optimisticIds: [], // msg created twice same time so capturing ids of msgs and avoid rendering it in the ListMessage comp and while ChatInput comp
    actionMessage: undefined,
    setMessages: (messages) => set((state) => ({ messages: [...messages, ...state.messages,], page: state.page + 1, hasMore: messages.length >= LIMIT_MESSAGE })),
    addMessage: (new_message) => set((state) => ({ messages: [...state.messages, new_message], optimisticIds: [...state.optimisticIds, new_message.id] })),
    setActionMessage: (message) => set(() => ({
        actionMessage: message
    })),
    optimisticDeleteMessage: (messageId) => set((state) => {
        return {
            messages: state.messages.filter(
                (message) => message.id !== messageId
            )
        }
    }),
    optimisticUpdateMessage: (updateMessage) => set((state) => {
        return {
            messages: state.messages.filter(
                (message) => {
                    if (message.id === updateMessage.id) {
                        message.text = updateMessage.text,
                            message.is_edit = updateMessage.is_edit
                    }
                    return message
                }
            )
        }
    }),
}))


//TS 1:26:10