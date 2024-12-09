import {FC} from 'react';
import {useGameStore} from '@/store';
import {Button, Card, Toaster} from '@/components/ui';
import {useToast} from '@/hooks';
import {CountdownTimer} from './CountdownTimer';

export const OngoingGame: FC = () => {
	const hand = useGameStore((s) => s.hand);
	const rankOptions = useGameStore((s) => s.rankOptions);
	const wrongRankGuesses = useGameStore((s) => s.wrongRankGuesses);
	const guessRank = useGameStore((s) => s.guessRank);
	const {toast, dismiss: dismissToast} = useToast();

	return (
		<div className="md:px-8 lg:px-16 xl:px-32">
			<header className="sticky top-0 z-10 bg-white p-4 pt-0 border-b border-b-gray-300 flex justify-center md:justify-end">
				<CountdownTimer />
			</header>
			<Toaster />
			<div className="flex flex-col items-center">
				<section className="w-full max-w-3xl">
					<ul className="flex gap-2 lg:gap-4 mt-4">
						{hand.map((card, index) => (
							<li key={card} className="opacity-0 flex-1 animate-slideIn" style={{'--delay': index * 0.1 + 's'}}>
								<Card card={card} />
							</li>
						))}
					</ul>
				</section>
				<section className="mt-8 flex flex-col items-center">
					<p className="text-lg text-center">Select the correct hand ranking:</p>
					<ul className="flex flex-col sm:flex-row gap-2 mt-2">
						{rankOptions.map((rank) => (
							<li key={rank}>
								<Button
									variant="outline"
									size="lg"
									className="text-lg w-full"
									disabled={wrongRankGuesses.includes(rank)}
									key={rank}
									onClick={async () => {
										dismissToast();

										const correctGuess = guessRank(rank);

										if (!correctGuess) {
											toast({
												title: 'Wrong ranking',
												description: '5 seconds subtracted from your time',
												variant: 'destructive',
											});
										}
									}}
								>
									{rank}
								</Button>
							</li>
						))}
					</ul>
				</section>
			</div>
		</div>
	);
};
