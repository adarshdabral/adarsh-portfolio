import React from 'react';

const Know: React.FC = () => {
  return (
    <div className="flex w-full h-screen p-4">
      {/* Left Side - Large Text Box */}
      <div className="flex-1 bg-red-200 p-4 mr-4 border border-gray-300 rounded-lg">
        <h1 className="text-4xl font-bold mb-4 ">Adarsh Dabral</h1><hr /><br /> 
        <p
          className="w-full h-5/6 py-3 shadow-2xl scroll-smooth rounded-lg text-black overflow-y-scroll p-4 text-lg resize-none ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vitae, itaque inventore incidunt nam quo excepturi nihil voluptatum amet pariatur non voluptas ex maiores dicta nulla fugit sapiente aperiam? Aspernatur fugit ipsa tempora, accusamus blanditiis quia tempore doloremque sed maiores sunt inventore nostrum debitis qui. Temporibus ullam officia repellat aut deserunt commodi dolorem sit eius fuga ea nostrum soluta facere adipisci in beatae odit odio architecto aliquam recusandae magnam expedita, aperiam molestias similique autem. Assumenda unde soluta sapiente tempora ea! Velit, esse maxime dolorum eaque veniam iure aliquam voluptatum earum quis quaerat debitis quas, dolorem sapiente perferendis? Velit ad ut totam, vel minima tempore deserunt. Numquam veniam consequatur sed illum iure, cumque quo aut officia magnam a laborum! Beatae, accusantium iusto necessitatibus quis aliquam voluptas provident nisi dolor ipsum architecto! Aperiam beatae laboriosam eum dicta facilis unde harum magni, eos dolorum inventore distinctio vero soluta alias numquam reprehenderit optio sit, omnis magnam totam maiores doloremque? Cumque ut laborum illum expedita aliquid, aut ipsa libero maxime officia? Commodi neque architecto eum qui, eveniet tempore blanditiis magnam dolore dolorum culpa consequatur aliquid error iusto sapiente fugiat. Commodi vel nemo suscipit nesciunt alias culpa eum molestiae non aliquid fuga iusto, eaque incidunt, provident quasi vitae possimus ea quos quibusdam recusandae excepturi cumque! Accusamus tempora laudantium atque beatae incidunt accusantium impedit quasi consequatur reiciendis veniam exercitationem laborum voluptates vero, amet nobis natus alias necessitatibus. Doloribus minus dolor laborum accusamus cumque repudiandae explicabo consequuntur dolorem voluptate blanditiis? Reiciendis accusamus dolorum distinctio, molestiae eum praesentium maxime expedita odio odit aliquam sint? Animi quas, eum doloribus accusamus magnam magni, architecto totam sit voluptas fugiat ab aliquam temporibus, a dolore nostrum? Adipisci ipsam ipsum blanditiis, aliquid facilis eligendi similique magni iure dolore et sed provident suscipit eius a iusto earum laborum sequi veritatis totam ea quae, ipsa harum alias repudiandae. Expedita porro inventore reprehenderit corporis, recusandae consequuntur error, impedit non veniam nulla ab, vero aspernatur! Aspernatur recusandae pariatur saepe aliquam aperiam adipisci qui? Vero dicta labore incidunt veritatis quasi sapiente consectetur iste et natus asperiores? Error itaque laborum sequi repellendus unde totam ullam, quibusdam ut vero est officia aliquid iusto, tempora nam cum sed rem iure quod perspiciatis, ex dolor amet? Labore odio dicta dignissimos quae, excepturi aliquid recusandae nulla! Architecto eum minus porro repellendus at consectetur similique perspiciatis deleniti repudiandae! Suscipit molestiae fuga dolores est assumenda expedita recusandae sapiente, deserunt harum porro natus! Pariatur necessitatibus consectetur ab at illo corrupti et sed itaque perferendis adipisci odit rem provident voluptatum error, voluptate fugit quis. Asperiores harum eligendi rerum perspiciatis enim aliquid eum natus corporis odit beatae adipisci sunt pariatur, neque recusandae? Non quos repudiandae similique aperiam cumque quae corrupti alias voluptas possimus. Alias, earum voluptatem, quaerat voluptate rerum voluptatum, quam non in iste sed voluptates ipsam inventore fugiat error quibusdam? Voluptate vel eligendi in ducimus ad voluptatibus dolor, eum corrupti earum incidunt itaque, impedit repellat neque harum blanditiis eaque fuga nam? Perferendis asperiores pariatur nemo sequi ipsum accusamus vel illo eius dolorum officiis. Rerum facilis minima culpa veritatis?
        </p>
      </div>

      {/* Right Side - Scrollable Gallery */}
      <div className="flex-1 bg-gray-100 p-4 overflow-y-scroll grid grid-cols-2 gap-4 h-full">
        {/* 10 Gallery Items arranged in a 2x2 grid */}
        {Array.from({ length: 10 }, (_, index) => (
          <GalleryItem key={index} />
        ))}
      </div>
    </div>
  );
};

const GalleryItem: React.FC = () => {
  return (
    <div className="w-full h-60 bg-blue-300 rounded-lg shadow-lg">
      <img
        alt="Gallery item"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};

export default Know;
