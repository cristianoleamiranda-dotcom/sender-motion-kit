import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {shots} from './assets';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const Scene: React.FC<{index: number; caption: string; file: string; duration: number}> = ({index, caption, file, duration}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const p = frame / Math.max(1, duration - 1);
  const direction = index % 2 === 0 ? 1 : -1;

  // Restrained 2.5D camera move: scale/translation only, never warp the source.
  const zoom = interpolate(p, [0, 1], [1.045, 1.115], clamp);
  const driftX = direction * interpolate(p, [0, 1], [-18, 18], clamp) + Math.sin(p * Math.PI) * 9;
  const driftY = interpolate(p, [0, 1], [10, -14], clamp);

  const captionIn = interpolate(frame, [3, 10, 16], [0, 1, 1], clamp);
  const captionOut = interpolate(frame, [duration - 9, duration - 3], [1, 0], clamp);
  const captionScale = interpolate(frame, [3, 11, 19], [0.94, 1.035, 1], clamp);

  // A three-frame directional whip at the outgoing edge bridges the hard cut.
  const whip = interpolate(frame, [duration - 4, duration - 1], [0, 1], clamp);
  const whipX = direction * whip * 150;
  const whipBlur = whip * 18;
  const entryFlash = frame === 0 ? 0.62 : 0;
  const glitch = frame === 1 || frame === 2;

  return <AbsoluteFill style={{backgroundColor: '#05050a', overflow: 'hidden'}}>
    <AbsoluteFill style={{
      transform: `translate(${driftX + whipX}px,${driftY}px) scale(${zoom + whip * 0.055}) skewX(${direction * whip * -5}deg)`,
      filter: `blur(${whipBlur}px)`,
    }}>
      <Img src={staticFile(`images/${file}`)} style={{
        width, height, objectFit: 'cover',
        filter: 'saturate(1.13) contrast(1.09) brightness(.88)',
      }}/>
    </AbsoluteFill>

    <AbsoluteFill style={{background: 'linear-gradient(180deg,rgba(4,5,12,.04) 32%,rgba(4,5,12,.18) 56%,rgba(4,5,12,.84) 100%)'}}/>
    <AbsoluteFill style={{border: '18px solid rgba(7,8,18,.22)', boxSizing: 'border-box', boxShadow: 'inset 0 0 120px rgba(0,0,0,.42)'}}/>

    {glitch && <AbsoluteFill style={{
      background: 'linear-gradient(90deg,transparent 0%,rgba(0,225,255,.22) 48%,rgba(255,35,190,.16) 52%,transparent 100%)',
      mixBlendMode: 'screen',
      transform: `translateX(${frame === 1 ? 10 : -7}px)`,
    }}/>}

    <AbsoluteFill style={{
      justifyContent: 'flex-end',
      padding: '0 76px 210px',
      opacity: captionIn * captionOut * (1 - whip * 0.9),
      transform: `scale(${captionScale}) translateX(${glitch ? 8 : 0}px)`,
    }}>
      <div style={{height: 5, width: 112, background: '#ff2cbb', marginBottom: 34, boxShadow: '0 0 24px #ff2cbb'}}/>
      <div style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: caption.length > 36 ? 66 : 78,
        fontWeight: 900,
        lineHeight: 0.99,
        letterSpacing: '-2.5px',
        color: '#fff',
        textShadow: '-3px 0 #00d9ff, 3px 0 rgba(255,35,190,.9), 0 8px 36px rgba(0,0,0,.8)',
        maxWidth: 920,
      }}>{caption}</div>
    </AbsoluteFill>

    {entryFlash > 0 && <AbsoluteFill style={{backgroundColor: '#fff', opacity: entryFlash}}/>}
    <AbsoluteFill style={{
      opacity: .075,
      backgroundImage: 'repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(255,255,255,.14) 4px)',
      mixBlendMode: 'soft-light',
    }}/>
  </AbsoluteFill>;
};

export const JumpEdit: React.FC = () => {
  const {durationInFrames} = useVideoConfig();
  return <AbsoluteFill style={{background: '#05050a'}}>
    {shots.map((shot, i) => {
      const start = Math.round(i * durationInFrames / shots.length);
      const end = Math.round((i + 1) * durationInFrames / shots.length);
      return <Sequence key={shot.file} from={start} durationInFrames={end - start}>
        <Scene index={i} caption={shot.caption} file={shot.file} duration={end - start}/>
      </Sequence>;
    })}
  </AbsoluteFill>;
};
