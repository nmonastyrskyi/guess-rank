import {useEffect, useState} from 'react';
import useEvent from 'react-use-event-hook';

const DEFAULT_UPDATE_INTERVAL_MS = 200;

/**
 * Computes the remaining time in seconds for a countdown timer.
 *
 * @param endTime timestamp indicating when the countdown ends.
 */
const calculateRemainingTimeInSeconds = (endTime: number): number => {
	if (!endTime || Date.now() > new Date(endTime).getTime()) {
		return 0; // Return 0 when time is up
	}

	const timeLeftInMs = new Date(endTime).getTime() - Date.now();
	return Math.ceil(timeLeftInMs / 1000); // Convert milliseconds to seconds
};

/**
 * Countdown timer hook.
 *
 * @param endTime Timestamp indicating when the countdown ends.
 * @param onComplete Callback function to be called when the countdown reaches 0.
 *
 * @returns The time left in seconds until the endTime, updated at the specified interval.
 */
export const useCountdownTimer = (endTime: number, onComplete: () => void): number | undefined => {
	const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(() => calculateRemainingTimeInSeconds(endTime));

	const onCompleteEvent = useEvent(onComplete);

	useEffect(() => {
		// Set initial value immediately
		const initialTime = calculateRemainingTimeInSeconds(endTime);
		setRemainingTimeInSeconds(initialTime);

		if (initialTime === 0) {
			onCompleteEvent();
			return;
		}

		const intervalId = setInterval(() => {
			const newTime = calculateRemainingTimeInSeconds(endTime);
			if (newTime === 0) {
				onCompleteEvent();
				clearInterval(intervalId); // Stop timer
			}

			setRemainingTimeInSeconds(newTime);
		}, DEFAULT_UPDATE_INTERVAL_MS);

		return () => {
			clearInterval(intervalId);
		};
	}, [endTime, onCompleteEvent]);

	return remainingTimeInSeconds;
};
