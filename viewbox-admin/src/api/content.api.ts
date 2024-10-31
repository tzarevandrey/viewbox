import { api } from "./api";

export const contentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllContent: builder.query({
            query: () => ({
                url: '/content/test',
                method: 'get'
            }),
        }),
    }),
    overrideExisting: false
})

export const {
    useGetAllContentQuery,
} = contentApi;