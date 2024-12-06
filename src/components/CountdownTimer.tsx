import {useCountdownTimer} from '@/hooks';
import {useGameStore} from '@/store';
import {FC} from 'react';

export const CountdownTimer: FC = () => {
	const endTime = useGameStore((s) => s.endTime);
	const endGame = useGameStore((s) => s.endGame);
	const addGameToHistory = useGameStore((s) => s.addGameToHistory);
	const score = useGameStore((s) => s.score);

	const timer = useCountdownTimer(endTime, () => {
		addGameToHistory({score});
		endGame();
	});

	return (
		<div>
			{timer ? (
				<p>
					<b>{timer}</b> seconds left
				</p>
			) : (
				<p>Time's up!</p>
			)}
		</div>
	);
};
