export function fetchJoke(word: string): Promise<string> {
	if (import.meta.env.PROD) {
		return Promise.resolve("No funny joke, as don't want to expose API key");
	}

	return fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
		},
		body: JSON.stringify({
			model: 'gpt-4o',
			messages: [{role: 'user', content: 'Write funny joke based on this word: ' + word}],
		}),
	})
		.then((response) => response.json())
		.then((data) => data.choices[0].message.content);
}
