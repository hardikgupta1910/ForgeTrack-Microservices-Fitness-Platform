import { apiSlice } from '../../app/api/apiSlice'

export const aiApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    sendQuestion: build.mutation({
      query: (question) => ({
        url: '/api/ai/chat',
        method: 'POST',
        body: { question },
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useSendQuestionMutation } = aiApi