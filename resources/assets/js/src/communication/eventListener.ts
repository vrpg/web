import { GameMessage } from './gameMessage';

interface EventListener {
    onEvent(event: GameMessage): void;
}
export { EventListener }