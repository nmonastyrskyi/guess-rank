declare module 'pokersolver' {
	import {Rank, Hand as HandType} from './types';

	class Hand {
		static solve(hand: HandType): {
			name: Rank;
		};
	}
}
