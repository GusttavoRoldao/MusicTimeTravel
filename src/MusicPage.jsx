import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

const MusicPage = ({ decade = "90s" }) => {
  // Dados de configuração das décadas
  const decadeData = {
    "60s": {
      backgroundImage: "/MusicPageImage/bgplay60s.png",
      musicImages: [
        "/MusicPageImage/HeyJude.png",
        "/MusicPageImage/ICantGetNo.png",
        "/MusicPageImage/Respect.png",
        "/MusicPageImage/GoodVibrations.png",
      ],
      font: "font-instabread", // Fonte para o título
      authorFont: "font-londrina", // Fonte para o autor
      textColor: "#F37B25", // Cor do texto
      musicFiles: [
        "/MusicPageAudio/HeyJude.mp3",
        "/MusicPageAudio/ICantGetNo.mp3",
        "/MusicPageAudio/Respect.mp3",
        "/MusicPageAudio/GoodVibrations.mp3",
      ],
      songDetails: [
        { title: "Hey Jude", author: "The Beatles" },
        { title: "I Can't Get No", author: "The Rolling Stones" },
        { title: "Respect", author: "Aretha Franklin" },
        { title: "Good Vibrations", author: "The Beach Boys" },
      ],
    },
    "80s": {
      backgroundImage: "/MusicPageImage/bgplay80s.png",
      musicImages: [
        "/MusicPageImage/BillieJean.png",
        "/MusicPageImage/SweetChildoMine.png",
        "/MusicPageImage/TakeOnMe.png",
        "/MusicPageImage/LikeaPrayer.png",
      ],
      font: "font-pinkblue", // Fonte para o título
      authorFont: "font-neonbines", // Fonte para o autor
      textColor: "#9934FF", // Cor do texto
      musicFiles: [
        "/MusicPageAudio/BillieJean.mp3",
        "/MusicPageAudio/SweetChildoMine.mp3",
        "/MusicPageAudio/TakeOnMe.mp3",
        "/MusicPageAudio/LikeaPrayer.mp3",
      ],
      songDetails: [
        { title: "Billie Jean", author: "Michael Jackson" },
        { title: "Sweet Child o' Mine", author: "Guns N' Roses" },
        { title: "Take On Me", author: "a-ha" },
        { title: "Like a Prayer", author: "Madonna" },
      ],
    },
    "90s": {
      backgroundImage: "/MusicPageImage/bgplay90s.png",
      musicImages: [
        "/MusicPageImage/SmellsLikeTeenSpirit.png",
        "/MusicPageImage/Wonderwall.png",
        "/MusicPageImage/MyHeartWillGoOn.png",
        "/MusicPageImage/NoScrubs.png",
      ],
      font: "font-bytebounce", // Fonte para o título
      authorFont: "font-bytebounce", // Fonte para o autor
      textColor: "#000000", // Cor do texto
      musicFiles: [
        "/MusicPageAudio/SmellsLikeTeenSpirit.mp3",
        "/MusicPageAudio/Wonderwall.mp3",
        "/MusicPageAudio/MyHeartWillGoOn.mp3",
        "/MusicPageAudio/NoScrubs.mp3",
      ],
      songDetails: [
        { title: "Smells Like Teen Spirit", author: "Nirvana" },
        { title: "Wonderwall", author: "Oasis" },
        { title: "My Heart Will Go On", author: "Celine Dion" },
        { title: "No Scrubs", author: "TLC" },
      ],
    },
  };

  // Estilos específicos para cada década
  const decadeStyles = {
    "60s": {
      titleSize: "text-[80px]",
      titleMargin: "ml-16",
      authorSize: "text-lg",
      authorMargin: "ml-7",
      titleLineHeight: "leading-none",
      paddingLeft: "pl-16",
    },
    "80s": {
      titleSize: "text-[80px]",
      titleMargin: "ml-20",
      authorSize: "text-xl",
      authorMargin: "ml-6",
      titleLineHeight: "leading-tight",
      paddingLeft: "pl-20",
    },
    "90s": {
      titleSize: "text-[55px]",
      authorSize: "text-lg",
      authorMargin: "ml-16",
      titleLineHeight: "leading-snug",
      paddingLeft: "pl-20",
    },
  };

  // Pega os dados e estilos da década atual
  const {
    backgroundImage,
    musicImages,
    font,
    authorFont,
    textColor,
    musicFiles,
    songDetails,
  } = decadeData[decade];

  const styles = decadeStyles[decade];

  // Estado para o controle da música
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Ref para o áudio
  const audioRef = useRef(new Audio(musicFiles[currentSongIndex]));

  // Efeito para controle do áudio
  useEffect(() => {
    const audio = audioRef.current;

    // Atualiza o áudio quando a música mudar
    if (audio.src !== musicFiles[currentSongIndex]) {
      audio.src = musicFiles[currentSongIndex];
      audio.load();
    }

    // Controla o estado de play/pause
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    // Atualiza o tempo da música
    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.pause();
    };
  }, [currentSongIndex, isPlaying]);

  // Funções para controlar a música
  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handlePrevSong = () => {
    if (currentTime >= 4) {
      audioRef.current.currentTime = 0;
    } else if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const handleNextSong = () => {
    if (currentSongIndex < musicFiles.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
  };

  const handleSelectSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  // Divide o título da música em duas linhas
  const splitTitle = (title) => {
    const words = title.split(" ");
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  };

  const [line1, line2] = splitTitle(songDetails[currentSongIndex].title);

  return (
    <div
      className="min-h-screen flex text-white relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Lado Esquerdo */}
      <div
        className="flex flex-col justify-center pl-20 pt-16 w-1/2"
        style={{ paddingLeft: styles.paddingLeft }}
      >
        {/* Condição para 90s */}
        {decade === "90s" ? (
          <>
            <div
              className={`absolute ${styles.authorSize} ${authorFont} ${styles.authorMargin} pl-14 pb-[265px]`} // Ajuste no padding
              style={{ color: textColor }}
            >
              <span>{songDetails[currentSongIndex].author}</span>
            </div>
            <h1
              className={`text-[50px] ${font} ${styles.titleSize} ${styles.titleLineHeight} pb-28`} // Ajuste no padding
              style={{ color: textColor, lineHeight: "1.1" }} // Reduzido o lineHeight para diminuir o espaçamento
            >
              <span className="block">{line1}</span>
              <span className="block">{line2}</span>
            </h1>
          </>
        ) : (
          <>
            <h1
              className={`text-[80px] ${font} ${styles.titleSize} ${styles.titleLineHeight}`}
              style={{ color: textColor }}
            >
              <span className="block">{line1}</span>
              <span className="block">{line2}</span>
            </h1>
            <div
              className={`flex items-center ${styles.authorSize} ${authorFont} ${styles.authorMargin} pb-24`}
            >
              {decade === "60s" && (
                <>
                  <img
                    src="/MusicPageImage/star.png"
                    alt="Star"
                    className="w-6 h-6"
                  />
                  <span style={{ color: textColor }}>
                    {songDetails[currentSongIndex].author}
                  </span>
                  <img
                    src="/MusicPageImage/star.png"
                    alt="Star"
                    className="w-6 h-6"
                  />
                </>
              )}
              {decade !== "60s" && (
                <span style={{ color: textColor }}>
                  {songDetails[currentSongIndex].author}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Lado Direito */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pr-6 pb-20">
        <div className="flex flex-col gap-4">
          {musicImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Music ${index + 1}`}
              onClick={() => handleSelectSong(index)}
              className={`w-[261px] h-[56px] object-contain cursor-pointer transition-all duration-300 ${
                currentSongIndex === index
                  ? "scale-110 brightness-125"
                  : "hover:scale-105 hover:brightness-110 scale-100 brightness-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Layout Inferior */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="flex gap-14">
          <button
            onClick={handlePrevSong}
            className="hover:scale-110 hover:brightness-125 transition-transform duration-300"
          >
            <img
              src="/MusicPageImage/leftArrow.png"
              alt="Previous"
              className="w-[20px] h-[20px] object-contain"
            />
          </button>
          <button
            onClick={handlePlayPause}
            className="hover:scale-110 hover:brightness-125 transition-transform duration-300"
          >
            <img
              src={
                isPlaying
                  ? "/MusicPageImage/pauseButton.png"
                  : "/MusicPageImage/playButton.png"
              }
              alt={isPlaying ? "Pause" : "Play"}
              className="w-[25px] h-[25px] object-contain"
            />
          </button>
          <button
            onClick={handleNextSong}
            className="hover:scale-110 hover:brightness-125 transition-transform duration-300"
          >
            <img
              src="/MusicPageImage/rightArrow.png"
              alt="Next"
              className="w-[20px] h-[20px] object-contain"
            />
          </button>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">
            {line1} {line2}
          </h2>
          <p className="text-sm text-gray-300">
            {songDetails[currentSongIndex].author}
          </p>
          <button
            className="mt-4 hover:scale-110 hover:brightness-150 transition-transform duration-300"
            onClick={() =>
              window.open(
                "https://open.spotify.com/playlist/0XlNOZdbAgU8vOZ3C3na80?si=OhUoRKDxR_eBdbO0pKqZmw&pi=mBraTDfRSYuCw",
                "_blank"
              )
            } // Abre o link do Spotify em uma nova aba
          >
            <img
              src="/MusicPageImage/addToSpotify.png"
              alt="Add to Spotify"
              className="w-36 h-10 object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

// Validação de propriedades
MusicPage.propTypes = {
  decade: PropTypes.oneOf(["60s", "80s", "90s"]).isRequired,
};

export default MusicPage;
