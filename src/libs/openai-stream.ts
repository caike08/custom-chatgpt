import { ParsedEvent, ReconnectInterval, createParser } from 'eventsource-parser'

import { CHATGPT_AGENT } from "@/constants/chatgpt.const"
import { OPENAI_CHAT_COMPLETIONS_URL } from "@/constants/openai.const"

export type ChatGPTAgent = CHATGPT_AGENT.USER | CHATGPT_AGENT.SYSTEM

export interface ChatGPTMessage {
  role: ChatGPTAgent,
  content: string
}

export interface OpenAIStreamPayload {
  model: string
  messages: ChatGPTMessage[]
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  max_tokens: number
  stream: boolean
  n: number
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  let counter = 0

  const res = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload)
  })

  // console.log(await res.json(), payload)

  // The ReadableStream interface of the Streams API represents a readable stream of byte data.
  // see more at https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream 
  const stream = new ReadableStream({
    async start(controller) {
      // 
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data

          if (data === '[DONE]') {
            controller.close()
            return  // stop any further execution
          }

          // if there's an actual readable stream to read, handle data to normal text logic
          try {
            const json = JSON.parse(data)

            const text = json.choices[0].delta?.content || ''

            if (counter < 2 && (text.match(/\n/) || []).length) {
              return
            }

            const queue = encoder.encode(text)

            controller.enqueue(queue)

            counter++

          } catch (error) {
            controller.error(error)
          }
        }
      }

      const parser = createParser(onParse)

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    }
  })

  return stream
}
