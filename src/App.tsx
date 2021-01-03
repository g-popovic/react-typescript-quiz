import React, { useState } from 'react';
import { fetchQuizQuestion, Difficulty, QuestionState } from './API';
import QuestionCard from './components/QuestionCard';

export type AnswerObject = {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [questionNum, setQuestionNum] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	async function startQuiz() {
		setLoading(true);
		setGameOver(false);
		setQuestions(await fetchQuizQuestion(TOTAL_QUESTIONS, Difficulty.MEDIUM));
		setScore(0);
		setUserAnswers([]);
		setQuestionNum(0);
		setLoading(false);
	}

	function checkAnswer(e: React.MouseEvent<HTMLButtonElement>) {
		if (!gameOver) {
			const answer = e.currentTarget.value;
			const correct = answer === questions[questionNum].correct_answer;

			if (correct) setScore(prev => prev + 1);

			const answerObj: AnswerObject = {
				answer,
				correct,
				correctAnswer: questions[questionNum].correct_answer,
				question: questions[questionNum].question
			};

			setUserAnswers(prev => [...prev, answerObj]);
		}
	}

	function nextQuestion() {
		setQuestionNum(prev => prev + 1);
	}

	return (
		<div className='App'>
			<h1>TYPESCRIPT REACT QUIZ</h1>
			{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
				<button className='start' onClick={startQuiz}>
					Start
				</button>
			) : null}
			{loading ? <p>Loading Questions...</p> : null}
			{gameOver || loading ? null : (
				<>
					<p className='score'>Score: {score}</p>
					<QuestionCard
						questionNum={questionNum + 1}
						question={questions[questionNum].question}
						answers={questions[questionNum].answers}
						callback={checkAnswer}
						totalQuestions={TOTAL_QUESTIONS}
						userAnswer={
							userAnswers ? userAnswers[questionNum] : undefined
						}
					/>
				</>
			)}
			{!gameOver &&
			!loading &&
			userAnswers.length === questionNum + 1 &&
			questionNum !== TOTAL_QUESTIONS - 1 ? (
				<button className='next' onClick={nextQuestion}>
					Next Question
				</button>
			) : null}
		</div>
	);
}

export default App;
