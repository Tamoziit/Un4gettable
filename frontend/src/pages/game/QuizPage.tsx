import { QuestionCard } from "../../components/game/QuestionCard";
import { QuizCompletion } from "../../components/game/QuizCompletion";
import { QuizHeader } from "../../components/game/QuizHeader";
import { ResultDisplay } from "../../components/game/resultDisplay";
import AppNavbar from "../../components/navbars/AppNavbar";
import { questions } from "../../constants/questions";
import { useQuiz } from "../../hooks/useQuiz";
import { calculatePoints } from "../../utils/gameHelper";

const QuizPage = () => {
    const { quizState, handleAnswerSelect, handleNextQuestion, resetQuiz } = useQuiz(questions);

    if (quizState.gameCompleted) {
        return (
            <>
                <AppNavbar />
                <div className="pt-22">
                    <QuizCompletion
                        userAnswers={quizState.userAnswers}
                        questions={questions}
                        points={quizState.points}
                        onResetQuiz={resetQuiz}
                    />
                </div>
            </>
        );
    }

    const currentQuestion = questions[quizState.currentQuestion];

    return (
        <>
            <AppNavbar />

            <div className="pt-22">
                <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
                    <QuizHeader
                        question={currentQuestion}
                        currentQuestion={quizState.currentQuestion}
                        totalQuestions={questions.length}
                        points={quizState.points}
                        streak={quizState.streak}
                    />

                    <QuestionCard
                        question={currentQuestion}
                        selectedAnswer={quizState.selectedAnswer}
                        showResult={quizState.showResult}
                        onAnswerSelect={handleAnswerSelect}
                    />

                    {quizState.showResult && quizState.selectedAnswer !== null && (
                        <ResultDisplay
                            question={currentQuestion}
                            selectedAnswer={quizState.selectedAnswer}
                            streak={quizState.streak}
                            earnedPoints={
                                quizState.selectedAnswer === currentQuestion.correct
                                    ? calculatePoints(currentQuestion.difficulty, Math.min(quizState.streak + 1, 5))
                                    : 0
                            }
                        />
                    )}

                    <div className="text-center">
                        {!quizState.showResult ? (
                            <button
                                onClick={handleNextQuestion}
                                disabled={quizState.selectedAnswer === null}
                                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center mx-auto ${quizState.selectedAnswer !== null
                                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg transform hover:scale-105'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Submit Answer
                                <span className="ml-2">→</span>
                            </button>
                        ) : (
                            <div className="flex items-center justify-center text-indigo-600">
                                <div className="animate-spin mr-2">⭐</div>
                                Moving to next question...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuizPage;