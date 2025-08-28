
import Player from 'lottie-react';
import throbber from '../../../assets/animated/loading_square.json';
import throbber2 from '../../../assets/animated/loading_square_grey.json'
import whiteBriefcase from '../../../assets/unitec/white.svg';
import greyBriefCase from '../../../assets/unitec/grey.svg'
import './blockFooter.css'
interface LoadingScreenProps {
  loadingContent?: boolean;
  size?: string;
}

export default function LoadingScreen({ loadingContent = false, size = "1" }: LoadingScreenProps) {
  return (
    <div style={{
      ...styles.container,
      ...(loadingContent ? { position: 'absolute', top: '35%', transform: `scale(${size})` } : { height: '100vh' }),
    }}>
      <div style={styles.maskWrapper}>
        <svg
          width={140}
          height={126}
          viewBox="0 0 140 126"
          preserveAspectRatio="none"
          style={{ position: 'absolute', width: 140, height: 126 }}
        >

          <defs>
            <title id="briefcaseTitle">{loadingContent ? 'Cargando contenido' : 'Cargando'}</title>
            <mask id="briefcase-mask" maskUnits="userSpaceOnUse">
              <image
                href={loadingContent ? greyBriefCase : whiteBriefcase}
                width={140}
                height={126}
                style={{}}
              // El SVG blanco será la máscara
              />
            </mask>
          </defs>
          <g mask="url(#briefcase-mask)">
            <foreignObject width="140" height="126">
              <div style={{ width: '100%', height: '100%' }}>
                <Player
                  autoplay
                  loop
                  animationData={loadingContent ? throbber2 : throbber}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#0080d0ff'
  },
  maskWrapper: {
    position: 'relative' as const,
    width: 140,
    height: 126,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};