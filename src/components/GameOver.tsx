import {useGameStore} from '@/store';
import {FC} from 'react';
import {GamesHistory} from './GamesHistory';
import {Button} from '@/components/ui';

export const GameOver: FC = () => {
	const lastScore = useGameStore((s) => s.history[s.history.length - 1]?.score);
	const startGame = useGameStore((s) => s.startGame);
	const clearHistory = useGameStore((s) => s.clearHistory);

	return (
		<div className="flex flex-col  justify-center items-center md:px-8 lg:px-16 xl:px-32">
			<header className="w-full sticky top-0 p-4 bg-white border-b border-b-gray-300 flex justify-center md:justify-end">
				<Button variant="destructive" size="lg" className="mt-2" onClick={clearHistory}>
					Clear history
				</Button>
			</header>
			<div className="text-lg text-center mt-4">
				<p>Game Over, thanks for playing!</p>
				<p className="text-xl mt-2">Yo're score is:</p>
				<p className="text-2xl mt-1 font-bold">{lastScore}</p>
			</div>
			<Button className="mt-4" size="lg" onClick={startGame}>
				Play again
			</Button>

			<GamesHistory />
		</div>
	);
};
