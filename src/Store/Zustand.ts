import axios from "axios";
import { create } from "zustand";
import { API } from "../API/API";

export const useData = create((set, get) => ({
    data: [],
    loading: false,
    error: [],

    get: async() => {
        set((state: any) => ({ loading: true }))
        try {
            const {data} = await axios.get(API)
            set((state: any) => ({ data: data, loading: true }))
        } catch (error) {
            set((state: any) => ({ error: error, loading: false }))
        }
    },

    deleteUser: async(id: any) => {
        try {
            await axios.delete(`${API}/${id}`)
            set((state: any) => ({ data: state.data.filter((user: any) => user.id != id) }))
        } catch (error) {
            set((state: any) => ({ error: error, loading: false }))
        }
    },

    postUser: async(newUser: any) => {
        try {
            await axios.post(API, newUser)
            get().get()
        } catch (error) {
            set((state: any) => ({ error: error, loading: false }))
        }
    },

    putUser: async(id: any, updated: any) => {
        try {
            const { data: savedUser } = await axios.put(`${API}/${id}`, updated)
            set((state: any) => ({ data: state.data.map((user: any) => user.id == id ? savedUser : user) }))
        } catch (error) {
            set((state: any) => ({ error: error, loading: false }))
        }
    },

    searchUser: async(search: string) => {
        try {
            const { data } = await axios.get(`${API}?name=${search}`)
            set({ data })
        } catch (error) {
            set((state: any) => ({ error: error }))
        }
    }
}))