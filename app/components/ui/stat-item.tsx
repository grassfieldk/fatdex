type StatItemProps = {
  label: string;
  value: string;
  /** 騰落など値の意味に応じた色付け */
  tone?: "default" | "up" | "down";
};

const toneClasses = {
  default: "text-gray-900 dark:text-gray-50",
  up: "text-green-600 dark:text-green-500",
  down: "text-red-600 dark:text-red-500",
} as const;

/** ラベル＋値のペア表示。統計グリッド・プロフィールで共用 */
export function StatItem({ label, value, tone = "default" }: StatItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className={`font-mono text-sm font-medium ${toneClasses[tone]}`}>
        {value}
      </dd>
    </div>
  );
}
