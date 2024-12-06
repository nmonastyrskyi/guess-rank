import {useGameStore} from '@/store';
import {FC} from 'react';
import {GamesHistory} from './GamesHistory';
import {Button} from '@/components/ui';

export const GameOver: FC = () => {
	const lastScore = useGameStore((s) => s.history[s.history.length - 1]?.score);
	const startGame = useGameStore((s) => s.startGame);

	return (
		<div className="flex flex-col  justify-center items-center p-4 md:p-8 lg:p-16 xl:p-32">
			<div className="text-center">
				<p>Game Over, thanks for playing!</p>
				<p className="mt-2">
					Yo're score is: <b>{lastScore}</b>
				</p>
			</div>
			<Button className="mt-4" size="lg" onClick={startGame}>
				Play again
			</Button>
			<GamesHistory />
		</div>
	);
};
