# Shakespearean Translator

A web application that translates modern English speech to Old Shakespearean English text.

![Shakespearean Translator](https://via.placeholder.com/800x400?text=Shakespearean+Translator)

## Features

- **Speech Recognition**: Converts your spoken words into text using the Web Speech API
- **Shakespearean Translation**: Transforms modern English into Shakespearean style using the Fun Translations API
- **Modern UI**: Clean, responsive design that works on desktop and mobile devices
- **Easy to Use**: Simple interface with clear instructions

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
- Fun Translations API for Shakespearean translation
- jQuery for DOM manipulation
- Responsive design for all device sizes

## API Limitations

The Fun Translations API has the following limits on the free tier:
- 5 translations per hour
- 60 translations per day

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

## Browser Compatibility

The speech recognition feature works best in:
- Google Chrome
- Microsoft Edge
- Safari

It may not work properly in Firefox or other browsers that don't fully support the Web Speech API.

## Credits

- Web Speech API
- [Fun Translations API](https://funtranslations.com/)

## License

MIT License 
