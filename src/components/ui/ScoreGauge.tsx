interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

function getScoreColor(score: number): string {
  if (score >= 85) return '#107C10';
  if (score >= 75) return '#0F6CBD';
  if (score >= 65) return '#FFB900';
  if (score >= 50) return '#C13515';
  return '#D13438';
}

function getScoreLabel(score: number): string {
  if (score >= 85) return 'Excellent';
  if (score >= 75) return 'Strong';
  if (score >= 65) return 'Acceptable';
  if (score >= 50) return 'Marginal';
  return 'Deficient';
}

export default function ScoreGauge({ score, size = 'md', showLabel = true, label }: ScoreGaugeProps) {
  const color = getScoreColor(score);
  const rating = getScoreLabel(score);

  const sizes = {
    sm: { r: 28, stroke: 5, fontSize: '14px', labelSize: '10px', svgSize: 72 },
    md: { r: 44, stroke: 7, fontSize: '22px', labelSize: '11px', svgSize: 104 },
    lg: { r: 64, stroke: 9, fontSize: '32px', labelSize: '13px', svgSize: 152 },
  };

  const s = sizes[size];
  const circumference = 2 * Math.PI * s.r;
  const dashArray = circumference * 0.75; // 270 degrees
  const dashOffset = dashArray * (1 - score / 100);
  const center = s.svgSize / 2;

  const startAngle = 135;
  const endAngle = startAngle + (score / 100) * 270;
  const endRad = (endAngle * Math.PI) / 180;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: s.svgSize, height: s.svgSize }}>
        <svg width={s.svgSize} height={s.svgSize} viewBox={`0 0 ${s.svgSize} ${s.svgSize}`}>
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={s.r}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth={s.stroke}
            strokeDasharray={`${dashArray} ${circumference - dashArray}`}
            strokeDashoffset={circumference * 0.125}
            strokeLinecap="round"
            transform={`rotate(0, ${center}, ${center})`}
            style={{ transformOrigin: `${center}px ${center}px`, transform: 'rotate(135deg)' }}
          />

          {/* Score arc */}
          <circle
            cx={center}
            cy={center}
            r={s.r}
            fill="none"
            stroke={color}
            strokeWidth={s.stroke}
            strokeDasharray={`${dashArray * (score / 100)} ${circumference}`}
            strokeLinecap="round"
            style={{
              transformOrigin: `${center}px ${center}px`,
              transform: 'rotate(135deg)',
              transition: 'stroke-dasharray 0.8s ease-out',
            }}
          />

          {/* Score text */}
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#0F172A"
            fontFamily="IBM Plex Sans, sans-serif"
            fontSize={s.fontSize}
            fontWeight="700"
            dy="-2"
          >
            {score}
          </text>

          {/* /100 label */}
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#94A3B8"
            fontFamily="IBM Plex Sans, sans-serif"
            fontSize={s.labelSize}
            fontWeight="500"
            dy={size === 'lg' ? '18' : size === 'md' ? '14' : '11'}
          >
            / 100
          </text>
        </svg>
      </div>

      {showLabel && (
        <div className="text-center">
          <div
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
            style={{ backgroundColor: `${color}18`, color }}
          >
            {rating}
          </div>
          {label && (
            <div className="text-xs text-slate-400 mt-1">{label}</div>
          )}
        </div>
      )}
    </div>
  );
}
