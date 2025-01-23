import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

export async function POST(req: NextRequest) {
  try {
    const { places } = await req.json();

    const prompt = `
      주어진 장소 리스트를 바탕으로 비슷한 장소들을 추천해 여행 계획을 생성해주세요. 단, 주어진 리스트의 장소들과 동일한 장소면 안됩니다.(두 곳 정도 허용) 6장소 이상 추천해주세요.
      장소 리스트: ${places.map((place: any) => `${place.name} (${place.location}): ${place.description}`).join('; ')}
      여행 계획을 위한 각 추천 장소는 다음 형식을 따르십시오: 장소명 - 간단한 설명.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // 또는 'gpt-4'
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    const generatedText = completion.choices[0].message?.content?.trim();
    
    // 현재 시간으로 여행 시작 시간을 설정합니다.
    const startTime = new Date();

    const planItems = generatedText?.split('\n').map((item: string, index: number) => {
      const [name, ...descriptionParts] = item.split(' - ');
      const description = descriptionParts.join(' - ');

      // 각 장소 방문 시간은 일정 간격 (예: 1시간)을 추가하여 계산합니다.
      const visitTime = new Date(startTime.getTime());
      visitTime.setHours(startTime.getHours() + index);

      const formattedTime = `${visitTime.getHours()}시 ${visitTime.getMinutes()}분 도착 예정`;

      return {
        name: name.trim(),
        description: description.trim(),
        time: formattedTime,
      };
    }) || [];

    return NextResponse.json({ plan: planItems });
  } catch (error) {
    console.error('Error generating AI plan:', error);
    return NextResponse.json({ error: 'Failed to generate AI plan' }, { status: 500 });
  }
}
