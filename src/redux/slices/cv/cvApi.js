import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cvApi = createApi({
    reducerPath: 'cvApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/cv`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.accessToken;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['CV', 'CVS'],
    endpoints: (builder) => ({
        getCvs: builder.query({
            query: () => '',
            providesTags: ['CVS'],
        }),
        getCvById: builder.query({
            query: (id) => `${id}`,
            providesTags: (result, error, id) => [{ type: 'CV', id }],
        }),
        createCv: builder.mutation({
            query: (data) => ({
                url: '',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['CVS'],
        }),
        updateCv: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'CV', id },
                'CVS',
            ],
        }),
        deleteCv: builder.mutation({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CVS'],
        }),
        checkFileName: builder.query({
            query: (fileName) => `check-filename/${encodeURIComponent(fileName)}`,
        }),
    }),
});

export const {
    useGetCvsQuery,
    useGetCvByIdQuery,
    useCreateCvMutation,
    useUpdateCvMutation,
    useDeleteCvMutation,
    useCheckFileNameQuery,
    useLazyCheckFileNameQuery,
} = cvApi;
