import axios from "axios";
import * as fs from "node:fs";

const player = require("play-sound")({});

const SPEAKER_ID = 14;

export async function speak(text: string) {
  try {
    // ใช้ 127.0.0.1 แทน localhost เพื่อเลี่ยงปัญหา IPv6
    const url = "http://127.0.0.1:50021";
    
    // 1. สร้าง Query
    const query = await axios.post(`${url}/audio_query?text=${encodeURIComponent(text)}&speaker=${SPEAKER_ID}`);
    
    // 2. สั่งสร้างเสียง
    const response = await axios.post(`${url}/synthesis?speaker=${SPEAKER_ID}`, query.data, {
      responseType: "arraybuffer",
    });

    const fileName = "voice.wav";
    fs.writeFileSync(fileName, Buffer.from(response.data));
    
    console.log("Nova is speaking...");
    player.play(fileName, (err: any) => {
      if (err) console.error("Play Error:", err);
    });
  } catch (error) {
    console.error("VOICEVOX Error: มั่นใจว่าเปิดโปรแกรม VOICEVOX อยู่ในเครื่องแล้วนะ?");
  }
}