import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useSendQuestionMutation } from '../features/ai/aiApi'

const AIChat = () => {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [sendQuestion, { isLoading, error }] = useSendQuestionMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!question.trim()) return

    const userMessage = {
      role: 'user',
      content: question,
    }

    try {
      const response = await sendQuestion(question).unwrap()

      const aiMessage = {
        role: 'assistant',
        content: response,
      }

      setMessages((prev) => [...prev, userMessage, aiMessage])
      setQuestion('')
    } catch (err) {
      console.error('AI chat failed:', err)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-10rem)] flex-col rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-6">
          <h1 className="text-2xl font-bold text-white">AI Chat</h1>
          <p className="text-sm text-slate-400">
            Ask questions about your activities and training insights
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-slate-400">
              No messages yet. Ask something useful.
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-3xl rounded-2xl px-4 py-3 text-sm ${
                message.role === 'user'
                  ? 'ml-auto bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-200'
              }`}
            >
              <p className="mb-1 text-xs uppercase tracking-wide opacity-70">
                {message.role}
              </p>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}

          {isLoading && (
            <div className="max-w-3xl rounded-2xl bg-slate-800 px-4 py-3 text-sm text-slate-200">
              Thinking...
            </div>
          )}

          {error && (
            <div className="max-w-3xl rounded-2xl bg-red-950/40 px-4 py-3 text-sm text-red-300">
              Failed to get AI response.
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-800 p-4"
        >
          <div className="flex gap-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows="3"
              placeholder="Ask about recovery, workout quality, calories, trends..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default AIChat