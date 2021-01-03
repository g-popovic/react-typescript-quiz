import React from 'react';
import { AnswerObject } from '../App';

type Props = {
	question: string;
	answers: string[];
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
	userAnswer: AnswerObject | undefined;
	questionNum: number;
	totalQuestions: number;
};

function QuestionCard(props: Props) {
	return (
		<div>
			<p className='number'>
				Question: {props.questionNum} / {props.totalQuestions}
			</p>
			<p>{props.question}</p>
			<div>
				{props.answers.map(answer => (
					<div key={Math.random()}>
						<button
							disabled={!!props.userAnswer}
							value={answer}
							onClick={props.callback}>
							<span>{answer}</span>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default QuestionCard;
