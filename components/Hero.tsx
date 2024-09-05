import Image from 'next/image';
import AnimatedText from './AnimatedText';
import Button from '../components/Button'
import About from './About';

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between  py-16 w-60p px-10">
      <div className="md:w-1/2 mb-8 md:mb-0 px-10">
        <AnimatedText>Hello, I'm Adarsh Dabral</AnimatedText>
        <h2 className="text-3xl font-semibold mt-4 border-green-500">Software Engineer</h2>
        <p className="mt-4 text-xl border-red-600">
          Passionate about creating innovative solutions and pushing the boundaries of technology.
          I am a sociable and talented youth with diverse skills, exceptional leadership, and a learning mindset, complemented by an optimistic personality and marketing experience. <br />

<br /> A visionary creator , melding art and code,<br />
Founding paths where imagination and innovation rode...
<br /><br />
        </p>
        <Button text="Download Resume" pdfUrl="/AdR.pdf" />
      </div>
      <div className="md:w-1/2 flex justify-end p-4 mr-60  ">
        <Image
          src="/img0.jpg"
          alt="Adarsh Dabral"
          width={300}
          height={300}
          className="rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default Hero;