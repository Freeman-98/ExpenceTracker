import { ExpenceTracker } from "./types";

export const datos: ExpenceTracker[] = [
    { id: 0, category:'Ingreso', detail: 'Venta de producto A', mount: 1500 },
    { id: 1, category:'Egreso', detail: 'Compra de suministros', mount: -500 },
    { id: 2, category:'Ingreso', detail: 'Venta de producto B', mount: 2000 },
    { id: 3, category:'Egreso', detail: 'Pago de servicios', mount: -300 },
    { id: 4, category:'Egreso', detail: 'Reembolso de cliente', mount: -200 }
];