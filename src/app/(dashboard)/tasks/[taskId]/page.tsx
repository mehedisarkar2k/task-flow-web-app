import { TaskDetailScreen } from "@/screens/tasks/task-detail-screen";

interface TaskDetailPageProps {
  params: Promise<{
    taskId: string;
  }>;
}

export async function generateMetadata({ params }: TaskDetailPageProps) {
  const { taskId } = await params;
  return {
    title: `Task ${taskId} — TaskFlow`,
  };
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { taskId } = await params;
  return <TaskDetailScreen taskId={taskId} />;
}
