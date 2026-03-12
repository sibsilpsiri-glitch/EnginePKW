// ตัวอย่าง Logic การตรวจสอบวงจรแบบย่อ
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let components = [
    { x: 50, y: 300, type: 'source', voltage: 220 }, // แหล่งจ่ายไฟปากคลอง
    { x: 700, y: 300, type: 'target', requiredV: 12 } // หลอดไฟประทังชีวิต
];

// ฟังก์ชันคำนวณความต้านทานตามระยะลวด (ความยากอยู่ที่นี่)
function calculateResistance(length) {
    const resistivity = 0.05; // ค่าความต้านทานจำเพาะ
    return length * resistivity;
}

// ระบบวาดและเชื่อมต่อ (คุณต้องใช้ Event Listeners mousedown, mousemove)
// และใช้ Breadth-First Search (BFS) เพื่อเช็คว่า Source เชื่อมกับ Target หรือไม่
