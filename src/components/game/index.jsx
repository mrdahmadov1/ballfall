import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const PlatformContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  bottom: 12px;
  min-height: 100vh;
`;

const Platform = styled.div`
  width: 100%;
  height: 48px;
  margin-top: 20px;
  border: 4px solid #fff;
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
      transparent ${gapStart}%,
      transparent ${gapEnd}%,
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
    const intervalId = setInterval(addPlatform, 2500);
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
