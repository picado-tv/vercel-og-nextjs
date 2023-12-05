import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';

export async function GET(req: Request) {
    // console.log(req)
    // return Response.json({ result: 'SUCCESS' })
  // Extract the `messages` from the body of the request
//   const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        "role": "system",
        "content": "You will act as a function converting a korean text to hanja+hangul mixed text. To do so, u will identify all the hanja words in the text and change them into hanja script. \n국한문혼용문: hanja+hangul mixed script\n국한문혼용문은한국어 문장에서 한자어에서 유래한 외래어를 전부 한자로 표기하는 해서 작성하는 것을 의미해.  \n\n\n\n예시 1:\n한글전용문: 모든 국민의 재산권은 보장된다. 그 내용과 한계는 법률로써 정한다.\n국한문혼용문: 모든 國民의 財産權은 保障된다. 그 內容과 限界는 法律로써 정한다.\n예시 2:\n한글전용문: 재산권의 행사는 공공복리에 적합하도록 하여야 한다.\n국한문혼용문: 財産權의 行使는 公共福利에 適合하도록 하여야 한다\n예시 3:\n한글전용문: 공공필요에 의한 재산권의 수용 사용 또는 제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야 한다\n국한문혼용문: 公共需要에 의한 財産權의 受容 使用 또는 限制 및 그에 對한 保償은 法律로써 하되, 正當한 保償을 지급하여야 한다\n예시 4:\n한글전용문: 군인 또는 군무원이 아닌 국민은 대한민국의 영역안에서는 중대한 군사상 기밀 초병 초소 유독음식물공급 포로 군용물에 관한 죄중 법률이 정한 경우와 비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다.\n국한문혼용문:軍人 또는 軍務員이 아닌 國民은 大韓民國의 領域안에서는 중대한 軍事上 機密 哨兵 哨所 有毒飮食物供給 捕虜 軍用物에 관한 罪중 法律이 정한 경우와 非常戒嚴이 宣布된 경우를 제외하고는 軍事法院의 裁判을 받지 아니한다.\n\nThe response should be in the following format: { “hanjawords”: string[], “result”: string }"
      },
      {
        "role": "user",
        "content": "모든 국민의 재산권은 보장된다. 그 내용과 한계는 법률로써 정한다"
      },
      {
        "role": "assistant",
        "content": "{ \"hanjawords\": [\"국민\", \"재산권\", \"보장\", \"내용\", \"한계\", \"법률\"], \"result\": \"모든 國民의 財産權은 保障된다. 그 內容과 限界는 法律로써 정한다.\" }"
      },
      {
        "role": "user",
        "content": "대한민국은 민주공화국이다.",
      }
    ],
    temperature: 1,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);

}

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { query } = await req.json();
 
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
        {
          "role": "system",
          "content": "You will act as a function converting a korean text to hanja+hangul mixed text. To do so, u will identify all the hanja words in the text and change them into hanja script. \n국한문혼용문: hanja+hangul mixed script\n국한문혼용문은한국어 문장에서 한자어에서 유래한 외래어를 전부 한자로 표기하는 해서 작성하는 것을 의미해.  \n\n\n\n예시 1:\n한글전용문: 모든 국민의 재산권은 보장된다. 그 내용과 한계는 법률로써 정한다.\n국한문혼용문: 모든 國民의 財産權은 保障된다. 그 內容과 限界는 法律로써 정한다.\n예시 2:\n한글전용문: 재산권의 행사는 공공복리에 적합하도록 하여야 한다.\n국한문혼용문: 財産權의 行使는 公共福利에 適合하도록 하여야 한다\n예시 3:\n한글전용문: 공공필요에 의한 재산권의 수용 사용 또는 제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야 한다\n국한문혼용문: 公共需要에 의한 財産權의 受容 使用 또는 限制 및 그에 對한 保償은 法律로써 하되, 正當한 保償을 지급하여야 한다\n예시 4:\n한글전용문: 군인 또는 군무원이 아닌 국민은 대한민국의 영역안에서는 중대한 군사상 기밀 초병 초소 유독음식물공급 포로 군용물에 관한 죄중 법률이 정한 경우와 비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다.\n국한문혼용문:軍人 또는 軍務員이 아닌 國民은 大韓民國의 領域안에서는 중대한 軍事上 機密 哨兵 哨所 有毒飮食物供給 捕虜 軍用物에 관한 罪중 法律이 정한 경우와 非常戒嚴이 宣布된 경우를 제외하고는 軍事法院의 裁判을 받지 아니한다.\n\nThe response should be in the following format: { “hanjawords”: string[], “result”: string }\nResponse Examples:\nUser: 대한민국은 민주공화국이다.\nAssistance: { \"hanjawords\": [\"대한민국大韓民國\", \"민주民主\", \"공화국共和國\"], \"result\": \"大韓民國은 民主共和國이다.\" }"
        },
        {
          "role": "user",
          "content": "대한민국은 민주공화국이다."
        },
        {
          "role": "assistant",
          "content": "{ \"hanjawords\": [\"대한민국大韓民國\", \"민주民主\", \"공화국共和國\"], \"result\": \"大韓民國은 民主共和國이다.\" }"
        },
        {
          "role": "user",
          "content": query,
        }
    ],
    temperature: 1,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

