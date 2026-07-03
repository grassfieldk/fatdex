type SectionCardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

/** タイトル付きパネル。チャート・統計・プロフィール各セクションの共通外枠 */
export function SectionCard({ title, children, className }: SectionCardProps) {
  return (
    <section
      className={`rounded-lg border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 ${className ?? ""}`}
    >
      {title && (
        <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-50">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
