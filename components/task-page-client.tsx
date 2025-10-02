'use client'

import { useTask } from '@/lib/hooks/use-task'
import { TaskDetails } from '@/components/task-details'
import { TaskPageHeader } from '@/components/task-page-header'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { useTasks } from '@/components/app-layout'
import { VERCEL_DEPLOY_URL } from '@/lib/constants'

interface TaskPageClientProps {
  taskId: string
}

export function TaskPageClient({ taskId }: TaskPageClientProps) {
  const { task, isLoading, error } = useTask(taskId)
  const { toggleSidebar } = useTasks()

  if (isLoading) {
    return (
      <div className="flex-1 bg-background">
        <div className="mx-auto p-3">
          <PageHeader
            showMobileMenu={true}
            onToggleMobileMenu={toggleSidebar}
            actions={
              <div className="flex items-center gap-2">
                {/* Deploy to Vercel Button */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs bg-black text-white border-black hover:bg-black/90 dark:bg-white dark:text-black dark:border-white dark:hover:bg-white/90"
                >
                  <a
                    href={VERCEL_DEPLOY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5"
                  >
                    <svg viewBox="0 0 76 65" className="h-3 w-3" fill="currentColor">
                      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                    </svg>
                    Deploy to Vercel
                  </a>
                </Button>

                {/* More Actions Menu Placeholder */}
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            }
          />

          <div className="max-w-4xl mx-auto">
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Task Info Skeleton - 339px height */}
                <Card className="h-[339px]">
                  <CardContent className="space-y-4"></CardContent>
                </Card>

                {/* Logs Skeleton - 512px height */}
                <Card className="h-[512px]">
                  <CardContent></CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !task) {
    return (
      <div className="flex-1 bg-background">
        <div className="mx-auto p-3">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">Task Not Found</h2>
              <p className="text-muted-foreground">{error || 'The requested task could not be found.'}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-background">
      <div className="mx-auto p-3">
        <TaskPageHeader task={task} />

        {/* Task details */}
        <div className="max-w-4xl mx-auto">
          <TaskDetails task={task} />
        </div>
      </div>
    </div>
  )
}
