import { GameMessage } from './GameMessage';

interface EventListener {
    onEvent(event: GameMessage): void;
}

export { EventListener }
