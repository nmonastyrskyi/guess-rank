# Guess the ranking game

## Description
Hi there! You're welcome to my assignment for the Guess the Rankg game. 

## How to run
1. Clone the repository
2. Run `pnpm install` to install the dependencies
3. Create a `.env` file in the root directory and add the following API keys:
    - `VITE_API_NINJA_KEY` - API Ninja API key
      - You can get the API key by registering at [API Ninja](https://api-ninjas.com/)
    - `VITE_OPEN_AI_KEY` - OpenAI API URL
      - You can get the API URL by registering at [OpenAI](https://platform.openai.com/) 

> [!IMPORTANT]
If you have any issues with the API keys, please let me know, I can provide you with the keys.
4. Run `pnpm dev` to start the development server
5. Enjoy your game at `http://localhost:5173/` :)
   
## Tools used
- `Vite` as the build tool
- `React` as the frontend library
- `zustand` for state management
- `TailwindCSS` and `shadcn/ui` for styling
- Simple fetch for API calls
- `pokersolver` for the poker hand evaluation
- `OpenAI API` for generating the jokes after the each round

Additionally:
- `https://deckofcardsapi.com` - for the deck of cards UI
- `react-use-event-hook` - as a simple useEvent hook