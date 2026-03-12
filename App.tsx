import React, { useEffect, useRef } from 'react';

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      // วาดบรรยากาศปากคลอง (Background)
      ctx.fillStyle = '#1a1a2e'; // คืนที่มืดมิด
      ctx.fillRect(0, 0, 800, 600);
      
      // วาดสายไฟ (แบบซับซ้อน)
      ctx.strokeStyle = '#4ecca3';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(100, 100);
      ctx.bezierCurveTo(200, 50, 300, 150, 400, 100); // สายไฟที่หย่อนยาน
      ctx.stroke();

      // ใส่ข้อความกวนๆ
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px Arial';
      ctx.fillText("ภารกิจ: ต่อสายไฟหนีน้ำท่วม", 50, 50);
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">ต่อไฟฟ้าประทังชีวิตเด็กปากคลอง v1.0</h1>
      <canvas ref={canvasRef} width={800} height={600} className="border-4 border-yellow-500" />
      <div className="mt-4 p-4 bg-gray-800 text-green-400">
        <p>> สถานะระบบ: กำลังเช็คความชื้นสัมพัทธ์...</p>
      </div>
    </div>
  );
};

export default GameCanvas;
