/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { toast } from "sonner"
import { create } from "zustand"

interface Message {
    _id: string,
    senderId: string,
    receiverId: string,
    text: string,
    image?: string,
    createdAt: string,
    updatedAt: string
}

interface User {
    _id: string,
    email: string,
    fullName: string,
    profilePic: string,
    createdAt: string,
    updatedAt: string
}

interface ChatStore {
    messages: Message[],
    users: User[],
    selectedUser: User | null,
    isUsersLoading: boolean,
    isMessagesLoading: boolean,
    isSendingMessage: boolean,
    
    getUsers: () => Promise<User[]>,
    getMessages: (userId: string) => Promise<Message[]>,
    sendMessages: (messageData: { text?: string, image?: string }) => Promise<void>,
}

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSendingMessage: false,

    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axios.get("http://localhost:3000/api/user/users");
            set({ users: res.data });
            return res.data
        }
        catch(err: any) {
            console.error("Error in fetching users ", err);
            const errorMessage = err?.response?.data?.message || "Something went wrong. Please try again.";
            toast(errorMessage)
        }
        finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId: string) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axios.get(`http://localhost:3000/api/message/${userId}`);
            set({ messages: res.data })
            return res.data
        }
        catch(err: any) {
            console.error("Error in fetching messages ", err);
            const errorMessage = err?.response?.data?.message || "Something went wrong. Please try again.";
            toast(errorMessage)
        }
        finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessages: async () => {
        set({ isSendingMessage: true })
        try {
            // Your logic to send a message
        }
        catch(err: any) {
            console.error("Error in sending message ", err);
            const errorMessage = err?.response?.data?.message || "Something went wrong. Please try again.";
            toast(errorMessage)
        }
        finally {
            set({ isSendingMessage: false })
        }
    },
}))