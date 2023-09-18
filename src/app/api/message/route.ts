// route.ts is reserved in next.js to define a route
import { CHATBOT_PROMPT } from '@/constants/chatbot-prompt.const'
import { CHATGPT_AGENT } from '@/constants/chatgpt.const'
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from '@/libs/openai-stream'
import { MessagesArraySchema } from "@/libs/validators/message"

export async function POST(req: Request) {
  // this only works if request is of type application/json
  const { messages } = await req.json()

  // make sure that messages is of type MessagesArraySchema
  const parsedMessages = MessagesArraySchema.parse(messages)

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserInput ? CHATGPT_AGENT.USER : CHATGPT_AGENT.SYSTEM,
    content: message.text,
  }))

  // sort outbound messages in a reverse order
  outboundMessages.unshift({
    role: CHATGPT_AGENT.SYSTEM,
    content: CHATBOT_PROMPT,
  })

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: outboundMessages,
    temperature: 0.4, // Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.
    top_p: 1, // Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.
    frequency_penalty: 0, // How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.
    presence_penalty: 0, // How much to penalize new tokens based on whether they appear in the text so far. Increases the model's likelihood to talk about new topics.
    max_tokens: 150, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except GPT-3 and T5, which have a context length of 1024).
    stream: true, // Whether to stream the completion as it's generated rather than buffering all the partial results in memory.
    n: 1, // Number of completions to generate for each message.
  }

  const stream = await OpenAIStream(payload)

  return new Response(stream)
}

