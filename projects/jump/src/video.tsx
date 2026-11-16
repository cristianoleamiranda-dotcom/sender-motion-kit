import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {shots} from './assets';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const Scene: React.FC<{index: number; caption: string; file: string; start: number; duration: number}> = ({index, caption, file, start, duration}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const p = frame / duration;
  const zoom = interpolate(p, [0, 1], [1.035, 1.12], clamp);
  const driftX = Math.sin((p * Math.PI) + index * 0.8) * 22;
  const driftY = interpolate(p, [0, 1], [12, -18], clamp);
  const captionIn = interpolate(frame, [4, 11, 17], [0, 1, 1], clamp);
  const captionOut = interpolate(frame, [duration - 8, duration - 2], [1, 0], clamp);
  const captionScale = interpolate(frame, [4, 12, 20], [0.92, 1.035, 1], clamp);
  const flash = frame < 2 ? interpolate(frame, [0, 1], [0.7, 0], clamp) : 0;
  const glitch = frame === 1 || frame === 2;
  return <AbsoluteFill style={{backgroundColor: '#05050a', overflow: 'hidden'}}>
    <AbsoluteFill style={{transform: `translate(${driftX}px,${driftY}px) scale(${zoom})`}}>
      <Img src={staticFile(`images/${file}`)} style={{width, height, objectFit: 'cover', filter: 'saturate(1.13) contrast(1.09) brightness(.88)'}}/>
    </AbsoluteFill>
    <AbsoluteFill style={{background: 'linear-gradient(180deg,rgba(4,5,12,.04) 35%,rgba(4,5,12,.16) 54%,rgba(4,5,12,.82) 100%)'}}/>
    <AbsoluteFill style={{border: '18px solid rgba(7,8,18,.22)', boxSizing: 'border-box', boxShadow: 'inset 0 0 120px rgba(0,0,0,.42)'}}/>
    {glitch && <AbsoluteFill style={{background: 'rgba(0,225,255,.16)', mixBlendMode: 'screen', transform: 'translateX(8px)'}}/>}
    <AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 76px 210px', opacity: captionIn * captionOut, transform: `scale(${captionScale}) translateX(${glitch ? 8 : 0}px)`}}>
      <div style={{height: 5, width: 112, background: '#ff2cbb', marginBottom: 34, boxShadow: '0 0 24px #ff2cbb'}}/>
      <div style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: caption.length > 36 ? 66 : 78, fontWeight: 900, lineHeight: 0.99, letterSpacing: '-2.5px', color: '#fff', textTransform: 'none', textShadow: '-3px 0 #00d9ff, 3px 0 rgba(255,35,190,.9), 0 8px 36px rgba(0,0,0,.8)', maxWidth: 920}}>
        {caption}
      </div>
      <div style={{marginTop: 32, fontFamily: 'Arial, sans-serif', fontSize: 20, letterSpacing: 7, fontWeight: 700, color: 'rgba(255,255,255,.72)'}}>J U M P</div>
    </AbsoluteFill>
    {flash > 0 && <AbsoluteFill style={{backgroundColor: '#fff', opacity: flash}}/>}
    <AbsoluteFill style={{opacity: .075, backgroundImage: 'repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(255,255,255,.14) 4px)', mixBlendMode: 'soft-light'}}/>
  </AbsoluteFill>;
};

export const JumpEdit: React.FC = () => {
  const {durationInFrames} = useVideoConfig();
  return <AbsoluteFill style={{background: '#05050a'}}>
    {shots.map((shot, i) => {
      const start = Math.round(i * durationInFrames / shots.length);
      const end = Math.round((i + 1) * durationInFrames / shots.length);
      return <Sequence key={shot.file} from={start} durationInFrames={end - start}>
        <Scene index={i} caption={shot.caption} file={shot.file} start={start} duration={end - start}/>
      </Sequence>;
    })}
  </AbsoluteFill>;
};
