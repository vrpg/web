import { SocketMessage as GameMessage } from '../proto/compiled';

interface EventListener {
    onEvent(event: GameMessage): void;
}

export { EventListener }
