export default function ChatMessage({ msg, onNavigate }) {
    const isError = msg.role === 'error';

    return (
        <div className={`chat-msg ${isError ? 'error' : msg.role}`}>
            {msg.role !== 'user' && (
                <div className="ai-avatar" aria-hidden="true">✦</div>
            )}
            <div className="chat-bubble">
                <p>{msg.text}</p>
                {msg.links && msg.links.length > 0 && (
                    <div className="msg-links">
                        {msg.links.map(l =>
                            l.type === 'section' ? (
                                <button
                                    key={l.label + l.target}
                                    type="button"
                                    className="msg-link"
                                    onClick={() => onNavigate(l.target)}
                                >
                                    {l.label} <span aria-hidden="true">→</span>
                                </button>
                            ) : (
                                <a
                                    key={l.label + l.target}
                                    className="msg-link"
                                    href={l.target}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {l.label} <span aria-hidden="true">↗</span>
                                </a>
                            )
                        )}
                    </div>
                )}
                {isError && msg.onRetry && (
                    <button type="button" className="msg-link retry" onClick={msg.onRetry}>
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}
