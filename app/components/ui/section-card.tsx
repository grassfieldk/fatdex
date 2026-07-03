import { Paper, Title } from "@mantine/core";

type SectionCardProps = {
  title?: string;
  children: React.ReactNode;
};

/** タイトル付きパネル。チャート・統計・プロフィール各セクションの共通外枠 */
export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <Paper withBorder p={{ base: "md", sm: "lg" }}>
      {title && (
        <Title order={2} size="h5" mb="md">
          {title}
        </Title>
      )}
      {children}
    </Paper>
  );
}
