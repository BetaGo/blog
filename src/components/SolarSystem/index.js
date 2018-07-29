/*
  Mercury : ~87,5 days
  Venus : ~224,7 days
  Earth : ~365,2563 days
    + Moon : ~27,3216 days (around earth)
  Mars : ~687 days (~1,8 year)
  Jupiter : ~4 331 days (~12 years)
  Saturn : ~10 747 days (~30 years)
  Uranus : ~30 589 days (~84 years)
  Neptune : ~59 802 days (~165 years)
  Pluto : ~90 580 days (~248 years)
*/

import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const sun = '40px'
const mercuryOrb = '70px'
const mercuryPl = '4px'
const venusOrb = '100px'
const venusPl = '8px'
const earthOrb = '145px'
const earthPl = '6px'
const marsOrb = '190px'
const marsPl = '6px'
const jupiterOrb = '340px'
const jupiterPl = '18px'
const saturnOrb = '440px'
const saturnPl = '12px'
const uranusOrb = '520px'
const uranusPl = '10px'
const neptuneOrb = '630px'
const neptunePl = '10px'
const plutoOrb = '780px'
const plutoPl = '3px'

const asteroidsBeltOrb = '300px'
const asteroidsBeltPl = '210px'

const yearInSecond = 30

const revolution = plYearInDays => {
  return (plYearInDays * yearInSecond) / 365.2563
}

const createStars = (count, maxArea, minArea = 0, starSize = 0) => {
  const star = () =>
    `${minArea + Math.floor(Math.random() * maxArea)}px ${minArea +
      Math.floor(
        Math.random() * maxArea
      )}px 0 ${starSize}px rgba(255, 255, 255, ${Math.random().toFixed(2)}),`
  let str = ''
  for (let i = 0; i < count; i++) {
    str += star()
  }
  return str.slice(0, -1)
}

const orb = keyframes`
    from {
        transform:rotate(0deg)
    }
    to{
        transform:rotate(-360deg)
    }
`

const Space = styled.div`
  &:after {
    content: '';
    position: absolute;
    height: 2px;
    width: 2px;
    top: -2px;
    background: #fff;
    box-shadow: ${createStars(500, 1920)};
    border-radius: 100px;
  }
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;

  div {
    border-radius: 1000px;
    top: 50%;
    left: 50%;
    position: absolute;

    border: 1px solid rgba(102, 166, 229, 0.12);
    &:before {
      left: 50%;
      border-radius: 100px;
      content: '';
      position: absolute;
      box-shadow: inset 0 6px 0 -2px rgba(0, 0, 0, 0.25);
    }
  }
`

const Sun = styled.div`
  background: radial-gradient(
    ellipse at center,
    #ffd000 1%,
    #f9b700 39%,
    #f9b700 39%,
    #e06317 100%
  );
  height: ${sun};
  width: ${sun};
  border: 0 !important;
  margin-top: ${-parseInt(sun) / 2}px;
  margin-left: ${-parseInt(sun) / 2}px;
  background-clip: padding-box;
  background-position: -28px -103px;
  background-size: 175%;
  box-shadow: 0 0 10px 2px rgba(255, 107, 0, 0.4),
    0 0 22px 11px rgba(255, 203, 0, 0.13);
`

const Mercury = styled.div`
  height: ${mercuryOrb};
  width: ${mercuryOrb};
  margin-top: ${-parseInt(mercuryOrb) / 2}px;
  margin-left: ${-parseInt(mercuryOrb) / 2}px;
  animation: ${orb} ${revolution(87.5)}s linear infinite;
  &:before {
    height: ${mercuryPl};
    width: ${mercuryPl};
    background: #9f5e26;
    margin-top: ${-parseInt(mercuryPl) / 2}px;
    margin-left: ${-parseInt(mercuryPl) / 2}px;
  }
`

const Venus = styled.div`
  height: ${venusOrb};
  width: ${venusOrb};
  margin-top: ${-parseInt(venusOrb) / 2}px;
  margin-left: ${-parseInt(venusOrb) / 2}px;
  animation: ${orb} ${revolution(224.7)}s linear infinite;
  &:before {
    height: ${venusPl};
    width: ${venusPl};
    background: #beb768;
    margin-top: ${-parseInt(venusPl) / 2}px;
    margin-left: ${-parseInt(venusPl) / 2}px;
  }
`

const Earth = styled.div`
  height: ${earthOrb};
  width: ${earthOrb};
  margin-top: ${-parseInt(earthOrb) / 2}px;
  margin-left: ${-parseInt(earthOrb) / 2}px;
  animation: ${orb} ${revolution(365.2563)}s linear infinite;
  &:before {
    height: ${earthPl};
    width: ${earthPl};
    background: #11abe9;
    margin-top: ${-parseInt(earthPl) / 2}px;
    margin-left: ${-parseInt(earthPl) / 2}px;
  }
  &:after {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 50%;
    top: 0px;
    margin-left: -9px;
    margin-top: -9px;
    border-radius: 100px;
    box-shadow: 0 -10px 0 -8px grey;
    animation: ${orb} ${revolution(27.3216)}s linear infinite;
  }
`

const Mars = styled.div`
  height: ${marsOrb};
  width: ${marsOrb};
  margin-top: ${-parseInt(marsOrb) / 2}px;
  margin-left: ${-parseInt(marsOrb) / 2}px;
  animation: ${orb} ${revolution(687)}s linear infinite;
  &:before {
    height: ${marsPl};
    width: ${marsPl};
    background: #cf3921;
    margin-top: ${-parseInt(marsPl) / 2}px;
    margin-left: ${-parseInt(marsPl) / 2}px;
  }
`

const Jupiter = styled.div`
  height: ${jupiterOrb};
  width: ${jupiterOrb};
  margin-top: ${-parseInt(jupiterOrb) / 2}px;
  margin-left: ${-parseInt(jupiterOrb) / 2}px;
  animation: ${orb} ${revolution(4331)}s linear infinite;
  &:before {
    height: ${jupiterPl};
    width: ${jupiterPl};
    background: #c76e2a;
    margin-top: ${-parseInt(jupiterPl) / 2}px;
    margin-left: ${-parseInt(jupiterPl) / 2}px;
  }
`

const Saturn = styled.div`
  height: ${saturnOrb};
  width: ${saturnOrb};
  margin-top: ${-parseInt(saturnOrb) / 2}px;
  margin-left: ${-parseInt(saturnOrb) / 2}px;
  animation: ${orb} ${revolution(10747)}s linear infinite;
  &:before {
    height: ${saturnPl};
    width: ${saturnPl};
    background: #e7c194;
    margin-top: ${-parseInt(saturnPl) / 2}px;
    margin-left: ${-parseInt(saturnPl) / 2}px;
  }
  &:after {
    position: absolute;
    content: '';
    height: 2.34%;
    width: 4.676%;
    left: 50%;
    top: 0px;
    transform: rotateZ(-52deg);
    margin-left: -2.3%;
    margin-top: -1.2%;
    border-radius: 50% 50% 50% 50%;
    box-shadow: 0 1px 0 1px #987641, 3px 1px 0 #987641, -3px 1px 0 #987641;
    animation: ${orb} ${revolution(10747)} linear infinite;
    animation-direction: reverse;
    transform-origin: 52% 60%;
  }
`

const Uranus = styled.div`
  height: ${uranusOrb};
  width: ${uranusOrb};
  margin-top: ${-parseInt(uranusOrb) / 2}px;
  margin-left: ${-parseInt(uranusOrb) / 2}px;
  animation: ${orb} ${revolution(30589)}s linear infinite;
  &:before {
    height: ${uranusPl};
    width: ${uranusPl};
    background: #b5e3e3;
    margin-top: ${-parseInt(uranusPl) / 2}px;
    margin-left: ${-parseInt(uranusPl) / 2}px;
  }
`

const Neptune = styled.div`
  height: ${neptuneOrb};
  width: ${neptuneOrb};
  margin-top: ${-parseInt(neptuneOrb) / 2}px;
  margin-left: ${-parseInt(neptuneOrb) / 2}px;
  animation: ${orb} ${revolution(59802)}s linear infinite;
  &:before {
    height: ${neptunePl};
    width: ${neptunePl};
    background: #175e9e;
    margin-top: ${-parseInt(neptunePl) / 2}px;
    margin-left: ${-parseInt(neptunePl) / 2}px;
  }
`

const AsteriidsBelt = styled.div`
  opacity: 0.7;
  border-color: transparent !important;
  height: ${asteroidsBeltOrb};
  width: ${asteroidsBeltOrb};
  margin-top: ${-parseInt(asteroidsBeltOrb) / 2}px;
  margin-left: ${-parseInt(asteroidsBeltOrb) / 2}px;
  animation: ${orb} ${revolution(2191)}s linear infinite;
  overflow: hidden;
  &:before {
    top: 50%;
    height: ${asteroidsBeltPl};
    width: ${asteroidsBeltPl};
    margin-top: ${-parseInt(asteroidsBeltPl) / 2}px;
    margin-left: ${-parseInt(asteroidsBeltPl) / 2}px;
    background: transparent;
    border-radius: 140px !important;
    box-shadow: ${createStars(390, 290, -290 / 2, -104)} !important;
  }
`

const Pluto = styled.div`
  height: ${plutoOrb};
  width: ${plutoOrb};
  margin-top: ${-parseInt(plutoOrb) / 2 - 60}px;
  margin-left: ${-parseInt(plutoOrb) / 2 + 70}px;
  animation: ${orb} ${revolution(90580)}s linear infinite;
  &:before {
    height: ${plutoPl};
    width: ${plutoPl};
    background: #fff;
    margin-top: ${-parseInt(plutoPl) / 2}px;
    margin-left: ${-parseInt(plutoPl) / 2}px;
  }
`

class SolarSystem extends Component {
  render() {
    return (
      <Space>
        <Sun />
        <Mercury />
        <Venus />
        <Earth />
        <Mars />
        <Jupiter />
        <Saturn />
        <Uranus />
        <Neptune />
        <Pluto />
        <AsteriidsBelt />
      </Space>
    )
  }
}

export default SolarSystem
