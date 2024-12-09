import {FC} from 'react';
import {useGameStore} from './store/game';
import {IdleGame} from './components/IdleGame';
import {OngoingGame} from './components/OngoingGame';
import {GameOver} from './components/GameOver';
import {GameRoundCompleted} from './components/GameRoundCompleted';
import {usePreloadCardImages, useToastsManager} from './hooks';

export const App: FC = () => {
	const gameState = useGameStore((s) => s.state);

	useToastsManager();
	usePreloadCardImages();

	if (gameState === 'idle') {
		return <IdleGame />;
	}

	if (gameState === 'round-completed') {
		return <GameRoundCompleted />;
	}

	if (gameState === 'game-over') {
		return <GameOver />;
	}

	return <OngoingGame />;
};
