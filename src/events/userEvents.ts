import { EventEmitter } from 'events';

export interface AppEvents {
    emailSent: (email: string, subject: string) => void;
}

class TypedEmitter extends EventEmitter {
    emit<K extends keyof AppEvents>(event: K, ...args: Parameters<AppEvents[K]>): boolean {
        return super.emit(event, ...args);
    }

    on<K extends keyof AppEvents>(event: K, listener: AppEvents[K]): this {
        return super.on(event, listener);
    }
}

export const appEmitter = new TypedEmitter();
