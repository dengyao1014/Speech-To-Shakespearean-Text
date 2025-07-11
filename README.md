# Shakespearean Translator

A web application that translates modern English speech to Old Shakespearean English text.

![Shakespearean Translator](https://via.placeholder.com/800x400?text=Shakespearean+Translator)

## Features

- **Speech Recognition**: Converts your spoken words into text using the Web Speech API
- **Shakespearean Translation**: Transforms modern English into Shakespearean style using built-in transformation rules
- **Modern UI**: Clean, responsive design that works on desktop and mobile devices
- **Easy to Use**: Simple interface with clear instructions
- **No API Dependency**: Works completely offline with no request limits

## How to Use

1. Open the application in a supported browser (Chrome, Edge, or Safari recommended)
2. Click the "Start Recording" button and speak clearly
3. Your speech will be converted to text in the top text area
4. When you're finished speaking, click "Translate to Shakespearean"
5. The Shakespearean translation will appear in the bottom area
6. You can also type or edit text directly in the text box before translating

## Technical Details

This application uses:
- HTML5, CSS3, and JavaScript
- Web Speech API for speech recognition
- Custom translation algorithm with over 50 transformation rules
- jQuery for DOM manipulation
- Responsive design for all device sizes

## Translation Logic

The translation works by applying a set of rules to convert modern English phrases and words to their Shakespearean equivalents:

- Pronoun transformations (you → thee/thou)
- Verb form adjustments (have → hath, will → shalt)
- Vocabulary substitutions (friend → fellow)
- Adding period-appropriate phrases and exclamations
- Random stylistic elements to make each translation unique

## Local Development

To run the application locally:

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`

## Offline Usage

Once loaded, the application works completely offline since all translation is performed locally in the browser.

## Browser Compatibility

The speech recognition feature works best in:
- Google Chrome
- Microsoft Edge
- Safari

It may not work properly in Firefox or other browsers that don't fully support the Web Speech API.

## Credits

- Web Speech API
- Original concept inspired by Shakespearean literature

## License

MIT License 
