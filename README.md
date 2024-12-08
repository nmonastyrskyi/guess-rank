# Guess the Ranking Game


## Description
Hi there! Welcome to my assignment for the Guess the Rank game.

## Demo
You can check out the live demo of the project [here](https://nmonastyrskyi.github.io/guess-rank/).


## How to Run
1. Clone the repository:
    ```sh
    git clone https://github.com/nmonastyrskyi/guess-rank.git
    ```
2. Navigate to the project directory:
    ```sh
    cd guess-rank
    ```
3. Install the dependencies:
    ```sh
    pnpm install
    ```
4. Create a `.env` file in the root directory and add the following API keys:
    - `VITE_API_NINJA_KEY` - API Ninja API key
      - You can get the API key by registering at [API Ninja](https://api-ninjas.com/)
    - `VITE_OPEN_AI_KEY` - OpenAI API URL
      - You can get the API URL by registering at [OpenAI](https://platform.openai.com/)
    ```env
    VITE_API_NINJA_KEY=your_api_ninja_key
    VITE_OPEN_AI_KEY=your_open_ai_key
    ```
> [!IMPORTANT]
If you have any issues with the API keys, please let me know, I can provide you with the keys.

5. Start the development server:
    ```sh
    pnpm dev
    ```
6. Enjoy your game at `http://localhost:5173/` :)

## Tools Used
- `Vite` as the build tool
- `React` as the frontend library
- `zustand` for state management
- `TailwindCSS` and `shadcn/ui` for styling
- Simple fetch for API calls
- `pokersolver` for the poker hand evaluation
- `OpenAI API` for generating the jokes after each round

Additionally:
- `https://deckofcardsapi.com` - for the deck of cards UI
- `react-use-event-hook` - as a simple useEvent hook