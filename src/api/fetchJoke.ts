export function fetchJoke(word: string): Promise<string> {
	const auth = `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`;

	return fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: auth,
		},
		body: JSON.stringify({
			model: 'gpt-4o',
			messages: [{role: 'user', content: 'Write funny joke based on this word: ' + word}],
		}),
	})
		.then((response) => response.json())
		.then((data) => data.choices[0].message.content);
}
