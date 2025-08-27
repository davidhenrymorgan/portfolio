import { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GithubIcon, ExternalLink, Folder } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'backend' | 'fullstack' | 'design';
  technologies: string[];
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

interface ProjectsFilterProps {
  projects?: Project[];
}

export default function ProjectsFilter({ projects = defaultProjects }: ProjectsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set(['all']);
    projects.forEach(p => cats.add(p.category));
    return Array.from(cats);
  }, [projects]);


  const categoryLabels: Record<string, string> = {
    all: 'All Projects',
    web: 'Web Apps',
    mobile: 'Mobile',
    backend: 'Backend',
    fullstack: 'Full Stack',
    design: 'Design'
  };

  return (
    <div className="w-full">
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat}>
              {categoryLabels[cat] || cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(category === 'all' ? projects : projects.filter(p => p.category === category))
                .map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Folder className="h-10 w-10 text-primary/60" />
                        {project.featured && (
                          <Badge variant="default" className="text-xs">Featured</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <GithubIcon className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button size="sm" asChild>
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

// TODO: Replace with your actual projects
const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with cart, checkout, and payment integration.',
    category: 'fullstack',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
    featured: true,
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates.',
    category: 'web',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    featured: false,
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with forecasts and interactive maps.',
    category: 'web',
    technologies: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API'],
    featured: false,
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project'
  },
  {
    id: '4',
    title: 'Mobile Fitness Tracker',
    description: 'A React Native app for tracking workouts and nutrition.',
    category: 'mobile',
    technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
    featured: true,
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project'
  },
  {
    id: '5',
    title: 'API Gateway Service',
    description: 'A microservices API gateway with rate limiting and authentication.',
    category: 'backend',
    technologies: ['Go', 'Docker', 'Kubernetes', 'Redis', 'PostgreSQL'],
    featured: false,
    githubUrl: 'https://github.com/username/project'
  },
  {
    id: '6',
    title: 'Portfolio Website',
    description: 'A responsive portfolio website with modern design and animations.',
    category: 'design',
    technologies: ['Figma', 'React', 'Framer Motion', 'Tailwind CSS'],
    featured: false,
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project'
  }
];