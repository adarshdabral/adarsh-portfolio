export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: 'MONbot',
      description: 'A quadrupped robot. It had ability to walk and lean in different positions.',
      image: '/project1.jpg',
      technologies: ['Arduino', 'CAD'],
    },
    {
      id: 2,
      title: 'Auto Attendance System',
      description: 'A real time face recognition software that can detect people and can generate a csv file of the people detected. If integrated with hardware, can save a lots of time in classes.',
      image: '/project2.jpg',
      technologies: ['Pyhton', 'Pandas', 'OpenCV'],
    },
    {
      id: 3,
      title: 'StatCalc',
      description: 'A calculator to calculate mean, variance and standard deviations from an databse file. It can be enhanced to calculate more statical equations.',
      image: './project3.jpg',
      technologies: ['Pyhton', 'Pandas', 'NumPy'],
    },
    {
      id: 4,
      title: 'Arduino Clock',
      description: 'A digital clock, that fetches real time data from RTC Mofule and shows it on 4x7-Segment LED.',
      image: './project4.jpg',
      technologies: ['Arduino', ],
    },
    {
      id: 5,
      title: 'Algo Visuals',
      description: 'A webpage to visualise simple algorithms like sorting, searching, etc.',
      image: './project5.png',
      technologies: ['HTML', 'CSS', 'JavaScript' ],
    },
    



  
  ];