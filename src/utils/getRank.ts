import {Hand as HandType, Rank} from '@/types';
import {Hand} from 'pokersolver';

export function getRank(hand: HandType): Rank {
	const rank = Hand.solve(hand).name;
	return rank;
}
