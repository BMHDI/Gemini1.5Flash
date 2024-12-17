# AI Coding Assistant

This tutorial introduces the learner to the ChatGPT API by walking through how to make an AI Coding Assistant.

Use this repository for the tutorial!

- [AI Coding Assistant](#ai-coding-assistant)
  - [Setup](#setup)
    - [Creating an Account](#creating-an-account)
    - [Getting an API Key](#getting-an-api-key)
    - [Saving your API Key](#saving-your-api-key)
    - [Initialize and Install OpenAI](#initialize-and-install-openai)
    - [Using the import](#using-the-import)
  - [Exercise 1](#exercise-1)
    - [File contents](#file-contents)
    - [Additional Setup](#additional-setup)
    - [Checkpoint 1.1](#checkpoint-11)
    - [Refining output / Checkpoint 1.2](#refining-output--checkpoint-12)
  - [Exercise 2](#exercise-2)
    - [Implementing user input](#implementing-user-input)
      - [Solution Hint](#solution-hint)
      - [Checkpoint 2.1](#checkpoint-21)
    - [Adding system input](#adding-system-input)
      - [Checkpoint 2.2](#checkpoint-22)
  - [Exercise 3](#exercise-3)
    - [Passing in sample code using fs](#passing-in-sample-code-using-fs)
      - [Checkpoint 3.1](#checkpoint-31)
    - [Bringing user input back / Checkpoint 3.2](#bringing-user-input-back--checkpoint-32)
    - [Extra Spicy Challenge](#extra-spicy-challenge)
- [Further Reading](#further-reading)

## Setup

### Creating an Account

In order to use the ChatGPT API, you will need an openai account.

Navigate to the [goggle cloude API page](https://ai.google.dev/gemini-api/docs) and Click on Get Started. Create an account.

### Getting an API Key

After creating your account, navigate to the API keys section.

Create your own key, or use the one provided to you.

### Saving your API Key

On the root directory of your project, create an `.env` file. Add the following contents:

```
GOOGLE_AI_API_KEY=<your api key here>
```

replacing `<your api key here>` with your key.

### Initialize and Install OpenAI

Run:

```
npm init -y
npm install googleapis
npm install dotenv

```

Add the following line in the root object within `package.json`:

```
    "type": "module"
```

This allows you to use the import syntax present on the following section.

### Using the import

Import the openai package using the following lines on a js file.
```
import OpenAI from "openai"

const openai = new OpenAI()
```
The above code is only an illustration--no need to use the above code for this tutorial.

[[Back to top](#ai-coding-assistant)]

## Exercise 1

For Exercise 1, we will run the setup and test our integration to the ChatGPT API. _There will be no dynamic user input yet_.

### File contents

Complete the setup and create the following file:

```

import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

// Set up the Gemini API client
const gemini = google.gemini('v1.5');

// Create an instance of the Gemini client with your API Key
const geminiClient = gemini({
  apiKey: process.env.GEMINI_API_KEY,
});

```

### Additional Setup

Name the above file `assistant.js`.
Change the main property in `package.json` to `"main":"assistant.js"`.

### Checkpoint 1.1

Run the file using the following command:

```
node assistant.js
```

When running the test command, the output should be similar to the following output:

```
Assistant is typing...

{
  id: 'chatcmpl-8UTWRUDVWX6IZXMTrTCqDv6H0DGC0',
  object: 'chat.completion',
  created: 1702274015,
  model: 'gpt-3.5-turbo-0613',
  choices: [ { index: 0, message: [Object], finish_reason: 'stop' } ],
  usage: { prompt_tokens: 13, completion_tokens: 7, total_tokens: 20 },
  system_fingerprint: null
}
```

### Refining output / Checkpoint 1.2

Edit the console log such that the message from ChatGPT is the only response like so:

```
c11-chatgpt % node assistant.js
Assistant is typing...

How can I assist you today?
```

_(Assistant output may vary)_

[[Back to top](#ai-coding-assistant)]

## Exercise 2

Now that we are using the ChatGPT API, let's _extend the app so that it takes user input_. For Exercise 2, we will pass in code which we want ChatGPT to analyze.

### Implementing user input

We will be implementing user input using the cli.
Edit the code to add `process.argv[2]`, which is the first input on the command line, as a message to send to ChatGPT.

Read the [Chat Completions API](https://platform.openai.com/docs/guides/text-generation/chat-completions-api) to determine how to add a new message to your current completion.

#### Solution Hint

```
{"role": "user", "content": process.argv[2]}
```

#### Checkpoint 2.1

Your app should take user input, but not specifically as a coding assistant.

```
c11-chatgpt % node assistant.js "Can you give me the history of the Turing Test?"
Assistant is typing...

The Turing Test, proposed by the British mathematician and computer scientist Alan Turing...
```

_(Assistant output may vary)_

### Adding system input

You can add or change system input to the chat in order to specify that you are looking for coding assistance.

Again, you may refer to [Chat Completions API](https://platform.openai.com/docs/guides/text-generation/chat-completions-api) if you get stuck.

#### Checkpoint 2.2

The app should take user input which it interprets as javascript code. If there is no error, the app should say just that. If there is a possible error, the app should respond with the solution.

```
c11-chatgpt % node assistant.js "function sayHelloWorld() { console.log('hello world') }; sayHelloWorld()"
Assistant is typing...

There is no error in the provided code.
```

_(Assistant output may vary)_

[[Back to top](#ai-coding-assistant)]

## Exercise 3

Passing in code as a string is only a small fraction of what you can do with the ChatGPT API as a coding assistant. Ideally, we want to be able to pass in file contents.

The purpose of Exercise 3 is to be able to extend our integration in order to take advantage of the ChatGPT API beyond what is possible with the ChatGPT UI.

### Passing in sample code using fs

Let's use node's `fs` module to read the file URL you pass as input. Learn more using this [documentation](https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/). Or, you know... Use ChatGPT to help you.

#### Checkpoint 3.1

```
c11-chatgpt % node assistant.js sampleCode.js
Assistant is typing...

There is no error in the provided code.
```

_(Assistant output may vary)_

### Bringing user input back / Checkpoint 3.2

You may want to provide further context for your code. Implement the functionality below:

```
c11-chatgpt % node assistant2.js sampleCode.js "If there's no error, please let me know what I need to do to export the sayHelloWorld function to another file."
Assistant is typing...

To export the `sayHelloWorld` function to another file, you can use ...
```

_(Assistant output may vary)_

Refer to [Chat Completions API](https://platform.openai.com/docs/guides/text-generation/chat-completions-api) if you get stuck.

### Extra Spicy Challenge

Want an extra challenge? Train your model to talk like a caveman, and make caveman analogies. Learn more on the [Fine Tuning API](https://platform.openai.com/docs/guides/fine-tuning) documention. Have fun!

[[Back to top](#ai-coding-assistant)]

# Further Reading

* [Article on a Caveman Coding Assistant built using ChatGPT](https://medium.com/bacic/grug-dev-gpt-answers-most-popular-questions-on-stackoverflow-5c2b8dbc2394)
* [Writing better prompts](https://www.promptingguide.ai/)
* [AI Driven Development Masterclass](https://www.youtube.com/watch?v=iO1mwxPNP5A)
