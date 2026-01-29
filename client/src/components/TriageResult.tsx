'use client';

interface TriageResultProps {
    status: 'EMERGENCY' | 'MEDIUM' | 'NORMAL';
}

export default function TriageResult({ status }: TriageResultProps) {
    const styles = {
        EMERGENCY: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500', icon: '🚨' },
        MEDIUM: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500', icon: '⚠️' },
        NORMAL: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500', icon: '✅' }
    };

    const current = styles[status] || styles.NORMAL;

    return (
        <div className={`p-4 rounded-lg border-l-4 ${current.bg} ${current.border} flex items-center gap-3`}>
            <span className="text-2xl">{current.icon}</span>
            <div>
                <h4 className={`font-bold ${current.text}`}>Triage Status: {status}</h4>
                <p className={`text-sm ${current.text}`}>
                    {status === 'EMERGENCY'
                        ? 'Immediate medical attention required.'
                        : status === 'MEDIUM'
                            ? 'Priority consultation recommended.'
                            : 'Standard consultation queue.'}
                </p>
            </div>
        </div>
    );
}
