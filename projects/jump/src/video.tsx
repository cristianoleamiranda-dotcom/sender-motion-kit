import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {shots} from './assets';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const Scene: React.FC<{index: number; caption: string; file: string; duration: number}> = ({index, caption, file, duration}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const p = frame / Math.max(1, duration - 1);
  const direction = index % 2 === 0 ? 1 : -1;
  const words = caption.split(' ');

  // Restrained 2.5D camera move: scale/translation only, never warp the source.
  const zoom = interpolate(p, [0, 1], [1.045, 1.115], clamp);
  const driftX = direction * interpolate(p, [0, 1], [-18, 18], clamp) + Math.sin(p * Math.PI) * 9;
  const driftY = interpolate(p, [0, 1], [10, -14], clamp);

  const captionIn = interpolate(frame, [2, 8, 15], [0, 1, 1], clamp);
  const captionOut = interpolate(frame, [duration - 10, duration - 3], [1, 0], clamp);
  const captionScale = interpolate(frame, [2, 10, 18], [0.965, 1.025, 1], clamp);

  // Short directional whip bridges each still without bending or regenerating it.
  const whip = interpolate(frame, [duration - 4, duration - 1], [0, 1], clamp);
  const whipX = direction * whip * 150;
  const whipBlur = whip * 18;
  const entryFlash = frame === 0 ? 0.48 : 0;
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

    <AbsoluteFill style={{background: 'linear-gradient(180deg,rgba(4,5,12,.02) 24%,rgba(4,5,12,.12) 48%,rgba(4,5,12,.88) 100%)'}}/>
    <AbsoluteFill style={{border: '18px solid rgba(7,8,18,.22)', boxSizing: 'border-box', boxShadow: 'inset 0 0 120px rgba(0,0,0,.42)'}}/>

    {glitch && <AbsoluteFill style={{
      background: 'linear-gradient(90deg,transparent 0%,rgba(0,225,255,.22) 48%,rgba(255,35,190,.16) 52%,transparent 100%)',
      mixBlendMode: 'screen',
      transform: `translateX(${frame === 1 ? 10 : -7}px)`,
    }}/>}

    <AbsoluteFill style={{
      justifyContent: 'flex-end',
      padding: '0 76px 190px',
      opacity: captionIn * captionOut * (1 - whip * 0.92),
      transform: `scale(${captionScale}) translateX(${glitch ? 8 : 0}px)`,
      perspective: 900,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 28,
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 18,
        fontWeight: 800,
        letterSpacing: '5px',
        color: '#00d9ff',
        textShadow: '0 0 18px rgba(0,217,255,.55)',
      }}>
        <span style={{display: 'inline-block', width: 48, height: 3, background: '#ff2cbb', boxShadow: '0 0 18px #ff2cbb'}}/>
        <span>{String(index + 1).padStart(2, '0')} / 07</span>
      </div>
      <div style={{
        maxWidth: 930,
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: caption.length > 36 ? 66 : 78,
        fontWeight: 900,
        lineHeight: 1.02,
        letterSpacing: '-2.8px',
        color: '#fff',
        textShadow: '-3px 0 #00d9ff, 3px 0 rgba(255,35,190,.9), 0 8px 36px rgba(0,0,0,.8)',
        overflow: 'hidden',
      }}>
        {words.map((word, wordIndex) => {
          const start = 3 + wordIndex * 2;
          const reveal = interpolate(frame, [start, start + 7], [0, 1], clamp);
          const lift = interpolate(frame, [start, start + 8], [34, 0], clamp);
          const rotate = interpolate(frame, [start, start + 8], [9, 0], clamp);
          const blur = interpolate(frame, [start, start + 7], [8, 0], clamp);
          const isLast = wordIndex === words.length - 1;
          return <span key={wordIndex} style={{
            display: 'inline-block',
            marginRight: '0.22em',
            opacity: reveal,
            transform: `translate3d(0,${lift}px,0) rotateX(${rotate}deg) scale(${0.92 + reveal * 0.08})`,
            transformOrigin: '50% 100%',
            filter: `blur(${blur}px)`,
            color: isLast ? '#fff' : '#fff',
            textShadow: isLast ? '0 0 22px rgba(0,217,255,.38), -3px 0 #00d9ff, 3px 0 rgba(255,35,190,.9)' : undefined,
          }}>{word}</span>;
        })}
      </div>
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
