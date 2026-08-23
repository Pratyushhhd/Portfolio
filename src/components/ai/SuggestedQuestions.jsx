export default function SuggestedQuestions({ questions, onPick }) {
    return (
        <div className="chat-suggestions" role="list" aria-label="Suggested questions">
            {questions.map(q => (
                <button key={q} type="button" role="listitem" className="chat-chip" onClick={() => onPick(q)}>
                    {q}
                </button>
            ))}
        </div>
    );
}
