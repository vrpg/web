import { ISocketEnvelope } from '../proto/compiled';

interface EventListener {
    onEvent(event: ISocketEnvelope): void;
}

export { EventListener }
