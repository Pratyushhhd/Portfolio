export default function TypingIndicator() {
    return (
        <div className="ai-msg">
            <div className="ai-avatar" aria-hidden="true">✦</div>
            <div className="chat-bubble ai typing" aria-label="Assistant is typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    );
}
