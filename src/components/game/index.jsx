import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const PlatformContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  min-height: 100vh;
  background: #d4f1f4;
`;

const Platform = styled.div`
  display: block;
  width: calc(100% - 24px);
  margin: auto;
  height: 48px;
  margin-top: 20px;
  border: 4px solid #05455e;
  border-radius: 6px;
  background: ${({ platform }) => platform.gradient};
  transition: transform 0.5s, opacity 0.5s;
  transform: ${({ isNew, offset }) => (isNew ? 'translateY(-2%)' : `translateY(${offset * 2}px)`)};
  opacity: ${({ isNew }) => (isNew ? 0 : 1)};
  cursor: pointer;
`;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomHexColor = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return color.padStart(6, '0');
};

const Game = () => {
  const [platforms, setPlatforms] = useState([]);

  const addPlatform = useCallback(() => {
    const gapStart = getRandomInt(0, 70);
    const gapSize = 24;
    const gapEnd = gapStart + gapSize;
    const background = getRandomHexColor();
    const gradient = `linear-gradient(
      to right,
      #${background} ${gapStart}%,
      #05445e ${gapStart}%,
      #05445e ${gapEnd}%,
      #${background} ${gapEnd}%
    )`;

    const newPlatform = {
      id: Date.now(),
      gapStart,
      gapEnd,
      background,
      gradient,
      isNew: true,
    };

    setPlatforms((prevPlatforms) => [newPlatform, ...prevPlatforms]);

    setTimeout(() => {
      setPlatforms((prevPlatforms) =>
        prevPlatforms.map((platform) =>
          platform.id === newPlatform.id ? { ...platform, isNew: false } : platform
        )
      );
    }, 100);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(addPlatform, 333);
    return () => clearInterval(intervalId);
  }, [addPlatform]);

  return (
    <PlatformContainer>
      {platforms.map((platform) => (
        <Platform
          key={platform.id}
          platform={{ gradient: platform.gradient }}
          isNew={platform.isNew}
          offset={platforms.indexOf(platform)}
        />
      ))}
    </PlatformContainer>
  );
};

export default Game;
