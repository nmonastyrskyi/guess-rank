import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {
	DEFAULT_HAND,
	DEFAULT_RANK,
	GAME_TIMEOUT_IN_SECONDS,
	RIGHT_ANSWER_TIME_BONUS_IN_SECONDS,
	WRONG_ANSWER_TIME_PENALTY_IN_SECONDS,
} from '@/constants';
import {Hand, Rank} from '@/types';
import {generateHand, generateRankOptions, getRank} from '@/utils';

interface GameStoreState extends GameStoreProps {
	startGame: () => void;
	nextRound: () => void;
	endGame: () => void;
	/**
	 * @param rank The rank to guess
	 * @returns true if the rank is correct, false otherwise
	 */
	guessRank: (rank: Rank) => boolean;
	addGameToHistory: (entry: GameHistoryEntry) => void;
	clearHistory: () => void;
}

interface GameStoreProps {
	state: GameState;
	/** Hand of 5 cards, changed every round */
	hand: Hand;
	/** 3 rank options: the correct rank and 2 random incorrect ranks */
	rankOptions: [Rank, Rank, Rank];
	/** Wrongly guessed ranks per round */
	wrongRankGuesses: Rank[];
	/** Number of correct guesses */
	score: number;
	/** The rank of the current hand */
	currentRank: Rank;
	/** Timestamp when the game started */
	startTime: number;
	/** Timestamp when the game ends */
	endTime: number;
	/** Timestamp when the game is on pause */
	pauseTime: number;
	history: GameHistoryEntry[];
	settings: {
		timeoutInSeconds: number;
		rightAnswerTimeBonusInSeconds: number;
		wrongAnswerTimePenaltyInSeconds: number;
	};
}

interface GameHistoryEntry {
	/** Number of correct guesses */
	score: number;
}

type GameState = 'idle' | 'playing' | 'game-over' | 'round-completed';

const defaultGameStoreProps: GameStoreProps = {
	state: 'idle',
	hand: DEFAULT_HAND,
	history: [],
	wrongRankGuesses: [],
	rankOptions: [DEFAULT_RANK, DEFAULT_RANK, DEFAULT_RANK],
	currentRank: DEFAULT_RANK,
	score: 0,
	startTime: Date.now(),
	endTime: Date.now(),
	pauseTime: Date.now(),
	settings: {
		timeoutInSeconds: GAME_TIMEOUT_IN_SECONDS,
		rightAnswerTimeBonusInSeconds: RIGHT_ANSWER_TIME_BONUS_IN_SECONDS,
		wrongAnswerTimePenaltyInSeconds: WRONG_ANSWER_TIME_PENALTY_IN_SECONDS,
	},
};

export const useGameStore = create(
	persist<GameStoreState>(
		(set, get) => ({
			...defaultGameStoreProps,

			// Actions
			startGame: () => {
				const hand = generateHand();
				const timeoutInSeconds = get().settings.timeoutInSeconds;
				const currentRank = getRank(hand);
				const rankOptions = generateRankOptions(currentRank);
				const startTime = Date.now();
				const endTime = new Date(startTime + timeoutInSeconds * 1000).getTime();

				set({
					state: 'playing',
					hand,
					rankOptions,
					currentRank,
					startTime,
					endTime,
					wrongRankGuesses: [],
					score: 0,
				});
			},
			endGame: () => {
				set({
					state: 'game-over',
					score: 0,
				});
			},
			nextRound: () => {
				const {pauseTime, endTime} = get();
				const timeBeingPaused = Date.now() - pauseTime;
				const newEndTime = endTime + timeBeingPaused;

				const hand = generateHand();
				const newCurrentRank = getRank(hand);
				const rankOptions = generateRankOptions(newCurrentRank);

				set({
					state: 'playing',
					hand,
					rankOptions,
					currentRank: newCurrentRank,
					endTime: newEndTime,
				});
			},
			addGameToHistory: (entry: GameHistoryEntry) => {
				set((state) => {
					const {history} = state;
					return {...state, history: [...history, entry]};
				});
			},
			guessRank: (rank: Rank) => {
				const {currentRank} = get();

				if (rank === currentRank) {
					return rightGuess();
				} else {
					return wrongGuess();
				}

				function rightGuess() {
					addTimeBonus();
					completeRound();
					return true;
				}

				function wrongGuess() {
					addTimePenalty();
					saveWrongGuess();
					return false;
				}

				function completeRound() {
					set((state) => {
						return {
							...state,
							state: 'round-completed',
							score: state.score + 1,
							wrongRankGuesses: [],
							pauseTime: Date.now(),
						};
					});
				}

				function saveWrongGuess() {
					set((state) => {
						const {wrongRankGuesses} = state;
						return {...state, wrongRankGuesses: [...wrongRankGuesses, rank]};
					});
				}

				function addTimeBonus() {
					set((state) => {
						const {
							endTime,
							settings: {rightAnswerTimeBonusInSeconds},
						} = state;

						const timeBonus = rightAnswerTimeBonusInSeconds * 1000;
						const newEndTime = new Date(endTime + timeBonus).getTime();
						return {...state, endTime: newEndTime};
					});
				}

				function addTimePenalty() {
					set((state) => {
						const {
							endTime,
							settings: {wrongAnswerTimePenaltyInSeconds},
						} = state;

						const newEndTime = new Date(endTime - wrongAnswerTimePenaltyInSeconds * 1000).getTime();
						return {...state, endTime: newEndTime};
					});
				}
			},
			clearHistory: () => {
				set({
					history: [],
					state: 'idle',
				});
			},
		}),
		{
			name: 'game-storage',
		},
	),
);
