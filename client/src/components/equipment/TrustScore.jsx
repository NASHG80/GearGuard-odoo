import { motion } from 'framer-motion';

const TrustScore = ({ score }) => {
  // Determine color based on score
  let color = 'text-success';
  let ringColor = 'stroke-success';

  if (score < 50) {
    color = 'text-error';
    ringColor = 'stroke-error';
  } else if (score < 80) {
    color = 'text-warning';
    ringColor = 'stroke-warning';
  }

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-background-card"
          />
          {/* Progress Circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            className={ringColor}
          />
        </svg>
        <span className={`absolute text-2xl font-bold ${color}`}>
          {score}
        </span>
      </div>
      <span className="text-sm font-medium text-text-muted mt-2">Asset Trust Score</span>
    </div>
  );
};

export default TrustScore;
