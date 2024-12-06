import {FC} from 'react';
import {Card as CardType} from '@/types';
import {getCardUrl} from '@/utils';

interface CardProps {
	card: CardType;
}

export const Card: FC<CardProps> = ({card}) => {
	return <img className="max-w-36 w-full" src={getCardUrl(card)} alt={card} />;
};
