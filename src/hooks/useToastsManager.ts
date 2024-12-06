import useEvent from 'react-use-event-hook';
import {useToast} from './use-toast';
import {useGameStore} from '@/store';
import {useEffect} from 'react';

export function useToastsManager() {
	const gameState = useGameStore((s) => s.state);

	const {dismiss: dismissToast} = useToast();
	const dismissToastEvent = useEvent(dismissToast);

	useEffect(
		function hideAllToastsWhenNotPlaying() {
			if (gameState !== 'playing') {
				dismissToastEvent();
			}
		},
		[dismissToastEvent, gameState],
	);
}
