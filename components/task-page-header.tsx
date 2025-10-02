'use client'

import { Task } from '@/lib/db/schema'
import { PageHeader } from '@/components/page-header'
import { TaskActions } from '@/components/task-actions'
import { useTasks } from '@/components/app-layout'

interface TaskPageHeaderProps {
  task: Task
}

export function TaskPageHeader({ task }: TaskPageHeaderProps) {
  const { toggleSidebar } = useTasks()

  return <PageHeader showMobileMenu={true} onToggleMobileMenu={toggleSidebar} actions={<TaskActions task={task} />} />
}
