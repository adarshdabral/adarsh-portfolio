import AnimatedText from './AnimatedText';
import Button from './Button';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-20 ">
      <AnimatedText>About Me</AnimatedText>
      <div className="mt-8 text-xl">
        <p className="mb-4">
          Hi, I'm Adarsh Dabral, a software engineer with a passion for creating efficient and scalable solutions.
          I specialize in web development, Data Analysis and IoT. With experience in various programming languages and frameworks, I enjoy tackling complex problems
          I'm a lifelong learner, always seeking to improve my skills and knowledge in the ever-evolving
          and turning ideas into reality through code.
          
        </p>
        <p className="mb-4">
          I'm a mentor and have been mentored 3000+ students globally via online and offline sesisons. I've been contributed to many organisations for the sake of same purpose. <br /><br /><br />
        <Button text="Know More" pdfUrl="/about" />
        </p>
      </div>
    </div>
  );
};

export default About;