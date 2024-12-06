import {useGameStore} from '@/store';
import {FC} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui';

export const GamesHistory: FC = () => {
	const gameHistory = useGameStore((s) => s.history);

	if (!gameHistory.length) {
		return null;
	}

	return (
		<>
			<h2 className="mt-8 text-lg font-semibold">
				Past games: <span className="text-muted-foreground">({gameHistory.length})</span>
			</h2>
			<Table className="mt-2 max-w-xl mx-auto">
				<TableHeader>
					<TableRow>
						<TableHead>Game</TableHead>
						<TableHead>Score</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{gameHistory.map((game, index) => (
						<TableRow key={index}>
							<TableCell>{index + 1}</TableCell>
							<TableCell>{game.score}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
