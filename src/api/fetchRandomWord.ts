export function fetchRandomWord(): Promise<string> {
	const VITE_API_NINJA_KEY = import.meta.env.VITE_API_NINJA_KEY;

	return fetch('https://api.api-ninjas.com/v1/randomword', {
		method: 'GET',
		headers: {
			'X-Api-Key': VITE_API_NINJA_KEY,
		},
	})
		.then((response) => response.json())
		.then((data) => data.word[0])
		.catch((error) => {
			console.error('Error fetching random word:', error);
		});
}
