import * as readline from "node:readline";
import "dotenv/config";
import { askAI } from "./ai";
import { speak } from "./voice";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function chat() {
  // สร้าง Prompt รอรับคำถาม
  rl.question("You: ", async (msg) => {
    if (msg.toLowerCase() === "exit") {
      console.log("ปิดระบบ Nova แล้วค่ะ บ๊ายบาย!");
      rl.close();
      return;
    }

    console.log("Nova กำลังคิด...");
    
    try {
      // 1. ถาม Gemini
      const reply = await askAI(msg);
      console.log("Noava", reply);

      // 2. สั่งให้ Alice พูด (รอให้เจนไฟล์เสร็จก่อนค่อยรับคำถามถัดไป)
      await speak(reply);
      
    } catch (err) {
      console.error("Error:", err);
    }

    // 3. เรียกตัวเองซ้ำเพื่อให้วนลูปถามได้เรื่อยๆ
    chat();
  });
}

console.log("================================");
console.log("   Nova VTuber System Ready!   ");
console.log(" (พิมพ์ exit เพื่อออกจากโปรแกรม) ");
console.log("================================");

chat();