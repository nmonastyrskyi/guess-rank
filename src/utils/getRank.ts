import {Hand as HandType, Rank} from '@/types';
import {Hand} from 'pokersolver';

export function getRank(hand: HandType): Rank {
	const rank = Hand.solve(hand);

	if (rank.descr === 'Royal Flush') {
		return rank.descr as 'Royal Flush';
	}

	return rank.name;
}
