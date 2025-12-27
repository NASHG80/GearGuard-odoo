import { motion } from 'framer-motion';

const DebtMeter = ({ debtLevel }) => {
  // debtLevel is 0-100 where 100 is Max Risk
  let color = 'bg-accent-success';
  if (debtLevel > 30) color = 'bg-accent-warning';
  if (debtLevel > 70) color = 'bg-accent-danger';

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-1">
        <span className="text-sm font-medium text-text-secondary">Maintenance Debt</span>
        <span className="text-xs font-bold text-text-primary">{debtLevel}% Risk</span>
      </div>
      <div className="h-3 w-full bg-background-card rounded-full overflow-hidden border border-border">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${debtLevel}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${color}`}
        />
      </div>
      <p className="text-xs text-text-muted mt-1">
        {debtLevel > 50 ? 'High debt! Scheduling preventive maintenance is recommended.' : 'Maintenance debt is within acceptable limits.'}
      </p>
    </div>
  );
};

export default DebtMeter;
