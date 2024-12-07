import { useState } from "react";

// Dados dos cards
const cardData = [
  {
    logo: "/AppMusicImage/LOGO.png",
    description: `Connects you to the golden decades of music — the 60s, 80s, and 90s — in a unique and interactive way. Each
       era comes to life with iconic songs and a design that captures its essence and energy. It’s simple and intuitive:
        pick the decade that speaks to you, click on its card, and immerse yourself in the sounds that defined generations.
         An experience designed to relive memories or explore a fascinating musical past, all with a nostalgic twist.`,
    playNow: "/AppMusicImage/playNow.png",
    cardImage: "/AppMusicImage/musicBorder.png",
    defaultWidth: "25px",
    defaultHeight: "125px",
    activeWidth: "40px",
    activeHeight: "210px",
    hoverColor: "rgba(255, 223, 102, 0.2)",
    backgroundImage: "/AppMusicImage/bgmusic.jpg",
  },
  {
    logo: "MAKE LOVE",
    description: `Step into the 1960s, a decade that redefined the world of music and culture. It was the golden age of rock
       'n' roll, the folk revival, and the soulful grooves of Motown. The Beatles, Bob Dylan, and The Supremes dominated 
       the charts, while protest anthems became the voice of social change. This era was all about breaking norms, experimenting 
       with sound,and creating timeless classics that still inspire artists today. Relive the decade that laid the foundation for 
       modern music, where every note tells a story of revolution and artistry.`,
    playNow: "/AppMusicImage/playNow60s.png",
    cardImage: "/AppMusicImage/card60s.png",
    defaultWidth: "120px",
    defaultHeight: "140px",
    activeWidth: "170px",
    activeHeight: "200px",
    hoverColor: "rgba(255, 102, 102, 0.2)",
    backgroundImage: "/AppMusicImage/bg60s.jpg",
  },
  {
    logo: "LET’S DANCE",
    description: `The 1980s exploded with a vibrant mix of electronic innovation, larger-than-life personalities, and 
      unforgettable hits. Synthesizers and drum machines became the heartbeat of pop music, giving rise to iconic 
      tracks that defined a generation. Artists like Michael Jackson, Prince, and Madonna revolutionized the industry 
      with groundbreaking albums and performances, while MTV turned music videos into cultural phenomena. It was also 
      a time for epic rock ballads and chart-topping anthems that filled stadiums. Journey back to the decade of neon 
      lights, big hair, and music that still gets you dancing.`,
    playNow: "/AppMusicImage/playNow80s.png",
    cardImage: "/AppMusicImage/card80s.png",
    defaultWidth: "120px",
    defaultHeight: "140px",
    activeWidth: "170px",
    activeHeight: "200px",
    hoverColor: "rgba(0, 255, 255, 0.2)",
    backgroundImage: "/AppMusicImage/bg80s.jpg",
  },
  {
    logo: "DROP THE BEAT",
    description: `The 1990s ushered in a new wave of diversity and experimentation in music, blending genres and pushing 
      boundaries like never before. Hip-hop surged into the mainstream with legends like Tupac, Biggie, and Dr. Dre
       leading the way. Grunge emerged as the voice of a generation, with Nirvana and Pearl Jam defining raw, emotional
        rock. Meanwhile, R&B and pop flourished with artists like Whitney Houston and Mariah Carey breaking records. 
        From alternative rock to electronic beats, the '90s offered a little something for everyone. Dive into a decade 
        where music was bold, introspective, and constantly evolving.`,
    playNow: "/AppMusicImage/playNow90s.png",
    cardImage: "/AppMusicImage/card90s.png",
    defaultWidth: "120px",
    defaultHeight: "140px",
    activeWidth: "170px",
    activeHeight: "200px",
    hoverColor: "rgba(255, 0, 255, 0.2)",
    backgroundImage: "/AppMusicImage/bg90s.jpg",
  },
];

const App = () => {
  const [activeCard, setActiveCard] = useState(0);

  // Alterna para o próximo card
  const nextCard = () => {
    setActiveCard((prev) => (prev + 1) % cardData.length);
  };

  // Alterna para o card anterior
  const prevCard = () => {
    setActiveCard((prev) => (prev - 1 + cardData.length) % cardData.length);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between text-white"
      style={{
        backgroundImage: `url(${cardData[activeCard].backgroundImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Header */}
      <header className="absolute top-12 left-16">
        {activeCard === 0 ? (
          <img
            src={cardData[activeCard].logo}
            alt="Logo"
            className="w-[520px] h-[180px] mr-4"
          />
        ) : (
          <h1 className="text-[80px] font-extrabold tracking-wide mt-4">
            {cardData[activeCard].logo}
          </h1>
        )}
        <p
          className="text-gray-100 max-w-md font-extrabold tracking-wide leading-relaxed"
          style={{
            marginTop: "10px",
            marginLeft: "30px",
            textShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)",
            fontSize: "12px",
            fontWeight: "700",
            lineHeight: "1.3",
          }}
        >
          {cardData[activeCard].description}
        </p>
        <div className="flex items-center gap-4 mt-6 ml-[30px]">
          <img
            src={cardData[activeCard].playNow}
            alt="Play Now"
            className="w-[160px] h-[40px] cursor-pointer hover:scale-105 transition-transform"
          />
          <div className="w-px h-8 bg-gray-300"></div>
          <img
            src="/AppMusicImage/spotify.png"
            alt="Spotify"
            className="w-[120px] h-[38px] transition-transform"
          />
        </div>
      </header>

      {/* Footer */}
      <footer className="absolute bottom-14 right-9 flex flex-col items-center">
        <div
          className="flex gap-3 mb-4 items-end"
          style={{ marginLeft: "60px" }}
        >
          {cardData.map((card, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                width:
                  activeCard === index ? card.activeWidth : card.defaultWidth,
                height:
                  activeCard === index ? card.activeHeight : card.defaultHeight,
                borderRadius: "30px",
                backgroundColor:
                  activeCard === index ? card.hoverColor : "transparent",
                boxShadow:
                  activeCard === index
                    ? `0px 0px 30px 15px ${
                        index === 0
                          ? "rgba(218, 229, 255, 0.15)"
                          : index === 1
                          ? "rgba(220, 158, 0, 0.6)"
                          : index === 2
                          ? "rgba(138, 22, 255, 0.6)"
                          : "rgba(150, 0, 0, 0.6)"
                      }`
                    : "none",
                filter: activeCard === index ? "none" : "brightness(0.5)",
              }}
            >
              <img
                src={card.cardImage}
                alt={`Card ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <img
            src="/AppMusicImage/setaEsquerda.png"
            alt="Left Arrow"
            className="w-11 h-11 cursor-pointer hover:scale-110 transition-transform"
            onClick={prevCard}
          />
          <img
            src="/AppMusicImage/setaDireita.png"
            alt="Right Arrow"
            className="w-11 h-11 cursor-pointer hover:scale-110 transition-transform"
            onClick={nextCard}
          />
          <div className="flex gap-2">
            <div className="w-[300px] h-1 bg-white opacity-80"></div>
            <div className="w-[18px] h-1 bg-white opacity-50"></div>
            <div className="w-[18px] h-1 bg-white opacity-25"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
