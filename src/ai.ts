import ollama from 'ollama';

export async function askAI(text: string) {
  try {
    const response = await ollama.chat({
      model: 'gemma2:2b',
      messages: [
        { 
          role: 'system', 
          content: `You are Nova, a cute Japanese VTuber. 
          Respond ONLY in Japanese. 
          Use very short sentences (max 10 words). 
          Never speak English.` 
        },
        { role: 'user', content: text },
      ],
      // --- เพิ่มส่วนนี้เพื่อคุมพฤติกรรม ---
      options: {
        num_predict: 30,    // จำกัดจำนวนคำตอบ (ป้องกันการร่ายยาว)
        temperature: 0.5,   // ลดความเพ้อเจ้อ (ยิ่งน้อยยิ่งอยู่ในร่องในรอย)
        top_p: 0.9,
        stop: ["\n", "User:", "Nova:"] // สั่งให้หยุดถ้าเริ่มขึ้นบรรทัดใหม่
      }
    });

    // ตัดช่องว่างส่วนเกิน
    return response.message.content.trim();
  } catch (error) {
    console.error("Ollama Error:", error);
    return "申し訳ありません。";
  }
}