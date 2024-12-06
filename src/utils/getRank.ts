import {Hand as HandType, Rank} from '@/types';
import {Hand} from 'pokersolver';

export function getRank(hand: HandType): Rank {
	return Hand.solve(hand).name;
}
