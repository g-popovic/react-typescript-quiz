import { shuffleArray } from './utils';

export type Question = {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
	HARD = 'hard',
	MEDIUM = 'medium',
	EASY = 'easy'
}

export async function fetchQuizQuestion(amount: number, difficulty: Difficulty) {
	const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=17&type=multiple`;
	const data = await (await fetch(endpoint)).json();
	return data.results.map((question: Question) => ({
		...question,
		answers: shuffleArray([
			question.correct_answer,
			...question.incorrect_answers
		])
	}));
}
