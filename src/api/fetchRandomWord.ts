export function fetchRandomWord(): Promise<string> {
	if (import.meta.env.PROD) {
		return Promise.resolve("No funny word, as don't want to expose API key");
	}

	return fetch('https://api.api-ninjas.com/v1/randomword', {
		method: 'GET',
		headers: {
			'X-Api-Key': import.meta.env.VITE_API_NINJA_KEY,
		},
	})
		.then((response) => response.json())
		.then((data) => data.word[0])
		.catch((error) => {
			console.error('Error fetching random word:', error);
		});
}
