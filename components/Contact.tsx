import AnimatedText from './AnimatedText';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 text-red">
      <AnimatedText>Contact Me</AnimatedText>
      <form className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <input type="text" id="name" name="name" className=" text-zinc-900 w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input type="email" id="email" name="email" className=" text-zinc-900 w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">Message</label>
          <textarea id="message" name="message" rows={4} className="  text-zinc-900 w-full p-2 color-red border rounded" required></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;