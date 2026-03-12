// คลาสพื้นฐานสำหรับอุปกรณ์ไฟฟ้าในปากคลอง
export enum ComponentType {
  SOURCE = 'BATTERY_711', // แหล่งจ่ายไฟ
  WIRE = 'RUSTY_WIRE',    // สายไฟเก่าๆ สนิมเกาะ
  LOAD = 'NEON_SIGN',     // ป้ายไฟหน้าร้านดอกไม้
  SWITCH = 'RUSTY_SWITCH' // สวิตช์ไฟ
}

interface ElectricalNode {
  id: string;
  type: ComponentType;
  resistance: number;      // ความต้านทาน (Ohms)
  maxVoltage?: number;    // แรงดันสูงสุดที่รับได้ก่อนจะระเบิด
  isClosed?: boolean;     // สำหรับ Switch
}

interface Connection {
  from: string;
  to: string;
}

class PakKhlongCircuit {
  nodes: Map<string, ElectricalNode> = new Map();
  connections: Connection[] = [];

  // คำนวณความต้านทานรวม (แบบง่ายสำหรับ Series)
  // ในความยากระดับสูง คุณต้องใช้ Matrix ในการแก้กฎของ Kirchhoff
  calculateTotalResistance(): number {
    let totalR = 0;
    this.nodes.forEach(node => {
      totalR += node.resistance;
    });
    return totalR;
  }

  // ตรวจสอบสถานะการประทังชีวิต
  checkSystemStatus(inputVoltage: number) {
    const totalR = this.calculateTotalResistance();
    
    // กฎของ Ohm: I = V / R
    const current = inputVoltage / totalR;

    console.log(`⚡ กระแสไฟในระบบ: ${current.toFixed(2)} Amps`);

    for (let [id, node] of this.nodes) {
      if (node.maxVoltage && inputVoltage > node.maxVoltage) {
        return { status: 'EXPLODED', message: `💥 อุปกรณ์ ${id} ระเบิด! ไฟแรงเกินไปสำหรับเด็กปากคลอง` };
      }
    }

    if (current > 0 && current < 0.5) {
      return { status: 'DIM', message: '💡 ไฟหรี่... เหมือนอนาคตเด็กปากคลองตอนนี้' };
    }

    return { status: 'SUCCESS', message: '🌟 ไฟติดแล้ว! คืนนี้มีไฟขายพวงมาลัย!' };
  }
}
