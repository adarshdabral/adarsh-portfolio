interface ButtonProps {
    text: string;
    pdfUrl: string;
  }
  
  const Button: React.FC<ButtonProps> = ({ text, pdfUrl }) => {
    
    return (
        
        


      <a
      href = {pdfUrl}
        target = "_blank"
        rel= "noopener noreferrer"
        className="bg-blue-500 w-50 h-15 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        {text}
      </a>
    );
  };
  
  export default Button;
  