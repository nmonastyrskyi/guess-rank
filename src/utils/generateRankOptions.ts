import {RANKS} from '@/constants';
import {Rank} from '@/types';

/**
 * Generate 3 rank options: the correct rank and 2 random incorrect ranks.
 *
 * @param correctRank The correct rank based on the hand.
 * @returns An array containing the correct rank and 2 random incorrect ranks, shuffled.
 */
export function generateRankOptions(correctRank: Rank): [Rank, Rank, Rank] {
	// Exclude the correct rank to create the pool of incorrect ranks
	const incorrectRanks = RANKS.filter((rank) => rank !== correctRank);

	// Shuffle the incorrect ranks to ensure randomness
	const shuffledIncorrectRanks = incorrectRanks.sort(() => Math.random() - 0.5);

	// Select the first two random ranks from the shuffled list
	const randomRanks = shuffledIncorrectRanks.slice(0, 2);

	// Combine the correct rank with the random incorrect ranks
	const rankOptions = [correctRank, randomRanks[0], randomRanks[1]] satisfies [Rank, Rank, Rank];

	// Shuffle the final array to randomize the position of the correct rank
	return rankOptions.sort(() => Math.random() - 0.5);
}
