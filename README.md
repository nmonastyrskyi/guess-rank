# Guess the Ranking Game

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Live Demo

<div align="center">
  <h3>
    <a href="https://nmonastyrskyi.github.io/guess-rank/" target="_blank">
      👉 Try the Game Now! 👈
    </a>
  </h3>
</div>

> [!NOTE]
> The demo is hosted on GitHub Pages. API features (random word and joke generation) are disabled to protect API keys.

> [!TIP]
> For full functionality, including API features, run the project locally using the instructions below.

## Description
Hi there! Welcome to my assignment for the Guess the Rank game.

## Game Rules
1. You'll be presented with a poker hand
     - 5 cards are dealt from a standard 52-card deck
     - Each rank has an equal chance of appearing
2. Your goal is to guess the correct ranking of the hand
     - The ranking can be anything from a high card to a royal flush
3. Each correct guess earns you 1 point and adds a 5 second bonus to the timer
4. Each incorrect guess subtracts 5 seconds from the timer
5. The game continues until the timer runs out
6. Try to achieve the highest score possible!

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