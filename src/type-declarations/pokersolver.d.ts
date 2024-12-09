declare module 'pokersolver' {
	import {Rank, Hand as HandType} from './types';

	class Hand {
		static solve(hand: HandType): {
			name: Exclude<Rank, 'Royal Flush'>;
			/**  (strng & {}) enables IntelliSense to suggest 'Royal Flush' as a possible value (https://stackoverflow.com/questions/61047551/typescript-union-of-string-and-string-literals)*/
			descr: 'Royal Flush' | (string & {});
		};
	}
}
