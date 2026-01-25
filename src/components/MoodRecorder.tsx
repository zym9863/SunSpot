import { useEffect, useState } from 'react';

type MoodType = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'rainbow';

interface MoodOption {
    type: MoodType;
    icon: string;
    label: string;
}

interface MoodRecord {
  date: string;
  mood: MoodType;
  note: string;
  timestamp: number;
}

const moodOptions: MoodOption[] = [
    { type: 'sunny', icon: '☀️', label: '阳光灿烂' },
    { type: 'cloudy', icon: '⛅', label: '略有阴霾' },
    { type: 'rainy', icon: '🌧️', label: '心有小雨' },
    { type: 'stormy', icon: '⛈️', label: '暴风骤雨' },
    { type: 'rainbow', icon: '🌈', label: '雨后彩虹' },
];

const moodOptionMap = moodOptions.reduce((acc, option) => {
  acc[option.type] = option;
  return acc;
}, {} as Record<MoodType, MoodOption>);

export default function MoodRecorder() {
    const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
    const [note, setNote] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedRecord, setSavedRecord] = useState<MoodRecord | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const existingData = localStorage.getItem('sunspot-moods');
    if (!existingData) return;

    try {
      const moods = JSON.parse(existingData) as MoodRecord[];
      const todayRecord = moods
        .filter((record) => record.date === today)
        .sort((a, b) => b.timestamp - a.timestamp)[0];

      if (todayRecord) {
        setSavedRecord(todayRecord);
        setSelectedMood(todayRecord.mood);
        setNote(todayRecord.note || '');
      }
    } catch {
      // 忽略解析错误
    }
  }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMood) return;

        // 保存到本地存储
        const today = new Date().toISOString().split('T')[0];
        const moodData: MoodRecord = {
            date: today,
            mood: selectedMood,
            note,
            timestamp: Date.now(),
        };

        const existingData = localStorage.getItem('sunspot-moods');
        const moods = existingData ? (JSON.parse(existingData) as MoodRecord[]) : [];
        const nextMoods = moods.filter((record) => record.date !== today);
        nextMoods.push(moodData);
        localStorage.setItem('sunspot-moods', JSON.stringify(nextMoods));

        setSavedRecord(moodData);

        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setSelectedMood(null);
            setNote('');
        }, 2000);
    };

    return (
        <div className="mood-recorder">
          <h3 className="mood-title">今天的心理天气</h3>
          <p className="mood-subtitle">选择一种天气，写下心里的一句。</p>

            <form onSubmit={handleSubmit}>
                <div className="mood-options">
                    {moodOptions.map((option) => (
                        <button
                            key={option.type}
                            type="button"
                            className={`mood-btn ${selectedMood === option.type ? 'selected' : ''}`}
                            onClick={() => setSelectedMood(option.type)}
                            title={option.label}
                        >
                            <span className="mood-icon">{option.icon}</span>
                            <span className="mood-label">{option.label}</span>
                        </button>
                    ))}
                </div>

                <textarea
                    className="mood-note"
                    placeholder="记录一下今天的心情..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                />

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={!selectedMood || isSubmitted}
                >
                    {isSubmitted ? '✓ 已记录' : '记录心情'}
                </button>
            </form>

              {savedRecord && (
                <div className="mood-summary">
                  <div className="summary-header">
                    <span className="summary-icon">{moodOptionMap[savedRecord.mood].icon}</span>
                    <div className="summary-text">
                      <div className="summary-label">{moodOptionMap[savedRecord.mood].label}</div>
                      <div className="summary-date">今天已记录</div>
                    </div>
                  </div>
                  {savedRecord.note && (
                    <p className="summary-note">“{savedRecord.note}”</p>
                  )}
                </div>
              )}

            <style>{`
        .mood-recorder {
          padding: var(--spacing-lg);
          background: var(--surface);
          backdrop-filter: blur(22px);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          position: relative;
          overflow: hidden;
        }

        .mood-recorder::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(280px circle at 90% 0%, color-mix(in srgb, var(--primary) 30%, transparent), transparent 60%);
          opacity: 0.7;
          pointer-events: none;
        }

        .mood-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--ink);
          font-family: var(--font-display);
        }

        .mood-subtitle {
          font-size: 0.92rem;
          color: var(--text-muted);
          margin-bottom: var(--spacing-md);
        }

        .mood-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
          position: relative;
          z-index: 1;
        }

        .mood-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: var(--spacing-sm);
          background: var(--surface-strong);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 100px;
        }

        .mood-btn:hover {
          background: var(--surface);
          transform: translateY(-2px);
          border-color: var(--border-strong);
        }

        .mood-btn.selected {
          border-color: var(--primary);
          background: linear-gradient(135deg, color-mix(in srgb, var(--primary) 40%, transparent), rgba(255, 255, 255, 0.85));
          box-shadow: 0 12px 26px rgba(61, 40, 20, 0.18);
        }

        .mood-icon {
          font-size: 2.2rem;
        }

        .mood-label {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .mood-note {
          width: 100%;
          padding: var(--spacing-sm);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 1rem;
          resize: vertical;
          background: rgba(255, 255, 255, 0.6);
          transition: all 0.2s ease;
        }

        .mood-note:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 30%, transparent);
        }

        .submit-btn {
          width: 100%;
          margin-top: var(--spacing-md);
          padding: 0.85rem var(--spacing-md);
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          background: linear-gradient(135deg, var(--primary), var(--primary-strong));
          border: none;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 12px 24px rgba(61, 40, 20, 0.18);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 18px 32px rgba(61, 40, 20, 0.24);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .mood-summary {
          margin-top: var(--spacing-md);
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.68);
          border: 1px dashed var(--border-strong);
        }

        .summary-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .summary-icon {
          font-size: 1.8rem;
        }

        .summary-label {
          font-weight: 700;
          color: var(--ink);
        }

        .summary-date {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .summary-note {
          margin-top: var(--spacing-sm);
          font-size: 0.95rem;
          color: var(--text);
          line-height: 1.6;
        }
      `}</style>
        </div>
    );
}
