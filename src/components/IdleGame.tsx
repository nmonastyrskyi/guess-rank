import {FC} from 'react';
import {Button} from '@/components/ui';
import {useGameStore} from '@/store/game';

export const IdleGame: FC = () => {
	const startGame = useGameStore((s) => s.startGame);

	return (
		<div className="w-full h-full flex justify-center items-center flex-col p-4 md:p-8 lg:p-16 xl:p-32">
			<Button className="text-5xl min-w-72 min-h-20" onClick={startGame}>
				Let's play
			</Button>
		</div>
	);
};
