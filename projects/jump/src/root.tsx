import React from 'react';
import {Composition} from 'remotion';
import {JumpEdit} from './video';
const fps = 24;
export const JumpRoot: React.FC = () => <>
  <Composition id="JumpMaster" component={JumpEdit} durationInFrames={384} fps={fps} width={1080} height={1920}/>
  <Composition id="JumpReview" component={JumpEdit} durationInFrames={384} fps={fps} width={1080} height={1920}/>
</>;
