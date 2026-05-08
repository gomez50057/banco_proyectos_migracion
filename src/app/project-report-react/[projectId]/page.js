'use client';

import dynamic from 'next/dynamic';

const ProjectReportReact = dynamic(
  () => import('@/views/Responsible/projectRegistration/ProjectReportReact'),
  { ssr: false }
);

export default function ProjectReportReactPage() {
  return <ProjectReportReact />;
}
