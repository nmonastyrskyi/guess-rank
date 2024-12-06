import {CARD_SUITS, CARD_VALUES} from '@/constants';
import {Card} from '@/types';
import {useEffect} from 'react';

function preloadImage(src: string) {
	const img = new Image();
	img.src = src;
}

function getCardUrl(card: Card): string {
	return `https://deckofcardsapi.com/static/img/${card.replace('T', '0')}.png`;
}

export function usePreloadCardImages() {
	useEffect(() => {
		CARD_VALUES.forEach((cardValue) => {
			CARD_SUITS.forEach((cardSuit) => {
				preloadImage(getCardUrl(`${cardValue}${cardSuit}`));
			});
		});
	}, []);
}
