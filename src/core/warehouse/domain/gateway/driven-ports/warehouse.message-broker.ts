import { ClientProxy } from '@nestjs/microservices';

export abstract class WarehouseMessageBrokerPort extends ClientProxy {}
export const warehouseMessageBrokerDiToken = Symbol('WAREHOUSE_MESSAGE_BROKER');
