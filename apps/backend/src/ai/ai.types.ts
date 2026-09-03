export interface IHistory {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface MistralResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}
