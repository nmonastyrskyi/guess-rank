import {fetchJoke, fetchRandomWord} from '@/api';
import {FC, useEffect, useState} from 'react';
import {Button} from './ui';
import {useGameStore} from '@/store';

export const GamePaused: FC = () => {
	const [word, setWord] = useState<string>('');
	const [joke, setJoke] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const nextRound = useGameStore((s) => s.nextRound);

	useEffect(() => {
		getJoke();

		async function getJoke() {
			try {
				setIsLoading(true);
				const newWord = await fetchRandomWord();
				setWord(newWord);
				const newJoke = await fetchJoke(newWord);
				setJoke(newJoke);
			} catch (error) {
				console.error('Error fetching joke:', error);
			} finally {
				setIsLoading(false);
			}
		}
	}, []);

	return (
		<div className="text-center p-4 md:p-8 lg:p-16 xl:p-32">
			<p className="text-3xl text-green-700">Good game!</p>
			<p className="text-xl mt-4">5 seconds earned</p>

			<section className="mt-4 flex flex-col items-center">
				{isLoading ? (
					<p>Loading a joke...</p>
				) : (
					<>
						<p className="text-lg">
							Here's a joke for you by keyword: <b>{word}</b>
						</p>
						<p className="max-w-72 mt-4">{joke}</p>
					</>
				)}
			</section>
			<Button disabled={isLoading} className="mt-4 text-lg" size="lg" variant="outline" onClick={nextRound}>
				{isLoading ? "Don't click, wait for the joke" : 'Next round'}
			</Button>
		</div>
	);
};
